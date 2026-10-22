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
