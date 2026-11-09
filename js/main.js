const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const menuContainer = document.querySelector(".navigation-menu");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Cycling starts enabled on every page, regardless of an old saved toggle setting.
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

function pageControls() {
  return Array.from(document.querySelectorAll(
    'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]'
  )).filter((element) => (
    element.tabIndex >= 0 && !element.matches(":disabled") &&
    !element.closest("[hidden], [inert]") && element.getClientRects().length > 0 &&
    window.getComputedStyle(element).visibility === "visible"
  ));
}

function moveControlFocus(direction, controls = pageControls()) {
  if (!controls.length) return;
  const current = controls.indexOf(document.activeElement);
  let next = (current + direction + controls.length) % controls.length;
  if (current === -1) {
    // Continue from a focused section destination rather than restarting at the header.
    const nearby = controls.filter((element) => document.activeElement.compareDocumentPosition(element) &
      (direction < 0 ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING));
    const destination = direction < 0 ? nearby.at(-1) : nearby[0];
    next = destination ? controls.indexOf(destination) : (direction < 0 ? controls.length - 1 : 0);
  }
  focusControl(controls[next]);
}

function focusControl(control) {
  control.focus({ preventScroll: true });
  control.scrollIntoView({
    behavior: reducedMotion.matches ? "instant" : "smooth", block: "nearest", inline: "nearest"
  });
}

function moveVerticalFocus(direction, controls) {
  const current = document.activeElement.getBoundingClientRect();
  const centerX = (current.left + current.right) / 2;
  const candidates = controls.filter((control) => control !== document.activeElement).map((control) => {
    const bounds = control.getBoundingClientRect();
    return {
      control,
      gap: direction > 0 ? bounds.top - current.bottom : current.top - bounds.bottom,
      horizontalDistance: Math.abs((bounds.left + bounds.right) / 2 - centerX)
    };
  }).filter((candidate) => candidate.gap >= -4);

  if (!candidates.length) {
    scrollWithKeyboard(direction * 80);
    return;
  }
  // Find the next visual row, then the control closest to the current column.
  const nearestGap = Math.min(...candidates.map((candidate) => candidate.gap));
  const nextRow = candidates.filter((candidate) => candidate.gap <= nearestGap + 12);
  nextRow.sort((first, second) => first.horizontalDistance - second.horizontalDistance);
  focusControl(nextRow[0].control);
}

window.addEventListener("pageshow", () => { keepTabOnPage = true; });

document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") !== "true") {
    stopKeyboardScroll();
    // Provide an accessible escape to browser controls, without disabling later visits.
    keepTabOnPage = false;
  }
  if (event.key !== "Tab" || !keepTabOnPage) return;
  event.preventDefault();
  stopKeyboardScroll();
  moveControlFocus(event.shiftKey ? -1 : 1);
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) ||
    event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey ||
    event.altKey || event.shiftKey) return;

  // On project controls, vertical arrows navigate without changing their values.
  if (["ArrowUp", "ArrowDown"].includes(event.key) && event.target.closest(".projects-page") &&
    event.target.matches('select, input[type="radio"], input[type="range"], input[type="number"]')) {
    event.preventDefault();
    moveVerticalFocus(event.key === "ArrowUp" ? -1 : 1, pageControls());
    return;
  }

  // Preserve text editing and native Left/Right adjustment of project inputs.
  if (event.target.closest(
    'input, textarea, select, [contenteditable], [role="textbox"], [role="slider"], ' +
    '[role="spinbutton"], [role="combobox"], [role="listbox"], [role="grid"], ' +
    '[role="tree"], [role="menu"], [role="tablist"], [role="radiogroup"], audio, video'
  )) return;

  event.preventDefault();
  const direction = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
  const controls = pageControls();
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    stopKeyboardScroll();
    moveControlFocus(direction, controls);
  } else if (event.target.closest('a[href], button, summary, [tabindex="0"]')) {
    moveVerticalFocus(direction, controls);
  } else {
    scrollWithKeyboard(direction * 80);
  }
});

if (menuButton && navigation && menuContainer) {
  const desktopNavigation = window.matchMedia("(min-width: 60rem)");

  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.hidden = !desktopNavigation.matches && !isOpen;
  }

  function updateNavigationLayout() {
    const focusWasInNavigation = navigation.contains(document.activeElement);
    const focusWasOnMenu = document.activeElement === menuButton;
    menuButton.hidden = desktopNavigation.matches;
    setMenuOpen(false);
    if (!desktopNavigation.matches && focusWasInNavigation) menuButton.focus();
    if (desktopNavigation.matches && focusWasOnMenu) navigation.querySelector("a")?.focus();
  }

  // Desktop links stay visible; only the compact layout uses a dropdown.
  menuContainer.classList.add("is-enhanced");
  updateNavigationLayout();
  desktopNavigation.addEventListener("change", updateNavigationLayout);

  menuButton.addEventListener("click", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
    // Keyboard activation goes straight to the first page link.
    if (!isOpen && event.detail === 0) navigation.querySelector("a")?.focus();
  });

  navigation.addEventListener("click", (event) => {
    if (!desktopNavigation.matches && event.target.closest("a")) {
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
    if (!desktopNavigation.matches && !menuContainer.contains(event.target)) {
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
    // Let the native anchor use CSS smooth scrolling and reduced-motion settings.
    stopKeyboardScroll();
  }
});

document.addEventListener("focusin", (event) => {
  if (event.target.matches("a, button, input, textarea, select, summary")) {
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
        revealObserver.unobserve(entry.target);
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

// These two small rules mirror the original notebook; the UI lives below them.
function rockPaperScissorsWinner(first, second) {
  if (first === second) return "tie";
  const beats = { rock: "scissors", paper: "rock", scissors: "paper" };
  return beats[first] === second ? "one" : "two";
}

function fibonacciTerms(count) {
  const terms = [0n, 1n];
  for (let index = 2; index < count; index++) {
    terms.push(terms[index - 1] + terms[index - 2]);
  }
  return terms.slice(0, count);
}

function initializeProjectCarousel() {
  const carousel = document.querySelector(".project-carousel");
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll(".project-card"));
  const controls = carousel.querySelector(".carousel-controls");
  const status = carousel.querySelector("#carousel-status");
  let selected = 0;

  function showProject(index) {
    const focusedSlide = slides.find((slide) => slide.contains(document.activeElement));
    selected = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== selected;
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", (position + 1) + " of " + slides.length);
    });
    status.textContent = String(selected + 1).padStart(2, "0") + " / " +
      String(slides.length).padStart(2, "0") + " — " + slides[selected].querySelector("h3").textContent;
    if (focusedSlide && focusedSlide !== slides[selected]) slides[selected].querySelector("a").focus();
  }

  carousel.querySelector("#project-previous").addEventListener("click", () => showProject(selected - 1));
  carousel.querySelector("#project-next").addEventListener("click", () => showProject(selected + 1));
  carousel.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) ||
      event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    if (event.key === "Home") showProject(0);
    else if (event.key === "End") showProject(slides.length - 1);
    else showProject(selected + (event.key === "ArrowRight" ? 1 : -1));
  });

  carousel.classList.add("is-enhanced");
  controls.hidden = false;
  showProject(0);
}

initializeProjectCarousel();

function initializeContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const fields = ["name", "email", "message"].map((name) => form.querySelector("#contact-" + name));
  const draftLink = form.querySelector("#contact-draft-link");
  const status = form.querySelector("#contact-form-status");

  function fieldError(field) {
    if (!field.value.trim()) return field.name === "message" ? "Enter a message." :
      field.name === "email" ? "Enter your email address." : "Enter your name.";
    if (field.type === "email" && field.validity.typeMismatch) return "Enter a valid email address.";
    if (field.value.length > field.maxLength) return "Use " + field.maxLength + " characters or fewer.";
    return "";
  }

  function displayError(field, message) {
    field.setAttribute("aria-invalid", String(Boolean(message)));
    form.querySelector("#" + field.id + "-error").textContent = message;
  }

  form.addEventListener("input", (event) => {
    if (!fields.includes(event.target)) return;
    if (event.target.getAttribute("aria-invalid") === "true") displayError(event.target, fieldError(event.target));
    draftLink.hidden = true;
    draftLink.removeAttribute("href");
    status.textContent = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach((field) => {
      const message = fieldError(field);
      displayError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      draftLink.hidden = true;
      draftLink.removeAttribute("href");
      status.textContent = "Please check the highlighted fields.";
      firstInvalid.focus();
      return;
    }
    const [name, email, message] = fields.map((field) => field.value.trim());
    const subject = "Portfolio enquiry from " + name;
    const body = message + "\n\n" + name + "\n" + email;
    draftLink.href = "mailto:ss5764@njit.edu?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    draftLink.hidden = false;
    status.textContent = "Your draft is ready to open in your email app.";
    draftLink.focus();
  });
  form.querySelector("#prepare-email").disabled = false;
}

initializeContactForm();

function createRoundActionIcon(replay) {
  const namespace = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(namespace, "svg");
  icon.setAttribute("class", "ui-icon");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("width", "18");
  icon.setAttribute("height", "18");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  const path = document.createElementNS(namespace, "path");
  path.setAttribute("d", replay ? "M4 4v6h6M4 10a8 8 0 1 1 .5 5" : "M6 18 18 6M6 6h12v12");
  icon.append(path);
  return icon;
}

function initializeRockPaperScissors() {
  const game = document.querySelector("#rps-game");
  if (!game) return;
  const find = (selector) => game.querySelector(selector);
  const arena = find("#game-arena");
  const moveControls = find("#move-controls");
  const moveButtons = [...moveControls.querySelectorAll("button")];
  const nextButton = find("#next-round");
  const handoff = find("#handoff-screen");
  const names = { rock: "Rock", paper: "Paper", scissors: "Scissors" };
  const choices = Object.keys(names);
  let mode = "computer";
  let phase = "choosing";
  let firstMove = null;
  let computerMove = null;
  let scores = { one: 0, two: 0, tie: 0 };
  let round = 1;
  let history = [];
  let revealTimer = null;
  let focusAfterReveal = false;

  function randomMove() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function announce(title, instruction) {
    find("#game-result").textContent = title;
    find("#game-instruction").textContent = instruction;
  }

  function setHands(left, right) {
    for (const [side, move] of [["left", left], ["right", right]]) {
      const image = find(`#${side}-hand`);
      // Reuse the versioned image on the choice button so cached artwork stays current.
      image.src = moveControls.querySelector(`[data-move="${move || "rock"}"] img`).getAttribute("src");
      // Choice text beside the images supplies the accessible description.
      find(`#${side}-choice`).textContent = move ? names[move] : "Ready?";
    }
  }

  function prepareRound(focusMove = false) {
    window.clearTimeout(revealTimer);
    revealTimer = null;
    phase = "choosing";
    firstMove = null;
    focusAfterReveal = false;
    // Choose before the player moves; every round is independent.
    computerMove = mode === "computer" ? randomMove() : null;
    arena.hidden = false;
    handoff.hidden = true;
    moveControls.hidden = false;
    nextButton.hidden = true;
    arena.classList.remove("is-shaking", "is-revealed");
    delete arena.dataset.winner;
    setHands(null, null);
    moveButtons.forEach((button) => { button.disabled = false; });
    find("#round-label").textContent = `ROUND ${String(round).padStart(2, "0")}`;
    find("#left-hand-label").textContent = mode === "friend" ? "PLAYER 1" : "YOUR MOVE";
    find("#right-hand-label").textContent = mode === "friend" ? "PLAYER 2" : "THEIR MOVE";
    announce(mode === "friend" ? "Player 1, make your move." : "Choose a move.",
      mode === "friend" ? "Player 2, look away while Player 1 chooses." : `Choose your move to start round ${round}.`);
    if (focusMove) moveButtons[0].focus({ preventScroll: true });
  }

  function updateScores() {
    find("#player-one-score").textContent = scores.one;
    find("#player-two-score").textContent = scores.two;
    find("#tie-score").textContent = scores.tie;
  }

  function resetMatch() {
    scores = { one: 0, two: 0, tie: 0 };
    round = 1;
    history = [];
    updateScores();
    find("#round-history").replaceChildren();
    const empty = document.createElement("li");
    empty.textContent = "No rounds played.";
    find("#round-history").append(empty);
    find("#player-one-label").textContent = mode === "friend" ? "PLAYER 1" : "YOU";
    find("#player-two-label").textContent = mode === "friend" ? "PLAYER 2" : "COMPUTER";
    find("#game-mode-note").textContent = mode === "friend"
      ? "One device, two players. Keep your pick private, then pass the device."
      : "The computer commits to a random move before you choose.";
    prepareRound();
  }

  function finishRound(left, right) {
    const winner = rockPaperScissorsWinner(left, right);
    scores[winner]++;
    updateScores();
    setHands(left, right);
    arena.classList.remove("is-shaking");
    arena.classList.add("is-revealed");
    arena.dataset.winner = winner;
    const oneName = mode === "friend" ? "Player 1" : "You";
    const twoName = mode === "friend" ? "Player 2" : "Computer";
    const result = winner === "tie" ? "It's a tie!" : winner === "one"
      ? `${oneName} ${mode === "friend" ? "wins" : "win"} the round!` : `${twoName} wins the round!`;
    const reason = winner === "tie" ? `Both chose ${names[left].toLowerCase()}.`
      : `${names[winner === "one" ? left : right]} beats ${names[winner === "one" ? right : left].toLowerCase()}.`;
    const matchOver = scores.one === 5 || scores.two === 5;
    phase = matchOver ? "match-over" : "result";
    announce(matchOver ? (scores.one === 5 ? `${oneName} ${mode === "friend" ? "wins" : "win"} the match!` : `${twoName} wins the match!`) : result,
      matchOver ? `${reason} Final score: ${scores.one} to ${scores.two}. Play again for a fresh match.` : `${reason} Ready for another?`);
    history.unshift(`R${round} · ${names[left]} / ${names[right]} · ${winner === "tie" ? "Tie" : winner === "one" ? oneName : twoName}`);
    find("#round-history").replaceChildren(...history.slice(0, 5).map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }));
    nextButton.replaceChildren(document.createTextNode(matchOver ? "Play again" : "Next round"), createRoundActionIcon(matchOver));
    nextButton.hidden = false;
    // Keep keyboard focus on a live control after the move buttons are disabled.
    if (focusAfterReveal && (document.activeElement === document.body || moveControls.contains(document.activeElement))) {
      nextButton.focus({ preventScroll: true });
    }
    focusAfterReveal = false;
  }

  function revealRound(left, right) {
    phase = "revealing";
    focusAfterReveal = moveControls.contains(document.activeElement);
    moveButtons.forEach((button) => { button.disabled = true; });
    announce("Rock. Paper. Scissors…", "Revealing both moves.");
    arena.classList.add("is-shaking");
    revealTimer = window.setTimeout(() => finishRound(left, right), reducedMotion.matches ? 0 : 650);
  }

  moveControls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-move]");
    if (!button || !["choosing", "player-two"].includes(phase)) return;
    const move = button.dataset.move;
    if (mode === "friend" && phase === "choosing") {
      firstMove = move;
      phase = "handoff";
      // The chosen button, image, and label disappear before the device changes hands.
      arena.hidden = true;
      moveControls.hidden = true;
      handoff.hidden = false;
      announce("Player 1's move is locked.", "Pass the device to Player 2.");
      find("#handoff-ready").focus({ preventScroll: true });
    } else {
      revealRound(mode === "friend" ? firstMove : move, mode === "friend" ? move : computerMove);
    }
  });

  find("#handoff-ready").addEventListener("click", () => {
    if (phase !== "handoff") return;
    phase = "player-two";
    handoff.hidden = true;
    arena.hidden = false;
    moveControls.hidden = false;
    find("#left-choice").textContent = "Locked in";
    announce("Player 2, your turn.", "Choose your move. Both choices will be revealed together.");
    moveButtons[0].focus({ preventScroll: true });
  });

  nextButton.addEventListener("click", () => {
    if (phase === "match-over") {
      resetMatch();
      moveButtons[0].focus({ preventScroll: true });
    } else if (phase === "result") {
      round++;
      prepareRound(true);
    }
  });
  find("#reset-game").addEventListener("click", resetMatch);
  for (const button of game.querySelectorAll("[data-game-mode]")) {
    button.addEventListener("click", () => {
      if (mode === button.dataset.gameMode) return;
      mode = button.dataset.gameMode;
      for (const option of game.querySelectorAll("[data-game-mode]")) {
        option.setAttribute("aria-pressed", String(option === button));
      }
      resetMatch();
    });
  }
  resetMatch();
  game.hidden = false;
}

function initializeFibonacci() {
  const explorer = document.querySelector("#fib-explorer");
  if (!explorer) return;
  const find = (selector) => explorer.querySelector(selector);
  const countInput = find("#fib-count");
  const range = find("#fib-range");
  const sequence = find("#fib-sequence");
  const playButton = find("#fib-play");
  const svgNamespace = "http://www.w3.org/2000/svg";
  let terms = [];
  let selected = 0;
  let playing = false;
  let playTimer = null;

  function stopPlayback() {
    window.clearTimeout(playTimer);
    playTimer = null;
    playing = false;
    playButton.textContent = "Replay sequence";
  }

  function drawSpiral() {
    // Grow adjoining squares right, down, left, then up. Skip the zero-sized first term.
    const squareValues = terms.slice(1, Math.min(selected + 1, 12));
    const squares = [];
    let bounds = { left: 0, top: 0, right: 1, bottom: 1 };
    let path = "";
    for (let index = 0; index < squareValues.length; index++) {
      const size = Number(squareValues[index]);
      let x = 0;
      let y = 0;
      if (index > 0) {
        const direction = (index - 1) % 4;
        if (direction === 0) { x = bounds.right; y = bounds.top; }
        if (direction === 1) { x = bounds.left; y = bounds.bottom; }
        if (direction === 2) { x = bounds.left - size; y = bounds.top; }
        if (direction === 3) { x = bounds.left; y = bounds.top - size; }
        bounds = { left: Math.min(bounds.left, x), top: Math.min(bounds.top, y), right: Math.max(bounds.right, x + size), bottom: Math.max(bounds.bottom, y + size) };
      }
      const rectangle = document.createElementNS(svgNamespace, "rect");
      for (const [name, value] of Object.entries({ x, y, width: size, height: size })) rectangle.setAttribute(name, value);
      if (index + 1 === selected) rectangle.classList.add("is-current");
      squares.push(rectangle);
      // Hide labels too small to be useful at the current drawing scale.
      if (size >= Number(squareValues.at(-1)) / 12) {
        const label = document.createElementNS(svgNamespace, "text");
        label.setAttribute("x", x + size / 2);
        label.setAttribute("y", y + size / 2);
        label.setAttribute("font-size", size * 0.18);
        label.textContent = size;
        squares.push(label);
      }
      const corners = [
        [x, y + size, x + size, y],
        [x, y, x + size, y + size],
        [x + size, y, x, y + size],
        [x + size, y + size, x, y]
      ][index % 4];
      if (index === 0) path = `M${corners[0]} ${corners[1]}`;
      path += ` A${size} ${size} 0 0 1 ${corners[2]} ${corners[3]}`;
    }
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;
    const padding = Math.max(width, height) * 0.08;
    find("#fib-spiral").setAttribute("viewBox", `${bounds.left - padding} ${bounds.top - padding} ${width + padding * 2} ${height + padding * 2}`);
    find("#fib-squares").replaceChildren(...squares);
    find("#fib-curve").setAttribute("d", path || "M0 0");
    find("#spiral-caption").textContent = `${Math.min(selected + 1, 12)} terms${selected >= 12 ? " · drawing limit" : ""}`;
    find("#spiral-note").textContent = selected === 0 ? "0 is the starting term. A zero-sized square has no area."
      : selected >= 12 ? "Drawing capped at the first 12 terms; inspect every exact value below."
        : "Quarter-circle arcs connect squares sized by the sequence.";
  }

  function showTerm(index, announce = true) {
    selected = index;
    const value = terms[index].toString();
    find("#fib-step-label").textContent = `TERM ${index + 1} OF ${terms.length}`;
    const equation = find("#fib-equation");
    equation.replaceChildren();
    if (index >= 2) {
      for (const text of [terms[index - 2].toString(), "+", terms[index - 1].toString(), "="]) {
        const part = document.createElement("span");
        part.textContent = text;
        equation.append(part);
      }
    }
    const result = document.createElement("strong");
    result.textContent = value;
    equation.append(result);
    find("#fib-explanation").textContent = index < 2 ? "A starting value. The sequence begins with 0, then 1." : "The two previous terms add up to this one.";
    find("#fib-selected").textContent = value;
    find("#fib-ratio").textContent = index === 0 || terms[index - 1] === 0n
      ? "Not defined" : (Number(terms[index]) / Number(terms[index - 1])).toFixed(6);
    find("#fib-back").disabled = index === 0;
    find("#fib-next").disabled = index === terms.length - 1;
    for (const [position, button] of [...sequence.children].entries()) {
      button.setAttribute("aria-pressed", String(position === index));
      button.classList.toggle("is-previous", position < index && position >= index - 2);
    }
    drawSpiral();
    if (announce) find("#fib-status").textContent = `Term ${index + 1} of ${terms.length}: ${value}.${index >= 2 ? ` ${terms[index - 2]} plus ${terms[index - 1]} equals ${value}.` : " Starting value."}`;
  }

  function generate(count, announce = true) {
    stopPlayback();
    countInput.value = count;
    range.value = count;
    countInput.removeAttribute("aria-invalid");
    find("#fib-error").textContent = "";
    terms = fibonacciTerms(count);
    sequence.replaceChildren(...terms.map((term, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.term = index;
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const value = document.createElement("span");
      value.textContent = term.toString();
      button.append(number, value);
      return button;
    }));
    showTerm(count - 1, announce);
  }

  find("#fib-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Number(countInput.value);
    if (!countInput.value.trim() || !Number.isInteger(value) || value < 1 || value > 100 || !countInput.validity.valid) {
      stopPlayback();
      countInput.setAttribute("aria-invalid", "true");
      find("#fib-error").textContent = "Enter a whole number from 1 to 100.";
      countInput.focus({ preventScroll: true });
      return;
    }
    generate(value);
  });
  range.addEventListener("input", () => generate(Number(range.value)));
  sequence.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;
    stopPlayback();
    showTerm(Number(button.dataset.term));
  });
  find("#fib-back").addEventListener("click", () => {
    stopPlayback();
    if (selected > 0) showTerm(selected - 1);
    if (find("#fib-back").disabled) playButton.focus({ preventScroll: true });
  });
  find("#fib-next").addEventListener("click", () => {
    stopPlayback();
    if (selected < terms.length - 1) showTerm(selected + 1);
    if (find("#fib-next").disabled) playButton.focus({ preventScroll: true });
  });

  function advancePlayback() {
    if (!playing) return;
    if (selected < terms.length - 1) showTerm(selected + 1, false);
    if (selected === terms.length - 1) {
      stopPlayback();
      find("#fib-status").textContent = `Sequence complete. ${terms.length} terms, ending at ${terms.at(-1)}.`;
    } else {
      playTimer = window.setTimeout(advancePlayback, 900);
    }
  }

  playButton.addEventListener("click", () => {
    if (playing) {
      stopPlayback();
      find("#fib-status").textContent = `Paused at term ${selected + 1}.`;
      return;
    }
    if (selected === terms.length - 1) showTerm(0);
    if (terms.length === 1) return;
    playing = true;
    playButton.textContent = "Pause";
    find("#fib-status").textContent = "Playing the sequence, one term at a time.";
    playTimer = window.setTimeout(advancePlayback, 900);
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopPlayback(); });
  window.addEventListener("pagehide", stopPlayback);
  reducedMotion.addEventListener("change", () => stopPlayback());
  generate(12, false);
  explorer.hidden = false;
}

initializeRockPaperScissors();
initializeFibonacci();

function initializeCalculator() {
  const demo = document.querySelector("#calculator-demo");
  if (!demo) return;
  const form = demo.querySelector("#calculator-form");
  const firstInput = demo.querySelector("#calculator-first");
  const secondInput = demo.querySelector("#calculator-second");
  const error = demo.querySelector("#calculator-error");
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  function formatNumber(value) {
    // Keep routine decimal results readable, including 0.1 + 0.2.
    return String(Number(value.toPrecision(12)));
  }

  function clearErrors() {
    error.textContent = "";
    firstInput.removeAttribute("aria-invalid");
    secondInput.removeAttribute("aria-invalid");
  }

  function reject(message, input) {
    error.textContent = message;
    if (input) {
      input.setAttribute("aria-invalid", "true");
      input.focus({ preventScroll: true });
    }
  }

  function calculate() {
    clearErrors();
    for (const input of [firstInput, secondInput]) {
      if (!input.value.trim() || !input.validity.valid || !Number.isFinite(Number(input.value))) {
        reject("Enter a finite number in both fields.", input);
        return;
      }
    }
    const first = Number(firstInput.value);
    const second = Number(secondInput.value);
    const operation = form.querySelector('input[name="operation"]:checked')?.value;
    if (!Object.hasOwn(symbols, operation)) {
      reject("Choose one of the four operations.");
      return;
    }
    if (operation === "/" && second === 0) {
      reject("Cannot divide by zero. Choose a different second number.", secondInput);
      return;
    }
    let result;
    if (operation === "+") result = first + second;
    if (operation === "-") result = first - second;
    if (operation === "*") result = first * second;
    if (operation === "/") result = first / second;
    if (!Number.isFinite(result)) {
      reject("That result is too large to display. Try smaller numbers.");
      return;
    }
    const expression = `${formatNumber(first)} ${symbols[operation]} ${formatNumber(second)} =`;
    const answer = formatNumber(result);
    demo.querySelector("#calculator-expression").textContent = expression;
    demo.querySelector("#calculator-result").textContent = answer;
  }

  form.querySelector(".operation-options").addEventListener("keydown", (event) => {
    if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
      !event.target.matches('input[name="operation"]')) return;
    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      // Browsing operations moves focus without changing the selected calculation.
      event.preventDefault();
      stopKeyboardScroll();
      moveControlFocus(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Enter") {
      // Select explicitly, without submitting the previous choice.
      event.preventDefault();
      event.target.click();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  });
  demo.querySelector("#calculator-reset").addEventListener("click", () => {
    form.reset();
    calculate();
  });
  calculate();
  demo.hidden = false;
}

function initializeShoppingCart() {
  const demo = document.querySelector("#cart-demo");
  if (!demo) return;
  // The prices and starting quantities are the original Assignment 1 shelf.
  const groceries = [
    { id: "cereal", name: "Frosted Flakes", cents: 299, stock: 2, inCart: 0 },
    { id: "eggs", name: "Eggs", cents: 599, stock: 3, inCart: 0 },
    { id: "bread", name: "Sourdough Loaf", cents: 399, stock: 4, inCart: 0 }
  ];
  const shelf = demo.querySelector("#shelf-items");
  const lines = demo.querySelector("#cart-lines");
  const clearButton = demo.querySelector("#cart-clear");
  const status = demo.querySelector("#cart-status");
  const money = (cents) => `$${(cents / 100).toFixed(2)}`;

  // This template contains only fixed, local grocery data, never visitor input.
  shelf.innerHTML = groceries.map((item) => `
    <form class="shelf-item" data-product="${item.id}" novalidate>
      <div class="grocery-mark" aria-hidden="true"><img src="images/grocery-${item.id}.svg" alt="" width="48" height="58"></div>
      <div class="grocery-copy"><h4>${item.name}</h4><p>${money(item.cents)} each <span id="stock-${item.id}"></span></p></div>
      <div class="shelf-controls"><label for="quantity-${item.id}">Quantity<span class="visually-hidden"> of ${item.name}</span></label>
        <div><input id="quantity-${item.id}" type="number" min="1" step="1" value="1" required aria-describedby="stock-${item.id} error-${item.id}">
        <button class="button" type="submit" aria-label="Add ${item.name} to basket">Add +</button></div>
      </div><p id="error-${item.id}" class="input-error" role="alert"></p>
    </form>`).join("");

  function renderBasket() {
    for (const item of groceries) {
      const available = item.stock - item.inCart;
      const form = shelf.querySelector(`[data-product="${item.id}"]`);
      const input = form.querySelector("input");
      demo.querySelector(`#stock-${item.id}`).textContent = `· ${available} on shelf`;
      input.max = available;
      input.disabled = available === 0;
      form.querySelector("button").disabled = available === 0;
      form.querySelector("button").textContent = available === 0 ? "All in basket" : "Add +";
    }
    lines.innerHTML = groceries.filter((item) => item.inCart > 0).map((item) => `
      <li data-cart-product="${item.id}"><div class="basket-line-heading"><div><h4>${item.name}</h4><p>${item.inCart} × ${money(item.cents)}</p></div><strong>${money(item.inCart * item.cents)}</strong></div>
        <div class="basket-line-controls"><div class="quantity-stepper"><button type="button" class="quiet-button" data-action="less" aria-label="Remove one ${item.name}">−</button><span aria-label="Quantity">${item.inCart}</span><button type="button" class="quiet-button" data-action="more" aria-label="Add one ${item.name}" ${item.inCart === item.stock ? "disabled" : ""}>+</button></div><button type="button" class="remove-item" data-action="remove" aria-label="Remove all ${item.name} from basket">Remove</button></div>
      </li>`).join("");
    const quantity = groceries.reduce((sum, item) => sum + item.inCart, 0);
    const totalCents = groceries.reduce((sum, item) => sum + item.inCart * item.cents, 0);
    demo.querySelector("#cart-item-count").textContent = `${quantity} ${quantity === 1 ? "item" : "items"}`;
    demo.querySelector("#cart-total").textContent = money(totalCents);
    demo.querySelector("#cart-empty").hidden = quantity > 0;
    clearButton.disabled = quantity === 0;
  }

  function clearItemError(item) {
    demo.querySelector(`#error-${item.id}`).textContent = "";
    demo.querySelector(`#quantity-${item.id}`).removeAttribute("aria-invalid");
  }

  demo.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key) || event.defaultPrevented || event.isComposing ||
      event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    // Keep each product's shelf and basket actions together, even in two columns.
    const availableControls = pageControls();
    const cartControls = groceries.flatMap((item) => [
      ...shelf.querySelectorAll(`[data-product="${item.id}"] input, [data-product="${item.id}"] button`),
      ...lines.querySelectorAll(`[data-cart-product="${item.id}"] button`)
    ]).concat(clearButton).filter((control) => availableControls.includes(control));
    const current = cartControls.indexOf(event.target);
    if (current === -1) return;
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    event.preventDefault();
    stopKeyboardScroll();
    const destination = cartControls[current + direction];
    if (destination) focusControl(destination);
    else moveControlFocus(direction, availableControls);
  });

  shelf.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-product]");
    if (!form) return;
    event.preventDefault();
    const item = groceries.find((item) => item.id === form.dataset.product);
    const input = form.querySelector("input");
    const quantity = Number(input.value);
    const available = item.stock - item.inCart;
    clearItemError(item);
    if (!input.value.trim() || !Number.isInteger(quantity) || quantity < 1 || quantity > available || !input.validity.valid) {
      demo.querySelector(`#error-${item.id}`).textContent = available === 0
        ? "All of this item is in your basket. Remove some to return it to the shelf."
        : `Enter a whole-number quantity from 1 to ${available}.`;
      input.setAttribute("aria-invalid", "true");
      if (!input.disabled) input.focus({ preventScroll: true });
      return;
    }
    const focusOnShelf = form.contains(document.activeElement);
    item.inCart += quantity;
    input.value = 1;
    renderBasket();
    status.textContent = `Added ${quantity} ${item.name}. Total ${demo.querySelector("#cart-total").textContent}.`;
    if (focusOnShelf && input.disabled) {
      lines.querySelector(`[data-cart-product="${item.id}"] [data-action="less"]`).focus({ preventScroll: true });
    }
  });

  lines.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const item = groceries.find((item) => item.id === button.closest("[data-cart-product]").dataset.cartProduct);
    const action = button.dataset.action;
    const hadFocus = button === document.activeElement;
    if (action === "more" && item.inCart < item.stock) item.inCart++;
    if (action === "less" && item.inCart > 0) item.inCart--;
    if (action === "remove") item.inCart = 0;
    clearItemError(item);
    renderBasket();
    status.textContent = `${item.name}: ${item.inCart} in basket. Total ${demo.querySelector("#cart-total").textContent}.`;
    if (hadFocus) {
      const preferred = lines.querySelector(`[data-cart-product="${item.id}"] [data-action="${action}"]`);
      const fallback = lines.querySelector(`[data-cart-product="${item.id}"] [data-action="less"]`);
      (preferred && !preferred.disabled ? preferred : fallback || shelf.querySelector(`[data-product="${item.id}"] button`)).focus({ preventScroll: true });
    }
  });

  clearButton.addEventListener("click", () => {
    groceries.forEach((item) => { item.inCart = 0; clearItemError(item); });
    const hadFocus = document.activeElement === clearButton;
    renderBasket();
    status.textContent = "Basket emptied. All items are back on the shelf.";
    if (hadFocus) shelf.querySelector("button").focus({ preventScroll: true });
  });
  renderBasket();
  demo.hidden = false;
}

initializeCalculator();
initializeShoppingCart();
