# Project instructions

Approved project instructions. Update this file when the owner approves a
different direction.

## Purpose and scope

Build a personal portfolio that introduces the owner and showcases their
background, projects, and skills. This is a school assignment and a learning
project: keep the code readable enough for the owner to explain during a demo.

Work on one small, requested task at a time. Do not build the entire site when
asked to change one page or feature. Follow the assignment requirements and
these instructions throughout development.

## Pages and content

Provide five separate pages, with links to all five in every page's navigation:

- `index.html`: Home, with a brief introduction and links to the other pages.
- `about.html`: About Me, covering background, education, and interests.
- `projects.html`: At least three projects, each with a description, an image or
  screenshot, and a relevant link when available. Class projects are welcome.
- `skills.html`: Technical skills and accurate descriptions of proficiency.
- `contact.html`: Owner-approved public contact information, using an email
  link and optional professional profile links.

Use real, owner-provided content. Do not invent credentials, experience,
projects, contact details, or working links. Ask for missing information when
it is needed to complete a task. Finished pages must have no placeholder text,
empty sections, or dummy links.

## Design

- Overall style: clean, welcoming, and simple, with generous spacing and clear
  project cards. Keep decoration subtle so the content stays easy to read.
- Colors: off-white background (`#F8FAFC`), white surfaces (`#FFFFFF`), dark navy
  text (`#0F172A`), slate secondary text (`#475569`), and teal accents (`#0F766E`).
  Verify contrast for the actual combinations used, including interactive states.
- Fonts: use a system font stack such as `system-ui, -apple-system, "Segoe UI",
  sans-serif`. Avoid external font dependencies.
- Use consistent headers, navigation, footers, buttons, spacing, and typography
  on every page. Clearly identify the current page in the navigation.
- Start with a phone layout and expand to a laptop layout using CSS media
  queries. Avoid horizontal scrolling and keep images responsive.

## Technical rules and file organization

- Use plain HTML5, CSS, and JavaScript only. No backend, database, login system,
  frameworks, UI libraries, package managers, npm, or build tools.
- Keep HTML pages in the repository root, shared styles in `css/styles.css`,
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
- If a contact form is requested later, label its fields, validate input with
  JavaScript, and direct visitors to email. Never claim a message was sent:
  this static site cannot send or store form submissions.
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
