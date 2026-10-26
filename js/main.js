const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const menuContainer = document.querySelector(".navigation-menu");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const keyboardControls = document.querySelector(".keyboard-controls");
const keyboardToggle = document.querySelector(".keyboard-toggle");
const keyboardHelp = document.querySelector(".keyboard-help");
const keyboardStorageKey = "portfolio-keep-tab";
let keepTabOnPage = true;
let scrollTarget = null;
let scrollFrame = null;
let previousFrameTime = null;

function stopKeyboardScroll() {
  if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
  scrollFrame = null;
  scrollTarget = null;
  previousFrameTime = null;
}

function animateKeyboardScroll(time) {
  const elapsed = previousFrameTime === null ? 16 : Math.min(time - previousFrameTime, 64);
  previousFrameTime = time;
  const remaining = scrollTarget - window.scrollY;
  if (Math.abs(remaining) <= 1) {
    window.scrollTo({ top: scrollTarget, behavior: "instant" });
    stopKeyboardScroll();
    return;
  }
  // Blend toward the accumulated destination, so held keys do not restart an animation.
  const step = Math.sign(remaining) * Math.max(1, Math.abs(remaining) * (1 - Math.exp(-elapsed / 65)));
  window.scrollTo({ top: window.scrollY + step, behavior: "instant" });
  scrollFrame = window.requestAnimationFrame(animateKeyboardScroll);
}

function scrollWithKeyboard(distance) {
  const maximum = Math.max(0, document.scrollingElement.scrollHeight - window.innerHeight);
  const reversing = scrollTarget !== null && Math.sign(distance) !== Math.sign(scrollTarget - window.scrollY);
  scrollTarget = Math.max(0, Math.min(maximum, (reversing ? window.scrollY : scrollTarget ?? window.scrollY) + distance));
  if (reducedMotion.matches) {
    window.scrollTo({ top: scrollTarget, behavior: "instant" });
    stopKeyboardScroll();
  } else if (scrollFrame === null) {
    scrollFrame = window.requestAnimationFrame(animateKeyboardScroll);
  }
}

// Other input takes over immediately; never pull focus back from browser controls.
window.addEventListener("blur", stopKeyboardScroll);
document.addEventListener("wheel", stopKeyboardScroll, { passive: true });
document.addEventListener("touchstart", stopKeyboardScroll, { passive: true });
document.addEventListener("pointerdown", stopKeyboardScroll);
document.addEventListener("focusin", stopKeyboardScroll);
reducedMotion.addEventListener("change", stopKeyboardScroll);

function savedKeyboardNavigation() {
  try {
    return localStorage.getItem(keyboardStorageKey) !== "false";
  } catch {
    // If storage is blocked, keep the current page's choice (initially on).
    return keepTabOnPage;
  }
}

function setKeyboardNavigation(enabled, savePreference = false) {
  keepTabOnPage = enabled;
  keyboardToggle?.setAttribute("aria-pressed", String(enabled));
  if (keyboardHelp) keyboardHelp.textContent = enabled
    ? "Tab cycles through page controls. Esc releases Tab to the browser."
    : "Standard Tab navigation is on. Enable this button to cycle through page controls.";
  if (savePreference) {
    try {
      localStorage.setItem(keyboardStorageKey, String(enabled));
    } catch {
      // The control still works for this page when storage is unavailable.
    }
  }
}

setKeyboardNavigation(savedKeyboardNavigation());

if (keyboardControls && keyboardToggle) {
  keyboardControls.hidden = false;
  keyboardToggle.addEventListener("click", () => setKeyboardNavigation(!keepTabOnPage, true));
}

window.addEventListener("storage", (event) => {
  if (event.key === keyboardStorageKey || event.key === null) {
    setKeyboardNavigation(savedKeyboardNavigation());
  }
});
window.addEventListener("pageshow", () => setKeyboardNavigation(savedKeyboardNavigation()));

document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") !== "true") {
    stopKeyboardScroll();
    setKeyboardNavigation(false, true);
  }
  if (!["ArrowUp", "ArrowDown"].includes(event.key)) stopKeyboardScroll();
  if (event.key !== "Tab" || !keepTabOnPage) return;

  const controls = Array.from(document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]'
  )).filter((element) => (
    element.tabIndex >= 0 && !element.matches(":disabled") &&
    !element.closest("[hidden], [inert]") && element.getClientRects().length > 0 &&
    window.getComputedStyle(element).visibility === "visible"
  ));
  if (!controls.length) return;
  const current = controls.indexOf(document.activeElement);
  let next = (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
  if (current === -1) {
    // Continue from a skip-link or section destination instead of restarting at the header.
    const nearby = controls.filter((element) => document.activeElement.compareDocumentPosition(element) &
      (event.shiftKey ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING));
    const destination = event.shiftKey ? nearby.at(-1) : nearby[0];
    next = destination ? controls.indexOf(destination) : (event.shiftKey ? controls.length - 1 : 0);
  }
  event.preventDefault();
  controls[next].focus({ preventScroll: true });
  controls[next].scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "nearest", inline: "nearest" });
});

document.addEventListener("keydown", (event) => {
  if (
    !["ArrowUp", "ArrowDown"].includes(event.key) || event.defaultPrevented ||
    event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
  ) return;

  // Leave text editing and controls that use arrow keys to the browser.
  if (event.target.closest(
    'input, textarea, select, [contenteditable], [role="textbox"], [role="slider"], ' +
    '[role="spinbutton"], [role="combobox"], [role="listbox"], [role="grid"], ' +
    '[role="tree"], [role="menu"], [role="tablist"], [role="radiogroup"], audio, video'
  )) return;

  // A tall dropdown or another scrolling region keeps its native arrow scrolling.
  for (let element = event.target; element && element !== document.body; element = element.parentElement) {
    const overflow = window.getComputedStyle(element).overflowY;
    if (/^(auto|scroll)$/.test(overflow) && element.scrollHeight > element.clientHeight) return;
  }

  event.preventDefault();
  scrollWithKeyboard(event.key === "ArrowDown" ? 80 : -80);
});

if (menuButton && navigation && menuContainer) {
  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.hidden = !isOpen;
  }

  // Without JavaScript, the grouped links remain visible instead of a dropdown.
  menuContainer.classList.add("is-enhanced");
  menuButton.hidden = false;
  setMenuOpen(false);

  menuButton.addEventListener("click", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
    // Keyboard activation goes straight to the first page link.
    if (!isOpen && event.detail === 0) navigation.querySelector("a")?.focus();
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      // Return focus before hiding the active navigation link.
      menuButton.focus();
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menuContainer.contains(event.target)) {
      if (navigation.contains(document.activeElement)) menuButton.focus();
      setMenuOpen(false);
    }
  });

  menuContainer.addEventListener("focusout", (event) => {
    if (!menuContainer.contains(event.relatedTarget)) setMenuOpen(false);
  });
}

document.addEventListener("click", (event) => {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (event.target.closest('a[href="#top"]')) {
    // Also reset an already-open page immediately; keep native link/history behavior.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
});

document.addEventListener("focusin", (event) => {
  if (event.target.matches("a, button, input, textarea, select")) {
    // Keep a newly focused control immediately visible during page entry.
    event.target.closest("main")?.classList.remove("page-enter");
  }
});

window.addEventListener("pageshow", (event) => {
  if (!event.persisted || reducedMotion.matches) return;
  const main = document.querySelector("main");
  if (main) {
    main.classList.remove("page-enter");
    // Restart the entrance effect when browser Back restores a cached page.
    void main.offsetWidth;
    main.classList.add("page-enter");
  }
});

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll(
    ".studies, .skills-intro, .skill-card, .contact-intro, .contact-card, .education-card, .project-status"
  );

  function reveal(element) {
    element.classList.remove("reveal-pending");
  }

  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        reveal(entry.target);
      } else if (
        entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? window.innerHeight) &&
        !entry.target.matches(":focus-within")
      ) {
        // Scrolling up moves the item below view; reset it for the next reveal.
        entry.target.classList.add("reveal-pending");
      }
    }
  }, { rootMargin: "0px 0px -36px 0px", threshold: 0 });

  for (const element of revealTargets) {
    element.classList.add("scroll-reveal");
    // Leave content already on screen visible, including on direct section links.
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("reveal-pending");
    }
    revealObserver.observe(element);
  }

  // Keyboard users should never have to wait for a focused control to appear.
  document.addEventListener("focusin", (event) => {
    const pendingElement = event.target.closest(".reveal-pending");
    if (pendingElement) reveal(pendingElement);
  });

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      for (const element of revealTargets) {
        element.classList.remove("scroll-reveal", "reveal-pending");
      }
      revealObserver.disconnect();
    }
  });
}
