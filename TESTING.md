# Website test plan

The current revision uses one page with Home, My studies, Skills, and
Contact sections. Former Skills and Contact URLs redirect to their sections.
About content, Projects, and project filtering are planned for later tasks.
Run these cases on the live GitHub Pages site before
submission, recording its URL, browser, viewport, and test date. For cases
covering multiple sections, record a result for each section. Earlier check
records below describe the previous separate-page versions; rerun the cases
for this revision.

No browser interaction results have been recorded yet. "Not run" is a pending
status, not a passing result. Keep failed results and add dated retest results
after fixing issues.

## Local checks on 2026-10-19

- Passed static checks for one Home page `h1`, unique IDs, existing local link
  targets and assets, and no inline styles or event handlers.
- JavaScript syntax check passed. Simulated interaction checks passed for menu
  opening/closing, Escape focus return, closing after link activation, and focus
  handling across phone/laptop breakpoints. These used mocked elements and do
  not replace browser or keyboard testing.
- Calculated contrast for the specified body-text combinations and primary
  button text: all exceed 4.5:1. This does not replace a full accessibility audit.
- Browser preview was unavailable in this session. Visual layout, actual
  keyboard behavior, console checks, direct-file behavior,
  and Lighthouse remain unverified.

## Deployment check on 2026-10-19

- GitHub Pages build and deployment succeeded for commit `54e66b2`.
- `https://ss08-school.github.io/portfolio/` returned HTTP 200 with the expected
  Sebastian Szeliga page title and engineering headline.
- The published `css/styles.css` and `js/main.js` each returned HTTP 200.
- These HTTP checks verify publication and asset availability. The browser
  interaction and layout cases below remain pending.

## Local Contact page checks on 2026-10-19

- Static checks passed for Home and Contact links, local assets, one `h1` per
  page, unique IDs, and explicit labels for all three contact fields.
- Confirmed a disabled non-submit button and no native form submission,
  message transmission, or message storage code. The visual form uses an ARIA
  form landmark so Enter cannot submit it, even without JavaScript.
- Browser preview was unavailable; visual layout, keyboard interaction, and
  live Contact page deployment have not been verified.

## Browser and live-site cases

Local Skills checks on 2026-10-19 passed for relative links, assets, fragment
targets, unique IDs, one `h1`, and one current-page indicator on each of Home,
Skills, and Contact. All three pages link to each other. The Skills page has
four proficiency descriptions; the Contact button remains disabled with no
native form submission. No connected browser was available for visual,
keyboard, or Lighthouse checks.

Skills and Contact deployment check on 2026-10-19: GitHub Pages deployment
succeeded for commit `fa99158`. Home, Skills, Contact, the stylesheet, and the
script all returned HTTP 200. Each page includes Skills and Contact navigation
links; the live Skills page contains the proficiency content, and the live
Contact page contains the visual-demo notice. HTTP checks passed; the browser
interaction cases below remain Not run.

Single-page revision checks on 2026-10-19: static checks passed for one main
`h1`, unique IDs, section anchors, local assets, former-URL redirect targets,
field labels, and the disabled non-submit Send button. Confirmed that the
page's visible text has no demo or disabled-send notices. JavaScript syntax
and simulated current-section highlighting checks passed, including scrolling
down/up, bottom-of-page detection, load, and resize. These simulations used
mocked geometry; visual, keyboard, direct-file redirect, and Lighthouse checks
remain Not run. At the time of these local checks, the revision had not been deployed.

Single-page deployment checks on 2026-10-22: GitHub Pages deployment succeeded
for commit `0d07e29`. The main page, stylesheet, script, and former Skills and
Contact URLs returned HTTP 200. Verified the Skills and Contact sections and
same-page navigation anchors in the published HTML, the inactive Send button,
the absence of visible demo or disabled-send notices, and the redirect markup
to `index.html#skills` and `index.html#contact`. These HTTP/source checks passed;
actual browser scrolling, keyboard behavior, redirect execution, visual layout,
and Lighthouse remain Not run.

Local scroll-reveal checks on 2026-10-22: JavaScript syntax and simulated
interaction checks passed for leaving initially visible content alone,
revealing off-screen items once, revealing focused content immediately, and
clearing effects when reduced motion is enabled. Reduced-motion and missing
IntersectionObserver fallbacks kept all content visible. Markup has no pending
animation classes, so JavaScript-disabled content is visible by default. No
connected browser was available; actual phone/laptop animation, keyboard, and
visual checks remain Not run. At the time of these local checks, the animation
changes had not been deployed.

Scroll-effect deployment check on 2026-10-22: GitHub Pages deployment succeeded
for commit `52a75e4`. The live stylesheet and script returned HTTP 200 and
contained the reveal styles, IntersectionObserver logic, and reduced-motion
guard. Deployment/source checks passed; actual visual animation and keyboard
checks in a browser remain Not run.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T1 | Section navigation | Activate the brand and every navigation link on the main page, including with Tab and Enter. | Each link reaches its section in the same page and tab; keyboard focus reaches the target section. | Not run |
| T2 | Former page URLs | Open skills.html and contact.html directly and from a local file. Disable automatic redirects and test fallback links. | Each URL leads to the corresponding main-page section; fallback links work without JavaScript. | Not run |
| T3 | Phone layouts | View every implemented page at widths of 320px and 390px; scroll top to bottom. | No sideways scrolling, clipped text, or overlapping content. | Not run |
| T4 | Laptop layouts | View every implemented page at 1366px wide; scroll top to bottom. | Content and navigation are readable and aligned. | Not run |
| T5 | Mobile menu toggle | At 390px wide, activate Menu twice. | Navigation opens and closes; aria-expanded matches its state. | Not run |
| T6 | Mobile menu keyboard | Tab to Menu, press Enter, then Tab through links. Close with Escape. | All links are reachable while open; Escape closes the menu and returns focus to Menu; closed links are skipped. | Not run |
| T7 | Navigation resize | Open the mobile menu, resize above 768px, then back below 768px. Repeat with a link focused. | Desktop links remain visible; mobile menu resets closed; focus is never left in hidden content. | Not run |
| T8 | Keyboard on every page | On each page, use Tab, Shift+Tab, and Enter through every interactive element. | Logical focus order, visible focus, working controls, and no keyboard traps. | Not run |
| T9 | Skip link | Reload each page, press Tab, then Enter. | Skip link appears and moves focus to main content. | Not run |
| T10 | Accessibility audit | Run Chrome DevTools Lighthouse Accessibility on every page. Record each score. | Each page scores at least 90; resolve reported issues. | Not run |
| T11 | Assets and console | Load each page and inspect the console and network panel; inspect image descriptions. | No script errors or missing assets; images have appropriate alt attributes. | Not run |
| T12 | Direct-file operation | Double-click index.html; use its links and mobile menu. Repeat for other pages as added. | Styles and scripts work without a server; relative links resolve. | Not run |
| T13 | JavaScript fallback | Disable JavaScript, reload Home at 390px, and use navigation. | Navigation links remain visible and usable; no inactive menu button is shown. | Not run |
| T14 | Project filtering | Once implemented, activate each filter and All using mouse and keyboard. | Only matching projects appear; All restores every project; selection is accessible. | Not run; Projects page pending |
| T15 | Visual contact form | Scroll to Contact. Inspect its text and try empty fields, an invalid email, and valid sample values. Press Enter in each input and attempt to activate Send. Repeat without JavaScript and inspect the network panel. | No visible demo or disabled-send notices; button reads Send message and stays disabled; no validation, submission, navigation, or sent-message confirmation occurs. Enter in the message field adds a line break. | Not run |
| T16 | Zoom and reduced motion | On each page, use 200% browser zoom and enable reduced motion in the OS. | Content stays readable and reachable; nonessential motion is disabled. | Not run |
| T17 | Current section | Scroll from Home through My studies, Skills, and Contact, then back up; resize and open direct hash links. | Exactly one navigation link identifies the current section using aria-current=location, and its highlight follows the viewed section. | Not run |
| T18 | Scroll reveals | At phone and laptop widths, reload at the top and slowly scroll through My studies, Skills, and Contact. Scroll back up and down. Also load a direct #contact link. | Off-screen content fades and rises gently as it enters view; cards have a subtle stagger; revealed content stays visible; direct-link content is readable. | Not run |
| T19 | Animation fallbacks | Reload with reduced motion enabled, then with JavaScript disabled. Also enable reduced motion while unrevealed content remains below the viewport. | All content stays visible with no reveal motion; changing the preference reveals all remaining content. | Not run |
| T20 | Keyboard during reveals | Reload at the top with motion enabled; use Tab to reach the contact fields before manually scrolling there. | Focused content becomes visible immediately with a visible focus outline; no waiting for an animation. | Not run |
