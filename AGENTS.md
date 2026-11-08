# Project instructions

Approved project instructions. Update this file when the owner approves a
different direction.

## Purpose and scope

Build a personal portfolio that introduces the owner and showcases their
background, projects, and skills. This is a school assignment and a learning
project: keep the code readable enough for the owner to explain during a demo.

Owner-provided details: Sebastian Szeliga is majoring in Electrical and
Computer Engineering. Use "Electrical & Computer Engineering Student" as the
Home page headline.

Skills content should emphasize proficiency with Codex and visual design,
plus clear prompts, feedback, and website planning. The owner does not claim
coding proficiency; do not list programming languages or independent coding
ability as skills unless the owner later confirms them.

Work on one small, requested task at a time. Do not build the entire site when
asked to change one page or feature. Follow the assignment requirements and
these instructions throughout development.

## Pages and content

Keep the existing separate Home, About/Education, Projects, Skills, and Contact
pages. The owner has confirmed Education belongs on its own page/tab.

- Home (`index.html`): Show the personal introduction once. Do not repeat it
  in an Education section, and do not add a decorative hero illustration.
  Do not show project cards, an index, or a project showcase on Home. A link
  to the separate Projects page is fine.
- About/Education (`about.html#education`): Keep the education facts here;
  do not repeat "I'm Sebastian" or the Home introduction.
- Projects (`projects.html`): Retain the four interactive Assignment 1 projects.
  Show project images in a manual, keyboard-accessible carousel. Categories may
  appear as labels, but do not add clickable category filters.
- Skills and Contact retain their existing separate page URLs and content.
- Navigation must use valid relative page/section links. Home no longer has
  a My studies section or a duplicate Education link under its navigation group.

Use real, owner-provided content. Do not invent credentials, experience,
projects, contact details, or working links. Ask for missing information when
it is needed to complete a task. Finished pages must have no placeholder text,
empty sections, or dummy links.

## Design

- Overall style: professional and editorial, with a very subtle sunset-like
  wash fading into white, thin rules, and minimal decoration. Use stacked
  project and skill rows rather than repeated boxed cards. Keep narrower
  content layouts and square controls. Avoid floating stickers, pill buttons,
  decorative shadows, and slogans. Show page navigation directly on laptops;
  use a button-controlled menu on smaller screens.
- Use the original black-and-white SS monogram beside the header name and as
  the browser favicon. Keep page-entry effects subtle and slightly slower.
- Reveal the skills heading/cards and contact content with a
  gentle fade-and-rise effect as they enter view. Animate each item once, keep
  keyboard-focused content visible, and skip effects for reduced motion.
- Colors: white (`#FFFFFF`), near-black text (`#171717`), dark-gray secondary
  text (`#555555`), and neutral-gray rules and panels. Use soft peach, rose, and
  cream only in the background gradient; keep graphics black and white. Use a
  subdued warm gradient in the optional dark theme.
- Use dark text on white surfaces and white text on black buttons. Verify contrast for
  the actual combinations used, including hover, focus, and selected states.
- Fonts: use formal, light-looking Palatino serif headings and readable,
  regular-weight system sans-serif body text. Avoid heavy display type and external
  font dependencies; the site must still work offline.
- Keep copy factual. Remove decorative greeting blurbs, promotional taglines,
  and slogans from every page; retain substantive descriptions and instructions.
- Use consistent headers, navigation, footers, buttons, spacing, and typography
  throughout the page. Clearly identify the current section in the navigation.
- Start with a phone layout and expand to a laptop layout using CSS media
  queries. Avoid horizontal scrolling and keep images responsive.

## Technical rules and file organization

- Use plain HTML5, CSS, and JavaScript only. No backend, database, login system,
  frameworks, UI libraries, package managers, npm, or build tools.
- Keep `index.html` and redirect files in the repository root, styles in `css/styles.css`,
  shared JavaScript in `js/main.js`, and images in `images/`.
- Use one external stylesheet. Avoid inline styles and inline event handlers.
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

- Keep the responsive navigation menu, manual project carousel, validated
  contact form, and four interactive demonstrations. Category filtering was
  removed at the owner's request.
- The mobile menu must open and close using a real button with an accessible
  name and accurate `aria-expanded` state. Support keyboard operation and keep
  hidden menu links out of the tab order.
- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
  Give each page exactly one `h1` and use a logical heading order.
- Include a skip-to-content link, visible keyboard focus, descriptive link text,
  and alt attributes on every image. Use empty alt text for decorative images.
- Ensure links, buttons, and any fields work with the keyboard. Respect reduced
  motion preferences if adding animation.
- Start Tab cycling on every page without a footer toggle or a saved off state.
  Arrow keys move focus between controls; editable fields, radios, sliders,
  and select menus keep native arrow behavior. Arrow keys scroll when the page
  background is focused. Escape closes the menu or releases Tab to browser
  navigation for the current page; the next page starts cycling again.
- Contact keeps the public email link and has labeled name, email, and message
  fields. Validate required values, email format, and length; prepare an encoded
  mailto draft link only after validation. Editing any field invalidates the old
  draft. The visitor opens the draft in their own email app. Do not submit to a
  server, store contact input, or claim a message was sent.
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
