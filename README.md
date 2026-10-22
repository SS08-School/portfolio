# Sebastian Szeliga's Portfolio

A personal portfolio for Sebastian Szeliga, an Electrical and Computer
Engineering student. Built with plain HTML, CSS, and JavaScript, using a
friendly pastel-purple design.

## View locally

Open `index.html` directly in a browser, or use VS Code Live Preview. No
installation, build step, or server is required.

## Current progress

The portfolio is one scrolling page: Home, My studies, Skills, and Contact.
Navigation jumps to these sections in the same tab and highlights the current
section while scrolling. Skills cover Codex, visual design, creative feedback,
and website planning with descriptive proficiency levels. The Contact section
has labeled fields and an inactive Send button, without visible demo notices;
it does not send or store messages.

The site includes gentle scroll reveals for the studies section, skill
cards, and contact content. Each item animates once; reduced-motion preferences
skip the effect. Content remains visible without JavaScript or animation support.

Richer About and Projects sections can be added in later tasks using
owner-provided content. The former Skills and Contact page URLs redirect to
their matching sections on the main page.

Live website: [Sebastian Szeliga's Portfolio](https://ss08-school.github.io/portfolio/).
The single-page revision was deployed and verified on October 22, 2026. The
main page, stylesheet, script, and former-page redirect targets load successfully.
Visual, keyboard, and Lighthouse checks are still pending; see `TESTING.md`.

## Project files

- `index.html`: Main page with Home, My studies, Skills, and Contact sections.
- `skills.html`: Redirect to `index.html#skills` for existing links.
- `contact.html`: Redirect to `index.html#contact` for existing links.
- `css/styles.css`: Shared stylesheet and responsive layouts.
- `js/main.js`: Responsive menu, current-section highlighting, and scroll reveals.
- `AGENTS.md`: Project requirements, design, and workflow.
- `TESTING.md`: Test plan and verification status.

## Acknowledgments

Developed with Codex. The decorative circuit illustration is an inline SVG
created for this site. No external fonts, image assets, or libraries are used.
