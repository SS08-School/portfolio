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
