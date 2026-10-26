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
    'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]'
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

const projectFilters = document.querySelector(".project-filters");
if (projectFilters) {
  projectFilters.hidden = false;
  const projectCards = document.querySelectorAll("[data-project-category]");
  projectFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-filter]");
    if (!button) return;
    const category = button.dataset.projectFilter;
    for (const filter of projectFilters.querySelectorAll("button")) {
      filter.setAttribute("aria-pressed", String(filter === button));
    }
    let count = 0;
    for (const card of projectCards) {
      card.hidden = category !== "all" && card.dataset.projectCategory !== category;
      if (!card.hidden) count++;
    }
    document.querySelector("#filter-status").textContent = `${count} projects shown. Interactive labs remain available below the collection.`;
  });
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
  const strategy = find("#computer-strategy");
  const names = { rock: "Rock", paper: "Paper", scissors: "Scissors" };
  const choices = Object.keys(names);
  const counterMove = { rock: "paper", paper: "scissors", scissors: "rock" };
  let mode = "computer";
  let phase = "choosing";
  let firstMove = null;
  let computerMove = null;
  let scores = { one: 0, two: 0, tie: 0 };
  let round = 1;
  let pastMoves = [];
  let history = [];
  let revealTimer = null;
  let focusAfterReveal = false;

  function randomMove() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function commitComputerMove() {
    // Commit using earlier rounds only, before the player's current choice exists.
    if (strategy.value === "random" || !pastMoves.length || Math.random() < 0.25) return randomMove();
    const predicted = pastMoves[Math.floor(Math.random() * pastMoves.length)];
    return counterMove[predicted];
  }

  function announce(title, instruction) {
    find("#game-result").textContent = title;
    find("#game-instruction").textContent = instruction;
  }

  function setHands(left, right) {
    for (const [side, move] of [["left", left], ["right", right]]) {
      const image = find(`#${side}-hand`);
      image.src = `images/${move || "rock"}.svg`;
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
    computerMove = mode === "computer" ? commitComputerMove() : null;
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
    announce(mode === "friend" ? "Player 1, make your move." : "A classic. With a little attitude.",
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
    pastMoves = [];
    history = [];
    updateScores();
    find("#round-history").replaceChildren();
    const empty = document.createElement("li");
    empty.textContent = "Your story starts with a move.";
    find("#round-history").append(empty);
    find("#player-one-label").textContent = mode === "friend" ? "PLAYER 1" : "YOU";
    find("#player-two-label").textContent = mode === "friend" ? "PLAYER 2" : "COMPUTER";
    find("#computer-setting").hidden = mode === "friend";
    find("#game-mode-note").textContent = mode === "friend"
      ? "One device, two players. Keep your pick private, then pass the device."
      : strategy.value === "adaptive"
        ? "The AI looks for patterns in earlier rounds. Your current move stays secret."
        : "The computer commits to a random move before you choose.";
    prepareRound();
  }

  function finishRound(left, right) {
    const winner = rockPaperScissorsWinner(left, right);
    scores[winner]++;
    if (mode === "computer") pastMoves.push(left);
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
    nextButton.textContent = matchOver ? "Play again ↺" : "Next round ↗";
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
  strategy.addEventListener("change", resetMatch);
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
      button.setAttribute("aria-label", `Term ${index + 1}: ${term}`);
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
