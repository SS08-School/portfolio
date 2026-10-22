const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (menuButton && navigation) {
  const phoneLayout = window.matchMedia("(max-width: 47.999rem)");

  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.hidden = phoneLayout.matches && !isOpen;
  }

  function updateNavigation() {
    // Without JavaScript, the menu button stays hidden and all links are visible.
    // Reset the menu when crossing between phone and laptop layouts.
    if (phoneLayout.matches && navigation.contains(document.activeElement)) {
      menuButton.hidden = false;
      menuButton.focus();
    } else if (!phoneLayout.matches && document.activeElement === menuButton) {
      navigation.hidden = false;
      navigation.querySelector("a").focus();
    }

    menuButton.hidden = !phoneLayout.matches;
    setMenuOpen(false);
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (phoneLayout.matches && event.target.closest("a")) {
      // Return focus before hiding the active navigation link.
      menuButton.focus();
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && phoneLayout.matches && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  phoneLayout.addEventListener("change", updateNavigation);
  updateNavigation();
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

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll(
    ".studies, .skills-intro, .skill-card, .contact-intro, .contact-form"
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
