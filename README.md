# Sebastian Szeliga's Portfolio

A personal portfolio for Sebastian Szeliga, an Electrical Engineering student
enrolled at NJIT. Built with plain HTML, CSS, and JavaScript, using a
friendly pastel-purple design with solid white content cards, a faint dot
grid, and gentle peach, mint, and lavender washes in the page background.

## View locally

Open `index.html` directly in a browser, or use VS Code Live Preview. No
installation, build step, or server is required.

## Current progress

Home, About me, Projects, Skills, and Contact each have their own HTML page.
The three-line dropdown links to all five on phone and laptop screens, with
My studies nested under Home and Education under About me. Navigation highlights
only the current page. Section links remain unselected. Each page's primary
link opens at the document top.
The header uses a clean text-only name link, and Home greets visitors with
"Hi, I'm Sebastian."

About me includes enrollment at NJIT and the Electrical Engineering major.
Personal background can be added later. Projects shows an honest empty
collection until real project descriptions, images, and links are supplied.
Skills cover Codex, visual design, creative feedback, and website planning.
Contact displays `ss5764@njit.edu` as a clickable email link that opens the
visitor's email app; there is no form or automatic sending.

The site includes gentle scroll reveals for the studies section, skill
cards, and contact content. Items reset when scrolling up moves them below view,
then reveal again when scrolling back down. Reduced-motion preferences skip the
effect. Content remains visible without JavaScript or animation support.

A sun/moon button at the top right switches between light and dark mode.
Light is the default; an explicit choice is stored in the browser and restored
before styling loads on every page. The preference persists across visits in
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
navigation. A compact "Keep Tab on this page" button sits at the bottom-right
of the footer, with instructions shown on focus. Cycling defaults on; choosing
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
The five-page revision is local and has not yet been deployed.

## Project files

- `index.html`: Home introduction and My studies.
- `about.html`: About me and education at NJIT.
- `projects.html`: Project collection, ready for owner-provided details.
- `skills.html`: Codex, visual design, creative feedback, and website planning.
- `contact.html`: The owner's public email link.
- `css/styles.css`: Shared stylesheet and responsive layouts.
- `js/main.js`: Grouped dropdown, page-top navigation, page entry, and scroll reveals.
- `js/theme.js`: Early theme restoration, sun/moon toggle, and saved preference.
- `AGENTS.md`: Project requirements, design, and workflow.
- `TESTING.md`: Test plan and verification status.

## Acknowledgments

Developed with Codex. The decorative circuit illustration is an inline SVG
created for this site. No external fonts, image assets, or libraries are used.
