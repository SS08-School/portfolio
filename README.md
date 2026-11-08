# Sebastian Szeliga's Portfolio

A personal portfolio for Sebastian Szeliga, an Electrical & Computer
Engineering student enrolled at NJIT. Built with plain HTML, CSS, and
JavaScript. The design uses a very subtle peach, rose, and cream wash that
fades into white, near-black text, formal Palatino headings, readable system
sans-serif body text, fine gray rules, and stacked project and skill rows. Project
illustrations stay black and white. There are no external fonts, floating
stickers, or decorative shadows.

## View locally

Open `index.html` directly in a browser, or use VS Code Live Preview. No
installation, build step, or server is required.

## Current progress

Home, About me, Projects, Skills, and Contact each have their own HTML page.
All five navigation links are visible on laptop screens. A labeled Menu button
opens navigation on smaller screens. Education remains on About. Navigation highlights
only the current page. Section links remain unselected. Each page's primary
link opens at the document top.
The header uses a text-only name link. Home includes an index linking directly
to the four working demonstrations and a direct route to Contact. It uses the approved headline
"Electrical & Computer Engineering Student." Decorative greetings, slogans,
and promotional blurbs have been removed throughout the site; factual
descriptions, project explanations, and operating instructions remain.

The "I'm Sebastian" introduction appears once, on Home. Its decorative circuit
illustration and duplicated Education section have been removed. About retains
the education facts without repeating the introduction. The layout is slightly
narrower, with Home, About/Education, and Contact content stacked vertically.

About me includes enrollment at NJIT and the Electrical & Computer Engineering major.
Personal background can be added later. Projects now showcases the four real
mini projects in the owner's Assignment 1 notebook: Calculator, Shopping Cart,
Rock Paper Scissors, and Fibonacci Sequence. All four now have browser demos,
with All projects, Games, Math, and Simulations filters.

Rock Paper Scissors runs on the page, with an adaptive computer opponent,
random picks, or two-player pass-and-play on one device. Both players' choices
are revealed together; a handoff screen conceals Player 1's choice. The first
player to five wins the match. Reset clears the score and computer memory.
The adaptive opponent counters a sample of previous player choices, with a
25% chance of choosing randomly; it commits before the current player move.
This is a small local strategy, with no external AI service or network play.

The Fibonacci explorer generates 1–100 terms with exact BigInt values, starting
at 0. Select any term to inspect its addition and ratio, step backward or
forward, or replay the sequence. The square spiral shows up to the first 12
terms to keep small squares readable.

Calculator supports addition, subtraction, multiplication, and division,
including negative and decimal inputs. It checks missing/invalid numbers,
division by zero, and nonfinite results. Answers display to 12 significant
digits, with the last five successful calculations retained until reset or
reload. Reset example restores 12 + 3.

Shopping Cart uses the original shelf: 2 Frosted Flakes at $2.99 each, 3 eggs
at $5.99 each, and 4 sourdough loaves at $3.99 each. Add a whole-number quantity,
adjust quantities in the basket, remove a line, or empty the basket. Shelf
stock and totals update together; calculations use integer cents. All nine
items total $39.91. There is no checkout or persistent storage.

These browser adaptations were built with Codex and are
distinguished from the original Python classroom work.

Open `projects.html` directly, or follow Projects from `index.html`. The existing
five-page structure is retained; education belongs on the separate About page.
Skills cover Codex, visual design, creative feedback, and website planning.
Contact displays `ss5764@njit.edu` as a clickable email link that opens the
visitor's email app; there is no form or automatic sending.

The site includes gentle, once-only scroll reveals for education, skill cards,
and contact content. Revealed items remain visible when revisited.
Reduced-motion preferences skip the effect. Content remains visible without
JavaScript or animation support.

A sun/moon button at the top right switches between light and dark mode.
Light is the default; an explicit choice is stored in the browser and restored
before styling loads on every page. Default light mode uses a subtle sunset
background; dark mode uses a subdued warm gradient with light text. The preference persists across visits in
that browser until its site storage is cleared. Storage restrictions do not
break the current-page toggle. Gentle page-entry effects soften navigation and
browser Back, with reduced-motion preferences respected throughout. Theme
colors ease over 280ms while restoring a saved theme before page load remains
immediate.

Skills and Contact now open directly at `skills.html` and `contact.html`;
their previous redirect markup has been removed.

With the page focused, Up/Down scrolls smoothly from ordinary links and buttons;
holding a key continues the movement. Reduced motion uses immediate scrolling.
Tab/Shift+Tab cycles through available controls in page order, skipping closed
menu links and disabled controls. Enter activates links and buttons; Space
activates buttons. Keyboard menu activation focuses its first link. Escape
closes an open menu; with the menu closed it switches back to standard Tab
navigation. A compact "Keep Tab on this page" button is available under Keyboard
options in the footer, with instructions shown on focus. Cycling defaults on; choosing
on/off with the button or turning it off with Escape saves that choice across
pages and visits in the same browser. Clearing site storage returns it to on.
If storage is blocked, the choice still works for the current page.
Editable controls and tall dropdowns keep native arrow behavior. Browser
shortcuts remain available; the site only handles keys while the page has focus.

Live website: [Sebastian Szeliga's Portfolio](https://ss08-school.github.io/portfolio/).
Home, About, Projects, the grouped navigation, and the email contact update
were deployed on October 22, 2026. All three pages, the stylesheet, and the
shared script were verified to load successfully.
The saved theme toggle and page-entry animations were deployed on October 22,
2026; all three content pages and the versioned assets were verified to load.
The page-only highlighting, page-top links, and gradual palette refinements
were deployed on October 22, 2026; all three content pages and the updated
versioned stylesheet and script were verified to load with the expected source.
Visual, keyboard, and Lighthouse checks are still pending; see `TESTING.md`.
The five-page revision was deployed on October 26, 2026. All five pages and
their versioned shared assets were verified to load with the expected source.

The monochrome redesign and site-wide copy cleanup of November 2, 2026 retain
the existing five-page structure and all four interactive projects.

## Project files

- `index.html`: The single personal introduction, without a hero illustration.
- `about.html`: About me and education at NJIT.
- `projects.html`: Assignment 1 collection and interactive game/sequence labs.
- `skills.html`: Codex, visual design, creative feedback, and website planning.
- `contact.html`: The owner's public email link.
- `css/styles.css`: Shared stylesheet and responsive layouts.
- `js/main.js`: Shared navigation, keyboard controls, reveals, project filters,
  and all four interactive Assignment 1 demos.
- `images/`: Original SVG hand illustrations and assignment thumbnails.
- `screenshots/`: Actual local phone and laptop browser captures for the report.
- `js/theme.js`: Early theme restoration, sun/moon toggle, and saved preference.
- `AGENTS.md`: Project requirements, design, and workflow.
- `TESTING.md`: Test plan and verification status.

## Acknowledgments

Developed with Codex. The six SVG project illustrations were created for this
site with Codex. No external
fonts, image assets, libraries, or AI APIs are used. Project descriptions and
the Fibonacci loop excerpt are based on the owner-supplied
`Assignment_1_Sebastian_Szeliga (1).ipynb`; the notebook itself is not published.

Local Chrome checks on October 26, 2026 passed 45 scripted assertions in each
of four configurations: 320px, 390px, laptop (1348px content viewport), and
320px with reduced motion. Phone and laptop screenshots were visually checked.
These checks use actual browser DOM behavior but programmatic clicks/focus;
physical Tab/Enter and Lighthouse checks remain pending. See `TESTING.md`
for the first failures, corrections, and the remaining submission checks.

The all-project follow-up passed 80 scripted assertions in each of the same
four browser configurations on October 26, 2026. Results are retained in
`screenshots/all-projects-browser-checks.json`. Actual phone and laptop captures
of Calculator and Shopping Cart were visually inspected. These are local
browser checks; physical keyboard, Lighthouse, and deployment retests remain
pending.

Redesign checks on November 2, 2026 passed 603 scripted browser assertions
across 21 configurations: every page at 320px, 390px, and 1366px; every page
in saved dark mode at 1366px; and Projects at 320px with reduced motion.
Checks include navigation, focus, contrast, image loading, and regression
coverage for all four projects. Evidence is in
`screenshots/monochrome-browser-checks.json`, with current phone/laptop captures
named `screenshots/monochrome-*.png`. Physical keyboard, screen-reader, and
Lighthouse testing remain pending; these local checks do not verify deployment.

The sunset-background and introduction-cleanup follow-up passed 270 focused assertions
across 17 local browser configurations: all five pages at 320px, 390px, and
1366px, plus saved dark-mode checks for Home and Projects. Evidence is in
`screenshots/sunset-browser-checks.json`, with current captures named
`screenshots/sunset-*.png`. This is a focused layout and smoke-check pass, not
a repeat of every earlier project edge case or the full live-site audit.

## Editorial portfolio refinement — November 7, 2026

The local revision uses visible laptop navigation, a compact mobile menu,
a Home project index, and flat ruled sections for Projects, Skills, Education,
and Contact. The warm background is quieter and body text uses a readable
regular weight. Existing content and all four interactive demonstrations remain.

Validation passed 446 scripted assertions across 20 local configurations:
every page at 320px, 390px, and 1366px in light mode, plus every page at 1366px
in saved dark mode. Another 62 native browser input/resize assertions passed,
covering Tab, Shift+Tab, Enter, Escape, the keyboard-options disclosure, and
focus across layout changes. Four focused style checks passed for About button
spacing and selected-filter hover contrast. All 73 local references resolve.

Evidence is in `screenshots/editorial-*-checks.json`. Current actual phone and
laptop captures are `screenshots/editorial-*.png`; the spacing-before capture
records an error corrected during review. Initial failed test records are
retained and explained in TESTING.md. These checks use local files and automated
browser input; physical keyboard, screen-reader, Lighthouse, and the full
published-site audit remain pending. Deployment/source verification is separate
from the full submission audit.
