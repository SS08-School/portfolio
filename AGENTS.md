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

Use one continuous page in `index.html`, as requested by the owner. This
replaces the earlier separate-page design. Navigation should scroll to sections
in the same page and tab:

- Home (`#home`): A brief introduction.
- My studies (`#studies`): The owner's engineering major and introduction.
- Skills (`#skills`): Skills and accurate descriptions of proficiency.
- Contact (`#contact`): A visual-only contact form. Do not add contact
  information until the owner provides it.
- Add richer About and Projects sections only when requested and when real
  content is available. Projects should include at least three projects, each
  with a description, image, and relevant link when available.

Keep the former `skills.html` and `contact.html` URLs as redirects to the
matching sections in `index.html`, so existing links keep working.

Use real, owner-provided content. Do not invent credentials, experience,
projects, contact details, or working links. Ask for missing information when
it is needed to complete a task. Finished pages must have no placeholder text,
empty sections, or dummy links.

## Design

- Overall style: friendly, light, and gently playful, with generous spacing,
  rounded project cards, pill-shaped buttons, and subtle shadows. Use soft
  lavender sections and small decorative touches without crowding the content.
- Colors: pale lavender background (`#FAF7FF`), white surfaces (`#FFFFFF`),
  pastel lilac sections (`#EEE5FF`), and soft purple accents (`#E2D2F7`). Use
  dark plum text (`#38254D`), muted plum secondary text (`#695675`), and deeper
  purple (`#755098`) for primary buttons, links, and focus indicators.
- Keep pastel colors mainly on backgrounds and decoration. Use dark text on
  pale surfaces and white text on deeper purple buttons. Verify contrast for
  the actual combinations used, including hover, focus, and selected states.
- Fonts: use a friendly system font stack such as `"Segoe UI", system-ui,
  -apple-system, sans-serif`, with readable body text and softly weighted
  headings. Avoid external font dependencies.
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

- Implement at least two JavaScript interactions: a responsive navigation menu
  and project filtering with an All option.
- The mobile menu must open and close using a real button with an accessible
  name and accurate `aria-expanded` state. Support keyboard operation and keep
  hidden menu links out of the tab order.
- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
  Give each page exactly one `h1` and use a logical heading order.
- Include a skip-to-content link, visible keyboard focus, descriptive link text,
  and alt attributes on every image. Use empty alt text for decorative images.
- Ensure links, buttons, and any fields work with the keyboard. Respect reduced
  motion preferences if adding animation.
- The contact form is visual only, as requested by the owner. Label its fields
  and keep the Send button disabled. Do not display demo badges, disabled-send
  notices, or explanatory text about its inactive behavior. Do not add
  validation, submission, storage, or email behavior unless the owner requests
  it. Never claim a message was sent.
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
