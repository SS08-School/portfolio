# Project instructions

Approved project instructions. Update this file when the owner approves a
different direction.

## Purpose and scope

Build a personal portfolio that introduces the owner and showcases their
background, projects, and skills. This is a school assignment and a learning
project: keep the code readable enough for the owner to explain during a demo.

Owner-provided details: Sebastian Szeliga is enrolled at New Jersey Institute
of Technology (NJIT), majoring in Electrical Engineering. Use "Electrical
Engineering Student" as the Home page headline. His approved public contact
email is `ss5764@njit.edu`.

Skills content should emphasize proficiency with Codex and visual design,
plus clear prompts, feedback, and website planning. The owner does not claim
coding proficiency; do not list programming languages or independent coding
ability as skills unless the owner later confirms them.

Work on one small, requested task at a time. Do not build the entire site when
asked to change one page or feature. Follow the assignment requirements and
these instructions throughout development.

## Pages and content

Keep the current Home content in one continuous page in `index.html`, as
requested by the owner. Additional pages may be added when requested. Home's
section links should scroll within the same page and tab:

- Home (`#home`): A brief introduction.
- My studies (`#studies`): The owner's engineering major and introduction.
- Skills (`#skills`): Skills and accurate descriptions of proficiency.
- Contact (`#contact`): The approved email address as a `mailto:` link; no form.

Provide separate `about.html` and `projects.html` pages. About includes the
owner's enrollment at NJIT and Electrical Engineering major. Omit personal
background until the owner provides it. Projects is currently an honest empty
collection, as requested, until project details are provided. Do not add dummy
cards. Once supplied, include at least three real projects with descriptions,
images, and relevant links when available.

Keep the former `skills.html` and `contact.html` URLs as redirects to the
matching sections in `index.html`, so existing links keep working.

Use a three-line navigation button at the top right on phone and laptop
screens. Its dropdown groups links by the page they belong to. Keep Home,
My studies, Skills, and Contact together under "Home page". Give About me and
Projects their own groups on every page, with Education nested under About me.
Highlight only the current page's primary link, using `aria-current="page"`.
Do not highlight or track the currently viewed section. Each page's first link
and the Home brand should target the document top (`#top`), keeping ordinary
section links pointed at their actual sections. Preserve native link and
browser-Back behavior. When further pages are
requested, give each its own labeled group. Do not add links to pages that do
not exist or list redirect aliases as separate pages.

Use real, owner-provided content. Do not invent credentials, experience,
projects, contact details, or working links. Ask for missing information when
it is needed to complete a task. Finished pages must have no placeholder text,
empty sections, or dummy links.

## Design

- Overall style: friendly, light, and gently playful, with generous spacing,
  rounded project cards, pill-shaped buttons, and subtle shadows. Use soft
  lavender sections and small decorative touches without crowding the content.
- Reveal the studies section, skills heading/cards, and contact content with a
  gentle fade-and-rise effect as they enter view. Reset items when scrolling up
  moves them below view, so they reveal again on the next downward scroll.
  Keep keyboard-focused content visible and skip effects for reduced motion.
- Colors: pale lavender background (`#FAF7FF`), white surfaces (`#FFFFFF`),
  pastel lilac sections (`#EEE5FF`), and soft purple accents (`#E2D2F7`). Use
  dark plum text (`#38254D`), muted plum secondary text (`#695675`), and deeper
  purple (`#755098`) for primary buttons, links, and focus indicators.
- Keep purple and white dominant, with pale peach (`#FBE8DE`) and mint
  (`#E7F3EC`) in the page background. Use a faint dot grid, soft color washes,
  and restrained background shapes to add detail without crowding the content.
  Keep all main content cards solid white in light mode and a consistent dark
  plum in dark mode, with no alternating colors or gradients on rectangular
  surfaces. Background decoration must not block
  clicks, affect layout, or move.
- Keep pastel colors mainly on backgrounds and decoration. Use dark text on
  pale surfaces and white text on deeper purple buttons. Verify contrast for
  the actual combinations used, including hover, focus, and selected states.
- Fonts: use a friendly system font stack such as `"Segoe UI", system-ui,
  -apple-system, sans-serif`, with readable body text and softly weighted
  headings. Avoid external font dependencies.
- Use consistent headers, navigation, footers, buttons, spacing, and typography
  throughout the page. Clearly identify the current page in the navigation.
- Show the full name as a simple, semibold text link at the top left, without
  an initials badge or decorative period.
- Start with a phone layout and expand to a laptop layout using CSS media
  queries. Avoid horizontal scrolling and keep images responsive.
- Default to light mode until the visitor explicitly chooses dark mode. Use an
  icon-only, animated sun/moon button at the top right beside navigation, with
  an accessible name and pressed state. Save the choice in `localStorage`
  across pages and visits, restore it before the stylesheet loads, and keep
  the toggle usable if storage is blocked. Use a dark plum background, uniform
  dark card surfaces, and readable lavender accents in dark mode.
- Ease theme palette changes over about 280ms, while keeping the saved theme
  restoration before first paint immediate. Keep card color transitions in
  sync; stagger only scroll-reveal opacity and motion, not theme colors.
- Use a short, gentle page-entry animation when opening a page or returning
  with browser Back. Keep links native and responsive; do not delay navigation
  or add modal popups. Skip page and icon animation for reduced motion.

## Technical rules and file organization

- Use plain HTML5, CSS, and JavaScript only. No backend, database, login system,
  frameworks, UI libraries, package managers, npm, or build tools.
- Keep HTML pages and redirect files in the repository root, styles in `css/styles.css`,
  shared JavaScript in `js/main.js`, and images in `images/`.
- Use one external stylesheet. Avoid inline styles and inline event handlers.
- All HTML files must reference the same versioned stylesheet URL, such as
  `css/styles.css?v=<content-hash>`. Update the version when CSS changes so
  browser caching does not retain outdated styling. Keep the actual file at
  `css/styles.css`; no build step is needed.
- Version shared script URLs when their contents change, too. Load the small
  `js/theme.js` script before the stylesheet to restore the saved theme; defer
  the main interaction script.
- Use relative paths for local assets and page links. Avoid leading `/` paths
  so the site works under the GitHub Pages `/portfolio/` project path.
- The site must work by double-clicking `index.html`, as well as on GitHub
  Pages. Avoid module imports, fetch-based local content loading, or features
  that require a development server.
- Keep code straightforward, use descriptive names, and comment only where an
  explanation helps the owner understand a decision.
- Keep each image under 500 KB. Use images the owner created or has permission
  to use, and record acknowledgments where appropriate.
- Never add API keys, passwords, tokens, a home address, or a phone number.
  The repository and deployed site are public.

## Interactivity and accessibility

- Keep the grouped navigation, saved theme toggle, and repeating scroll reveals
  working together. Add project filtering with an All option when real project
  content is supplied.
- The grouped navigation dropdown must open and close on every screen size
  using a real button with an accessible name and accurate `aria-expanded`.
  Support keyboard operation, close on Escape, link selection, outside clicks,
  or focus leaving the menu, and keep hidden links out of the tab order. Keep
  grouped navigation visible when JavaScript is unavailable.
- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
  Give each page exactly one `h1` and use a logical heading order.
- Include a skip-to-content link, visible keyboard focus, descriptive link text,
  and alt attributes on every image. Use empty alt text for decorative images.
- Keep keyboard focus visible on interactive controls. Do not draw focus boxes
  around whole main/section containers when navigating to an anchor destination.
- Ensure links, buttons, and any fields work with the keyboard. Respect reduced
  motion preferences if adding animation.
- While the page has focus, support Up/Down scrolling from ordinary links and
  buttons with smooth movement and responsive held-key repeats. Skip smoothing
  for reduced motion. Preserve native arrows in editable controls and nested
  scrolling regions. Cancel scrolling when another input takes over.
- Use custom Tab/Shift+Tab navigation that cycles through available controls
  in document order and excludes hidden, inert, and disabled controls. Continue
  from section/skip-link destinations. Keyboard menu activation should focus
  its first link. Escape closes an open menu; otherwise it releases Tab to the
  browser. Provide a footer toggle and instructions for this behavior. Preserve
  browser shortcuts and never force focus back after a visitor leaves the page.
- Contact uses the owner's approved `mailto:ss5764@njit.edu` link. Display the
  address so visitors can also copy it. Do not restore the inactive form or
  claim a message was sent; opening an email app does not send a message.
- Aim for a Lighthouse Accessibility score of at least 90 on every page.

## Testing and documentation

After each website change, check the affected behavior in VS Code Live Preview
or an available browser, at phone and laptop widths, and with the keyboard.
Also verify that the site still opens directly from `index.html`. Check for
broken links, missing images, and browser console errors.

Maintain `TESTING.md` with at least 12 test cases. Each needs an ID, what is
being tested, steps, expected result, and actual Pass or Fail result after it
is run. Mark cases that have not been run as Not run; never invent results.
The full plan must cover:

- Every navigation link on every page.
- Every page at phone and laptop widths.
- Every JavaScript feature, including valid and invalid input if a form exists.
- Tab and Enter navigation on every page.
- Lighthouse Accessibility results for every page.

Run the full plan on the live GitHub Pages site before submission. Retain failed
results alongside the fixes and retest results. If a check cannot be run, state
that limitation and what remains to be checked.

Keep `README.md` current with the project description, verified live site URL,
instructions for opening `index.html` locally, and acknowledgments. Support the
final report with actual phone and laptop screenshots and an honest record of
challenges, including a real example of an agent mistake and its correction.

## Git and deployment workflow

- Before editing, inspect the working tree and preserve the owner's changes.
- After each completed task, summarize the changes and checks for the owner's
  review. Once reviewed, make a small commit with a clear, descriptive message,
  then push to GitHub with the owner's approval as required by the assignment.
- Stage only files belonging to the task. Never include secrets or unrelated
  edits in a commit.
- Use `git revert` when undoing a committed change. Do not use destructive
  resets or force pushes.
- Deployment target: GitHub Pages, branch `main`, repository root. Verify the
  published page and its links after deployment; do not assume publication
  succeeded just because a push succeeded.
- Work in genuine increments over the project timeline. Never fabricate,
  backdate, or split commits solely to simulate work across multiple days.
