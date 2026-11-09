# Project instructions

Approved project instructions. Update this file when the owner approves a
different direction.

## Purpose and scope

Build a personal portfolio that introduces the owner and showcases their
background, projects, and skills. This is a school assignment and a learning
project: keep the code readable enough for the owner to explain during a demo.

Owner-provided details: Sebastian Szeliga is majoring in Electrical and
Computer Engineering. Use "Hi, I'm Sebastian." as the Home headline, with
"I'm an Electrical & Computer Engineering student at New Jersey Institute of
Technology." as the smaller introduction beneath it.

Skills content should emphasize proficiency with Codex and visual design,
plus clear prompts, feedback, and website planning. The owner does not claim
coding proficiency; do not list programming languages or independent coding
ability as skills unless the owner later confirms them.
The owner has confirmed proficiency in Adobe Illustrator, Adobe Photoshop,
and Adobe Premiere Pro; include them as proficient skills.

Work on one small, requested task at a time. Do not build the entire site when
asked to change one page or feature. Follow the assignment requirements and
these instructions throughout development.

## Pages and content

Use one scrolling page in `index.html`, ordered Home, About/Education, Projects,
Skills, then Contact. Keep the current top tab layout; use native links to
`#home`, `#about`, `#projects`, `#skills`, and `#contact`. Keep older page URLs as
redirects to their corresponding sections, including existing deep bookmarks.

- Home (`index.html`): Show the personal introduction once. Do not repeat it
  in an Education section. The owner's supplied glowing light bulb is approved
  beside the introduction, tilted about 35 degrees counterclockwise. Use a
  transparent cutout, descriptive alt text, and keep its original colors in
  dark mode. Stack it below the text on narrow screens without overflow.
  With a fine mouse pointer, gently repel it from nearby movement using a range
  scaled to the displayed image (8% of its shorter side, capped at 24px). Ease it
  back when the pointer leaves; keep it still for touch and reduced motion.
  Do not show project cards, an index, or a project showcase on Home. A link
  to the Projects section is fine.
- About/Education (`index.html#about`, with `#education` inside): Keep the education facts here. Above
  Get in touch, use the owner's approved text: "I'm Sebastian. I like working on
  different kinds of creative projects and solving problems. Got a question?
  Let me know!" Do not repeat the full Home introduction.
- Projects (`index.html#projects`): Retain the four interactive Assignment 1 projects.
  Rock Paper Scissors offers random computer picks and two-player mode only;
  do not restore the adaptive AI or a computer-strategy dropdown.
  Show project images in a manual, keyboard-accessible carousel. Categories may
  appear as labels, but do not add clickable category filters.
- Skills and Contact retain their content in `#skills` and `#contact`.
- Navigation must use valid same-document section links. Home no longer has
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
  decorative shadows, and slogans. Use the visible Home, About, Projects,
  Skills, and Contact tabs from the pre-dropdown header (`e0d6cbb`): a compact
  five-column row on phones and an inline row on laptops. Do not add a hamburger
  or dropdown. Keep native page links, no horizontal navigation scrolling, and
  only the current section underlined. Pointer clicks must not leave a focus/pressed
  appearance; retain visible keyboard focus and real theme/project choices.
- Repeat restrained triangles pointing both left and right down the full length
  of each page's unused side gutters at widths of at least 80rem. Anchor them to
  the document so they scroll with the page, never fixed to the viewport. Repeat
  them across the gutter too, using a sparse checkerboard arrangement: adjacent
  triangles alternate direction both horizontally and vertically, with generous
  gaps. Keep a gradient fading from stronger outer edges to transparent near
  the content. Use near-black in light mode and matching light ink in dark mode.
  Keep them outside the content, unable to intercept clicks or focus, and absent
  on narrower screens.
  On page entry, let individual triangles briefly dim and return to normal at
  independent random times within two seconds. Make this perceptible but gentle;
  never loop the glimmer or replay it on scroll. With a fine mouse pointer,
  triangles within 96px may ease away by at most 6px and return when it leaves.
  Distant triangles remain at rest. Stop animation frames once settled, retain
  the static CSS fallback, respect reduced motion, clean up hidden pages, and
  replay the entry glimmer on cached Back navigation.
- Use the original black-and-white SS monogram beside the header name and as
  the browser favicon. Keep page-entry effects subtle and slightly slower.
- Use matching inline SVG arrow icons on every device, including dynamically
  updated buttons. Do not rely on emoji or font arrow glyphs. Restrict hover
  effects to hover-capable fine pointers; touch press feedback ends on release.
  Preserve real selected choices/current-page indicators and keyboard focus.
- Reveal the skills heading/cards and contact content with a
  gentle fade-and-rise effect as they enter view. Animate each item once, keep
  keyboard-focused content visible, and skip effects for reduced motion.
- Colors: white (`#FFFFFF`), near-black text (`#171717`), dark-gray secondary
  text (`#555555`), and neutral-gray rules and panels. Use soft peach, rose, and
  cream only in the background gradient; keep graphics black and white. Use a
  solid near-black background with no gradient in the optional dark theme.
  The owner-approved Home bulb retains its original warm glow as an exception.
- Use dark text on white surfaces and white text on black buttons. Verify contrast for
  the actual combinations used, including hover, focus, and selected states.
- Fonts: use formal, light-looking Palatino serif headings and readable,
  regular-weight system sans-serif body text. Avoid heavy display type and external
  font dependencies; the site must still work offline.
- Keep copy factual. Remove decorative greeting blurbs, promotional taglines,
  and slogans from every page; retain substantive descriptions and instructions.
  The owner-approved Home greeting and About paragraph are explicit exceptions.
- Shopping shelf items use original monochrome outline SVG illustrations of a
  cereal box, eggs, and bread instead of initials. Keep the product names visible
  and the adjacent illustrations decorative; retain contrast in dark mode.
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

- Keep the responsive page tabs, manual project carousel, validated
  contact form, and four interactive demonstrations. Category filtering was
  removed at the owner's request.
- Page tabs must always be visible and keyboard-accessible, including without
  JavaScript. Each tab follows its native fragment href; do not intercept clicks,
  hide links, or force focus elsewhere during activation. Use aria-current="location"
  for exactly one current section, updating it as the visitor scrolls. Keep navigation text non-selectable and retain
  keyboard focus indicators; pointer focus must not resemble a persistent choice.
- Only in the mobile layout (below 60rem), show the sticky header when scrolling
  upward and hide it when scrolling downward. Keep it visible near the page top,
  or when header controls have visible keyboard focus.
  Desktop headers scroll normally. Respect reduced motion.
- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
  Give the combined page exactly one `h1`, use `h2` for the other four main
  sections, and use a logical heading order within them.
- Do not include a skip/jump-to-content link, as requested by the owner.
  Retain visible keyboard focus, descriptive link text, and alt attributes on
  every image. Use empty alt text for decorative images.
- Ensure links, buttons, and any fields work with the keyboard. Respect reduced
  motion preferences if adding animation.
- Back to the top scrolls smoothly when clicked or activated with Enter; use
  instant scrolling when reduced motion is requested.
- Start Tab cycling on every page without a footer toggle or a saved off state.
  Left/Right move through controls in order. Up/Down move to controls on the
  visual row above/below; if none exists in that direction, scroll vertically.
  On Projects, Up/Down navigate from selection and number controls without
  changing their values. Left/Right retain native adjustment and caret movement,
  except calculator operations use Left/Right to move focus without selecting.
  Cart Left/Right follow each product's Quantity, Add, minus, plus, and Remove
  controls, skipping unavailable controls; Empty basket comes after the products.
  Enter on a calculator operation selects the focused symbol; calculate only
  when submitting the form. Do not display recent calculation history.
  Text fields on other pages keep native arrow behavior.
  Arrow keys scroll when the page background is focused. Escape releases Tab
  to browser navigation for the current page; the next page starts cycling again.
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
The owner has asked to stop computer control: do not automate their browser or
other apps, or capture screenshots, unless they explicitly authorize it again.
Use source/isolated-logic checks and record browser/device checks for owner testing.

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
