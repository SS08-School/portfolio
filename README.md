# Sebastian Szeliga's Portfolio

A personal portfolio for Sebastian Szeliga, an Electrical Engineering student
enrolled at NJIT. Built with plain HTML, CSS, and JavaScript, using a
friendly pastel-purple design with solid white content cards, a faint dot
grid, and gentle peach, mint, and lavender washes in the page background.

## View locally

Open `index.html` directly in a browser, or use VS Code Live Preview. No
installation, build step, or server is required.

## Current progress

The Home page has Home, My studies, Skills, and Contact sections. Separate
About me and Projects pages are available from the three-line dropdown on
phone and laptop screens. Navigation groups each page's links together and
marks the current page and section. Home section links stay on Home.

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
browser Back, with reduced-motion preferences respected throughout.

The former Skills and Contact page URLs redirect to their matching Home
sections.

Live website: [Sebastian Szeliga's Portfolio](https://ss08-school.github.io/portfolio/).
Home, About, Projects, the grouped navigation, and the email contact update
were deployed on October 22, 2026. All three pages, the stylesheet, and the
shared script were verified to load successfully.
The theme toggle and page-entry animation revision is local and not yet deployed.
Visual, keyboard, and Lighthouse checks are still pending; see `TESTING.md`.

## Project files

- `index.html`: Main page with Home, My studies, Skills, and Contact sections.
- `about.html`: About me and education at NJIT.
- `projects.html`: Project collection, ready for owner-provided details.
- `skills.html`: Redirect to `index.html#skills` for existing links.
- `contact.html`: Redirect to `index.html#contact` for existing links.
- `css/styles.css`: Shared stylesheet and responsive layouts.
- `js/main.js`: Grouped dropdown, current-section highlighting, and scroll reveals.
- `js/theme.js`: Early theme restoration, sun/moon toggle, and saved preference.
- `AGENTS.md`: Project requirements, design, and workflow.
- `TESTING.md`: Test plan and verification status.

## Acknowledgments

Developed with Codex. The decorative circuit illustration is an inline SVG
created for this site. No external fonts, image assets, or libraries are used.
