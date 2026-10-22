const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const menuContainer = document.querySelector(".navigation-menu");

if (menuButton && navigation && menuContainer) {
  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.hidden = !isOpen;
  }

  // Without JavaScript, the grouped links remain visible instead of a dropdown.
  menuContainer.classList.add("is-enhanced");
  menuButton.hidden = false;
  setMenuOpen(false);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
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

if (navigation) {
  const sectionLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateCurrentSection() {
    if (!sections.length) return;

    let currentSection = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
        currentSection = section;
      }
    }

    // The final section may be too short to reach the usual scroll threshold.
    if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
      currentSection = sections[sections.length - 1];
    }

    for (const link of sectionLinks) {
      if (link.getAttribute("href") === `#${currentSection.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  window.addEventListener("scroll", updateCurrentSection, { passive: true });
  window.addEventListener("resize", updateCurrentSection);
  window.addEventListener("load", updateCurrentSection);
  updateCurrentSection();
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
