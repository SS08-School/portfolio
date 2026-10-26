# Website test plan

The current revision has Home with My studies, Skills, and email Contact
sections, plus separate About me and Projects pages. Former Skills and Contact
URLs redirect to their Home sections. Project details, filtering, and richer
personal background are planned for later tasks.
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

Repeating-effect local checks on 2026-10-22: syntax and simulated interaction
checks passed for three reveal/reset cycles, keeping items above the viewport
revealed, preserving focused content, clearing effects on reduced-motion
changes, and reduced-motion/missing-observer fallbacks. These are simulated
checks; visual phone/laptop scrolling and actual keyboard behavior remain
Not run. At the time of these local checks, this revision had not been deployed.

Repeating-effect deployment check on 2026-10-22: GitHub Pages deployment
succeeded for commit `3fc6694`. The live script returned HTTP 200 and contains
the reset logic, continued observation of revealed items, and focused-content
guard. Deployment/source checks passed; visual and keyboard checks in a browser
remain Not run.

Grouped-dropdown local checks on 2026-10-22: syntax and static checks passed
for the three-line button, labeled Home page group, four valid section links,
and JavaScript-disabled navigation markup. Simulated interaction checks passed
for toggling, Escape with focus return, link selection, outside clicks, focus
leaving the menu, focus staying within the menu, and current-section labeling.
These used mocked elements; actual browser layout, native Tab/Enter/Space
behavior, and phone/laptop presentation remain Not run. This revision has not
been deployed.

About/Projects/email local checks on 2026-10-22: static checks passed across
Home, About, Projects, and both redirect files for 39 local references, one
`h1` per file, unique IDs, valid ARIA references, and matching page/section
targets. Verified three navigation groups and the correct current page on each
content page, the supplied NJIT education, the exact email `mailto:` target,
the truthful Projects empty state, and removal of the inactive form. JavaScript
syntax and simulated startup with Education-only or no local section links
passed. Actual browser layout, keyboard operation, email-app activation, and
Lighthouse remain Not run. At the time of these local checks, the changes had
not been deployed.

About/Projects/email deployment checks on 2026-10-22: GitHub Pages deployment
succeeded for commit `c89964d`. Home, About, Projects, the shared stylesheet,
and the script returned HTTP 200. Published HTML contains all three navigation
groups on every content page, the supplied NJIT/Electrical Engineering
education on About, the truthful Projects empty state, and the approved
`mailto:ss5764@njit.edu` contact link on Home. Deployment/source checks passed;
actual browser presentation, keyboard operation, and email-app activation
remain Not run.

Background-detail local checks on 2026-10-22: calculated contrast for dark plum,
muted plum, and purple text on the new peach and mint surfaces ranges from
5.27:1 to 11.97:1, exceeding 4.5:1. The diff has no whitespace errors. No
connected browser was available; visual layering, phone/laptop layout, and
interaction checks remain Not run. At the time of these checks, the styling
revision had not been deployed.

Background-detail deployment check on 2026-10-22: GitHub Pages deployment
succeeded for commit `52951fa`. The live stylesheet returned HTTP 200 with
the peach/mint accents, dot texture, and decorative halo. Deployment/source
checks passed; actual visual layout and interaction checks remain Not run.

Theme/page-motion local checks on 2026-10-22: script syntax and simulated
lifecycle checks passed for light by default, explicit preference persistence
across pages, restoring saved light/dark, browser-Back restoration, cross-tab
storage updates, invalid/cleared preferences, and blocked storage. Simulated
checks also passed for replaying page entry on cached-page restoration,
canceling entry for focused controls, and skipping replay for reduced motion.
All page links, early-theme script ordering, and stylesheet/script version
hashes passed static checks. Calculated text contrast on the selected primary
surfaces is at least 5.15:1 in light and 6.48:1 in dark; button contrast is
6.26:1 and 7.91:1 respectively. These are not full Lighthouse audits.
No connected browser was available; actual visual motion, compact header
layout, keyboard interaction, and cross-page flash checks remain Not run.
At the time of these local checks, this revision had not been deployed.

Theme/page-motion deployment checks on 2026-10-22: GitHub Pages deployment
succeeded for commit `ac3018c`. Home, About, and Projects returned HTTP 200
and include the icon toggle, early theme restoration before the stylesheet,
and page-entry markup. All three versioned assets (stylesheet, main script,
and theme script) returned HTTP 200. Deployment/source checks passed; browser
interaction and visual animation checks remain Not run.

Navigation/theme-refinement local checks on 2026-10-22: syntax and static
checks passed for exactly one current-page link on each content page, no
current-section selection, each group's first link targeting `#top`, and all
44 local references and asset versions resolving. Simulated click checks
passed for scrolling a current-page top link to position 0 without preventing
native navigation, while leaving modified clicks and section links untouched.
The palette values are unchanged; color transitions now use 280ms with no
stagger on card colors and remain inside the reduced-motion media query.
Browser scrolling, actual transition appearance, and keyboard checks remain
Not run. At the time of these local checks, this revision had not been deployed.

Navigation/theme-refinement deployment checks on 2026-10-22: GitHub Pages
deployment succeeded for commit `fdd0730`. Home, About, and Projects returned
HTTP 200 with the document-top anchor, exactly one current-page indicator,
no current-section indicator, and the expected asset versions. The versioned
stylesheet and main script returned HTTP 200 with the 280ms palette transitions
and page-top click logic. These publication/source checks passed; actual
browser scrolling, keyboard behavior, and visual transitions remain Not run.

Greeting copy check on 2026-10-22: the local Home greeting now reads
"Hi, I'm Sebastian." Source diff and whitespace checks passed. Browser layout
checks remain Not run. At the time of this check, the text change had not
been deployed.

Header-name local checks on 2026-10-22: source checks passed for the same
text-only full-name Home link on all three content pages, with no initials
badge or decorative period. Links retain accessible names and keyboard focus
styles. The stylesheet version was refreshed on all five HTML files. No
connected browser is available; phone/laptop appearance, keyboard interaction,
and direct-file browser checks remain Not run.

Greeting/header deployment checks on 2026-10-22: GitHub Pages deployment
succeeded for commit `2ce6cf5`. All three content pages returned HTTP 200 with
the text-only full-name header and new stylesheet version. Home contains
"Hi, I'm Sebastian." The published stylesheet returned HTTP 200 with the
updated name typography and no initials-badge styles. Publication/source checks
passed; visual and keyboard browser checks remain Not run.

Keyboard-scrolling local checks on 2026-10-26: full-script syntax and 42
simulated key cases passed for Up/Down direction, held-key repeats, native
modified-key and composition behavior, editable/arrow-operated controls,
nested scrolling regions, and leaving Tab/Enter/Escape/Space/PageUp/PageDown/
Home/End untouched. These mocked checks do not verify actual browser input.
Script references were refreshed on all three content pages. Computer Use
ended during the previous attempt because it could not reliably determine
Chrome's URL. Actual phone/laptop keyboard checks, direct-file operation,
console checks, and Lighthouse remain Not run.

Keyboard-scrolling deployment checks on 2026-10-26: GitHub Pages deployment
succeeded for commit `7665019`. Home, About, and Projects returned HTTP 200
with the updated main-script version. That script returned HTTP 200 and
contains arrow scrolling and native-key guards. These publication/source
checks passed; actual browser keyboard checks remain Not run.

Custom keyboard-navigation checks on 2026-10-26: the first simulated smooth
scroll test failed because rounding to whole pixels could leave an animation
running two pixels short of its destination. A minimum one-pixel step fixed
that issue; the corrected test reaches the destination and stops. Retesting
passed 34 simulated assertions for forward/reverse Tab wrapping, excluding
hidden/disabled/inert controls, continuing from section destinations, opening
the menu at its first link, Escape focus return and cycle release, the footer
toggle, modified-key passthrough, smooth first frames, held-key accumulation,
direction changes, scroll limits, cancellation without refocusing, nested
scroll regions, and reduced motion. Static checks also passed for unique IDs,
ARIA targets, the footer control on each page, and all 44 local references and
asset versions. These mocked/static checks are not browser tests.
Browser verification remains limited by the previously recorded Chrome URL
access failure. Phone/laptop layout, real keyboard input, direct-file browser
operation, console checks, and Lighthouse remain Not run. This revision is local.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T1 | Page and section navigation | On Home, About, and Projects, activate the brand and every dropdown link using clicks and Tab/Enter. | First links load the correct page at the document top; section links reach their actual sections; only the current page is selected. | Not run |
| T2 | Former page URLs | Open skills.html and contact.html directly and from a local file. Disable automatic redirects and test fallback links. | Each URL leads to the corresponding main-page section; fallback links work without JavaScript. | Not run |
| T3 | Phone layouts | View every implemented page at widths of 320px and 390px; scroll top to bottom. | No sideways scrolling, clipped text, or overlapping content. | Not run |
| T4 | Laptop layouts | View every implemented page at 1366px wide; scroll top to bottom. | Content and navigation are readable and aligned. | Not run |
| T5 | Grouped dropdown toggle | On all three pages at 390px and 1366px wide, activate the three-line button twice. | Dropdown opens/closes; aria-expanded matches; Home's four sections are grouped together; About and Projects have separate groups; Education belongs to About. | Not run |
| T6 | Dropdown keyboard | Tab to the button, open with Enter or Space, then Tab through the links. Close with Escape, then reopen and Tab out. | Keyboard opening focuses the first link; Escape closes and returns focus to the button; Tab can leave the menu; closed links are skipped. | Not run |
| T7 | Dropdown resize | Open and close the dropdown at 320px, 390px, and 1366px wide; resize while a link has focus. | Three-line button appears at all widths; menu fits without sideways scrolling; focused links stay available while resizing. | Not run |
| T8 | Keyboard on every page | On each page, use Tab, Shift+Tab, and Enter through every interactive element, then press Escape with the menu closed and Tab out. | Logical focus order, visible focus, working controls, wrapping within the page, and an Escape exit to native navigation. | Not run |
| T9 | Skip link | Reload each page, press Tab, then Enter. | Skip link appears and moves focus to main content. | Not run |
| T10 | Accessibility audit | Run Chrome DevTools Lighthouse Accessibility on every page. Record each score. | Each page scores at least 90; resolve reported issues. | Not run |
| T11 | Assets and console | Load each page and inspect the console and network panel; inspect image descriptions. | No script errors or missing assets; images have appropriate alt attributes. | Not run |
| T12 | Direct-file operation | Double-click index.html; use its links and mobile menu. Repeat for other pages as added. | Styles and scripts work without a server; relative links resolve. | Not run |
| T13 | JavaScript fallback | Disable JavaScript, reload Home at 390px, and use navigation. | Navigation links remain visible and usable; inactive menu/theme buttons are hidden; the site uses light mode and content stays visible. | Not run |
| T14 | Project filtering | Once real projects and filtering are added, activate each filter and All using mouse and keyboard. | Only matching projects appear; All restores every project; selection is accessible. | Not run; project details and filtering pending |
| T15 | Email contact | Reach Home's Contact section from each page, inspect and copy the address, and activate it by click and Enter. Repeat without JavaScript. | Displayed address is ss5764@njit.edu; mailto target matches; the configured email app opens without sending automatically; no form remains. | Not run |
| T16 | Zoom and reduced motion | On each page, use 200% browser zoom and enable reduced motion in the OS. | Content stays readable and reachable; nonessential motion is disabled. | Not run |
| T17 | Current page only | On each page, scroll through its sections and inspect the dropdown repeatedly; also use direct section links. | Exactly one primary page link has aria-current=page; its highlight stays unchanged while scrolling; section links have no persistent selection. | Not run |
| T18 | Repeating scroll reveals | At phone and laptop widths, scroll down through My studies, Skills, and Contact. Scroll up until each item leaves the bottom of the screen, then down again. Repeat three times and try a direct #contact link. | Items fade and rise into view each time; scrolling up resets items below view; items above the viewport stay revealed; direct-link content is readable. | Not run |
| T19 | Animation fallbacks | Reload with reduced motion enabled, then with JavaScript disabled. Also enable reduced motion while unrevealed content remains below the viewport. | All content stays visible with no reveal motion; changing the preference reveals all remaining content. | Not run |
| T20 | Keyboard during reveals | Reload Home at the top with motion enabled; use Tab to reach the email link before manually scrolling there. | Focused content becomes visible immediately with a visible focus outline; no waiting for an animation. | Not run |
| T21 | Dropdown dismissal and links | On each content page, open the dropdown, click outside it, reopen, and activate each page and section link. | Outside click closes it; each link closes it and reaches the matching page or section; focus is not left in hidden content. | Not run |
| T22 | About and project content | Open About and Projects at phone and laptop widths. | About shows NJIT enrollment and Electrical Engineering; no invented background; Projects truthfully has no published items and no dummy cards or broken links. | Not run |
| T23 | Anchor destination outlines | From About and Projects, activate Home using the brand and dropdown. Also visit Home's section links and the skip link, then Tab to links and buttons. | No large outline appears around the main content or section containers; destinations still receive focus and scroll correctly; keyboard focus remains visible on interactive controls. | Not run |
| T24 | Background decoration and solid cards | View all pages at 320px, 390px, and 1366px in both themes. Compare cards, scroll, and use navigation and email links. | Main cards are uniformly solid white in light mode and dark plum in dark mode; decorative color stays in the background; text is readable; no new sideways scrolling or blocked interactions. | Not run |
| T25 | Stylesheet cache refresh | With an older version cached, open the updated site and visit all pages. Inspect each stylesheet and script request. | Every page requests the correct new versioned assets; main cards have a uniform solid surface for the selected theme; old alternating peach/mint card rules are absent. | Not run |
| T26 | Default theme | Clear the site's stored theme, set the OS to dark mode, and open each page. | Pages default to light; sun icon is visible and the Dark mode toggle reports aria-pressed=false. | Not run |
| T27 | Saved preference | Toggle dark with a click or Enter/Space, navigate through all pages, reload, and revisit in a new tab. Repeat after choosing light. | Choice and icon remain consistent across pages and visits; cards use a uniform solid surface in each theme; saved dark mode has no light flash. | Not run |
| T28 | Theme fallbacks and sync | Block site storage and try toggling; then restore storage and change the theme in another tab. Clear the stored preference and return with Back. | Blocked storage causes no errors; the current page still switches. Same-site tabs and restored pages reflect the saved choice; clearing it returns light mode. | Not run |
| T29 | Page, icon, and theme motion | Switch themes and navigate among Home, About, and Projects, including browser Back. Repeat with reduced motion. | Palette changes ease over about 280ms with synchronized card colors; sun/moon rotate and fade; page content appears gently. Saved-theme loads have no palette fade or light flash. Reduced motion skips effects; focused controls stay visible. | Not run |
| T30 | Dark theme and compact header | At 320px, 390px, and 1366px wide, inspect all pages in both modes and use both header buttons. | Text, diagram, cards, focus indicators, and dropdown are readable; both controls fit and work without overlap or sideways scrolling. | Not run |
| T31 | Page overview starts at top | Visit each page, scroll down, navigate elsewhere, and select its first dropdown link again. Also select the current page's first link and use Ctrl/Cmd-click and browser Back. | First links reach scroll position 0 and show the header; section links still reach sections; modified clicks retain native behavior; Back is not globally forced to the top. | Not run |
| T32 | Arrow scrolling on every page | At phone and laptop widths, focus the page, brand, theme button, menu button, and ordinary links. Press and hold Up/Down after following links and returning with Back. | Page scrolls in the requested direction while it has room; focus stays on the control; held keys repeat without animation buildup. | Not run |
| T33 | Native keyboard behavior and focus exit | On every page, press Escape with the menu closed, then Tab/Shift+Tab out to browser controls. Open a tall dropdown and use arrows within it. Test Enter, Space, PageUp/PageDown, Home/End, and modified shortcuts. | Escape releases custom cycling; nested regions scroll natively; focus can leave and return without automatic refocusing; browser shortcuts remain available. | Not run |
| T34 | Custom Tab order and toggle | At phone and laptop widths on each page, Tab beyond the final control, Shift+Tab before the first, use the skip link and section links, and toggle Keep Tab on this page off/on. | Cycling wraps in page order, follows section destinations, and skips hidden or disabled controls. The footer toggle reports its pressed state and restores native/cycling navigation. | Not run |
| T35 | Smooth arrow scrolling | At phone and laptop widths, press and hold Down/Up, reverse direction, reach the top/bottom, and interrupt with Tab, mouse wheel, touch, or a click. Repeat with reduced motion. | Scrolling eases smoothly and responds promptly to direction changes; no animation remains at boundaries; other input takes over immediately; reduced motion scrolls without animation. | Not run |
