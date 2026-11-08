# Website test plan

The current revision has five separate pages: Home (with My studies), About me
(with Education), Projects, Skills, and Contact. Skills and Contact now contain
their own content and no longer redirect to Home. Project details, filtering,
and richer personal background are planned for later tasks.
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
operation, console checks, and Lighthouse remain Not run. At the time of these
checks, this revision was local.

Custom keyboard-navigation deployment checks on 2026-10-26: GitHub Pages
deployment succeeded for commit `cee3baf`. Home, About, and Projects returned
HTTP 200 with the footer keyboard toggle, Escape instructions, and new asset
versions. The versioned script and stylesheet returned HTTP 200 with custom
Tab cycling, smooth arrow scrolling, Escape release, and keyboard-control
styles. These publication/source checks passed; actual browser keyboard and
visual checks remain Not run.

Saved keyboard-preference local checks on 2026-10-26: full-script syntax and
19 simulated preference/lifecycle assertions passed for on by default,
restoring saved on/off, button and Escape persistence, cross-page restoration,
cross-tab updates, browser-Back restoration, cleared/invalid values, unrelated
storage events, and blocked-storage fallback. The footer button is now compact
and last in its footer, with instructions revealed on focus. These are source
and mocked checks; actual phone/laptop appearance, focus behavior, direct-file
storage behavior, console checks, and Lighthouse remain Not run. Browser
verification remains limited by the previously recorded Chrome URL access
failure. At the time of these checks, this revision had not been deployed.

Saved keyboard-preference deployment checks on 2026-10-26: GitHub Pages
deployment succeeded for commit `a7c7b70`. All three content pages returned
HTTP 200 with the default-on button last in the footer and updated asset
versions. The versioned script and stylesheet returned HTTP 200 with preference
storage, the compact button styles, and focus-visible instructions. These
publication/source checks passed; real browser storage, appearance, and keyboard
interaction checks remain Not run.

Five-page revision local checks on 2026-10-26: static checks passed across
Home, About me, Projects, Skills, and Contact for all 25 primary page-link
destinations, two subordinate section links per page, exactly one current-page
indicator, one h1 and logical heading order per page, unique IDs, ARIA targets,
shared controls, theme-script ordering, and all 62 local references and asset
versions. The Skills and Contact text matches the previous Home sections;
Home no longer contains those sections. Neither new page redirects. Shared
JavaScript syntax checks passed; the interaction scripts are unchanged.
These are source checks, not browser interaction tests. Phone/laptop layout,
keyboard navigation, direct-file browser behavior, console checks, and
Lighthouse remain Not run; browser verification is limited by the previously
recorded Chrome URL access failure. At the time of these checks, this revision
had not been deployed.

Five-page deployment checks on 2026-10-26: GitHub Pages deployment succeeded
for commit `a404b24`. Home, About me, Projects, Skills, and Contact each returned
HTTP 200 with five primary navigation links, one current-page indicator, one
h1, and the expected shared asset versions. Skills and Contact no longer
redirect; Skills contains all four cards and Contact contains the approved
email link. Home no longer contains Skills/Contact sections. All three
versioned shared assets returned HTTP 200. These publication/source checks
passed; actual browser navigation, keyboard, and visual checks remain Not run.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T1 | Page and section navigation | On each of Home, About, Projects, Skills, and Contact, activate the brand and every dropdown link using clicks and Tab/Enter. | Primary links load the correct page at the document top; My studies belongs to Home and Education to About; only the current page is selected. | Not run |
| T2 | Standalone Skills and Contact | Open skills.html and contact.html directly and from local files, with JavaScript enabled and disabled. | Each URL displays its own complete page and unique heading; neither redirects to Home. | Not run |
| T3 | Phone layouts | View every implemented page at widths of 320px and 390px; scroll top to bottom. | No sideways scrolling, clipped text, or overlapping content. | Not run |
| T4 | Laptop layouts | View every implemented page at 1366px wide; scroll top to bottom. | Content and navigation are readable and aligned. | Not run |
| T5 | Grouped dropdown toggle | On all five pages at 390px and 1366px wide, activate the three-line button twice. | Dropdown opens/closes; aria-expanded matches; all five pages have their own groups; My studies belongs to Home and Education to About. | Not run |
| T6 | Dropdown keyboard | Tab to the button, open with Enter or Space, then Tab through the links. Close with Escape, then reopen and Tab out. | Keyboard opening focuses the first link; Escape closes and returns focus to the button; Tab can leave the menu; closed links are skipped. | Not run |
| T7 | Dropdown resize | Open and close the dropdown at 320px, 390px, and 1366px wide; resize while a link has focus. | Three-line button appears at all widths; menu fits without sideways scrolling; focused links stay available while resizing. | Not run |
| T8 | Keyboard on every page | On each page, use Tab, Shift+Tab, and Enter through every interactive element, then press Escape with the menu closed and Tab out. | Logical focus order, visible focus, working controls, wrapping within the page, and an Escape exit to native navigation. | Not run |
| T9 | Skip link | Reload each page, press Tab, then Enter. | Skip link appears and moves focus to main content. | Not run |
| T10 | Accessibility audit | Run Chrome DevTools Lighthouse Accessibility on every page. Record each score. | Each page scores at least 90; resolve reported issues. | Not run |
| T11 | Assets and console | Load each page and inspect the console and network panel; inspect image descriptions. | No script errors or missing assets; images have appropriate alt attributes. | Not run |
| T12 | Direct-file operation | Double-click index.html; use its links and mobile menu. Repeat for other pages as added. | Styles and scripts work without a server; relative links resolve. | Not run |
| T13 | JavaScript fallback | Disable JavaScript, reload each page at 390px, and use navigation. | Navigation links remain visible and usable; inactive menu/theme/keyboard buttons are hidden; the site uses light mode and content stays visible. | Not run |
| T14 | Project filtering | Activate All projects, Games, Math, and Simulations, then return to All; repeat with Tab/Enter. | Collection shows 4, 1, 2, 1, and 4 cards respectively; exactly one filter reports pressed; all four labs remain below the collection. | Pass for local scripted browser clicks at 320px, 390px, laptop, and reduced motion on 2026-10-26; physical keyboard/live checks Not run |
| T15 | Email contact | Reach the Contact page from each page, inspect and copy the address, and activate it by click and Enter. Repeat without JavaScript. | Displayed address is ss5764@njit.edu; mailto target matches; the configured email app opens without sending automatically; no form remains. | Not run |
| T16 | Zoom and reduced motion | On each page, use 200% browser zoom and enable reduced motion in the OS. | Content stays readable and reachable; nonessential motion is disabled. | Not run |
| T17 | Current page only | On each page, scroll through its sections and inspect the dropdown repeatedly; also use direct section links. | Exactly one primary page link has aria-current=page; its highlight stays unchanged while scrolling; section links have no persistent selection. | Not run |
| T18 | Repeating scroll reveals | At phone and laptop widths, scroll through Home's My studies section, the Skills page, and the Contact page. Scroll up until each item leaves the bottom of the screen, then down again. Repeat three times and open contact.html#contact directly. | Off-screen items fade and rise into view each time; scrolling up resets items below view; items above the viewport stay revealed; direct-link content is readable. | Not run |
| T19 | Animation fallbacks | Reload with reduced motion enabled, then with JavaScript disabled. Also enable reduced motion while unrevealed content remains below the viewport. | All content stays visible with no reveal motion; changing the preference reveals all remaining content. | Not run |
| T20 | Keyboard during reveals | Reload Contact at the top with motion enabled; use Tab to reach the email link before manually scrolling there, using a short viewport if necessary. | Focused content becomes visible immediately with a visible focus outline; no waiting for an animation. | Not run |
| T21 | Dropdown dismissal and links | On each content page, open the dropdown, click outside it, reopen, and activate each page and section link. | Outside click closes it; each link closes it and reaches the matching page or section; focus is not left in hidden content. | Not run |
| T22 | About and project content | Open About and Projects at phone and laptop widths. | About shows the existing owner content; Projects describes the four real Assignment 1 mini projects and distinguishes original Python work from browser adaptations. | Projects content and screenshots checked locally on 2026-10-26; About/live checks Not run |
| T23 | Anchor destination outlines | From About, Projects, Skills, and Contact, activate Home using the brand and dropdown. Also visit My studies, Education, and each page's skip link, then Tab to links and buttons. | No large outline appears around the main content or section containers; destinations still receive focus and scroll correctly; keyboard focus remains visible on interactive controls. | Not run |
| T24 | Background decoration and solid cards | View all pages at 320px, 390px, and 1366px in both themes. Compare cards, scroll, and use navigation and email links. | Main cards are uniformly solid white in light mode and dark plum in dark mode; decorative color stays in the background; text is readable; no new sideways scrolling or blocked interactions. | Not run |
| T25 | Stylesheet cache refresh | With an older version cached, open the updated site and visit all pages. Inspect each stylesheet and script request. | Every page requests the correct new versioned assets; main cards have a uniform solid surface for the selected theme; old alternating peach/mint card rules are absent. | Not run |
| T26 | Default theme | Clear the site's stored theme, set the OS to dark mode, and open each page. | Pages default to light; sun icon is visible and the Dark mode toggle reports aria-pressed=false. | Not run |
| T27 | Saved preference | Toggle dark with a click or Enter/Space, navigate through all pages, reload, and revisit in a new tab. Repeat after choosing light. | Choice and icon remain consistent across pages and visits; cards use a uniform solid surface in each theme; saved dark mode has no light flash. | Not run |
| T28 | Theme fallbacks and sync | Block site storage and try toggling; then restore storage and change the theme in another tab. Clear the stored preference and return with Back. | Blocked storage causes no errors; the current page still switches. Same-site tabs and restored pages reflect the saved choice; clearing it returns light mode. | Not run |
| T29 | Page, icon, and theme motion | Switch themes and navigate among all five pages, including browser Back. Repeat with reduced motion. | Palette changes ease over about 280ms with synchronized card colors; sun/moon rotate and fade; page content appears gently. Saved-theme loads have no palette fade or light flash. Reduced motion skips effects; focused controls stay visible. | Not run |
| T30 | Dark theme and compact header | At 320px, 390px, and 1366px wide, inspect all pages in both modes and use both header buttons. | Text, diagram, cards, focus indicators, and dropdown are readable; both controls fit and work without overlap or sideways scrolling. | Not run |
| T31 | Page overview starts at top | Visit each page, scroll down, navigate elsewhere, and select its first dropdown link again. Also select the current page's first link and use Ctrl/Cmd-click and browser Back. | First links reach scroll position 0 and show the header; section links still reach sections; modified clicks retain native behavior; Back is not globally forced to the top. | Not run |
| T32 | Arrow scrolling on every page | At phone and laptop widths, focus the page, brand, theme button, menu button, and ordinary links. Press and hold Up/Down after following links and returning with Back. | Page scrolls in the requested direction while it has room; focus stays on the control; held keys repeat without animation buildup. | Not run |
| T33 | Native keyboard behavior and focus exit | On every page, press Escape with the menu closed, then Tab/Shift+Tab out to browser controls. Open a tall dropdown and use arrows within it. Test Enter, Space, PageUp/PageDown, Home/End, and modified shortcuts. | Escape releases custom cycling; nested regions scroll natively; focus can leave and return without automatic refocusing; browser shortcuts remain available. | Not run |
| T34 | Custom Tab order and toggle | At phone and laptop widths on each page, Tab beyond the final control, Shift+Tab before the first, use the skip link and section links, and toggle Keep Tab on this page off/on. | Cycling wraps in page order, follows section destinations, and skips hidden or disabled controls. The footer toggle reports its pressed state and restores native/cycling navigation. | Not run |
| T35 | Smooth arrow scrolling | At phone and laptop widths, press and hold Down/Up, reverse direction, reach the top/bottom, and interrupt with Tab, mouse wheel, touch, or a click. Repeat with reduced motion. | Scrolling eases smoothly and responds promptly to direction changes; no animation remains at boundaries; other input takes over immediately; reduced motion scrolls without animation. | Not run |
| T36 | Saved keyboard-navigation choice | Clear site storage and load each page. Toggle off, navigate/reload/revisit, then repeat after choosing on. Turn off with Escape. Test browser Back, another tab, and blocked storage; repeat using local files. | Defaults on; explicit on/off and Escape choices persist in the same browser wherever storage is shared; state syncs across tabs and Back. Clearing storage restores on. Blocked storage leaves the current-page toggle working. | Not run |
| T37 | Compact bottom control | At phone and laptop widths in both themes, scroll to each page's bottom and Tab to the keyboard button. | Small button sits last at the footer's bottom-right; focus ring is visible; instructions appear above it on focus and are available to screen readers. No clipping or horizontal overflow. | Not run |
| T38 | Five separate pages | Visit Home, About me, Projects, Skills, and Contact from each page's dropdown, then use browser Back. Inspect the address and content. | Five distinct HTML URLs; Skills has the four approved proficiency cards, Contact has the approved email, and neither appears as a Home section. Shared theme, keyboard preference, page entry, and current-page selection work on all five pages. | Not run |

## Assignment 1 playground — local checks, 2026-10-26

This task updates the existing Projects page only, apart from refreshing shared
asset URLs on other pages. The single-page migration in the current project
instructions remains separate work. Publication checks are recorded separately
from the local checks below.

The owner-supplied notebook was read as project source material. Its exercise
prompts were not treated as instructions to build additional applications.
Calculator and Shopping Cart are documented; only the requested game and
Fibonacci project received browser adaptations.

Actual local Chrome browser checks used scripted DOM clicks, input, focus,
and keyboard events. Phone tests used 320px and 390px frames because this
Chrome build enforces a minimum top-level headless window width. The laptop
test used a 1366px window with a 1348px content viewport after the scrollbar.
Final retesting passed all 45 assertions in each of the four configurations.
These do not establish physical keyboard behavior or a Lighthouse score.

Retained failures and corrections:

- **Fail, initial run:** disabling the chosen game button caused focus to move
  to the document body. The agent's original implementation checked for focus
  inside the move controls after disabling them, so its focus transfer never
  ran. The fix records focus before disabling and moves to Next round after
  the reveal, provided the visitor has not moved to another control. **Pass on
  retest** in all four configurations.
- **Fail, phone layout runs:** the rotated decorative orbit extended beyond
  the viewport, including after generating 100 Fibonacci terms. The fix leaves
  extra space around the hero artwork. **Pass on retest:** no document overflow
  at 320px or 390px, including 100-term values and reduced motion.
- **Source review finding:** the existing custom Tab selector omitted native
  `summary` elements. Adding them preserves access to the new assignment notes.
  Scripted forward/reverse focus checks were added for this correction.
- Initial top-level anchored screenshots were blank because of headless
  rendering/scroll timing. The final section captures use fixed-size frames,
  instant positioning, and no entry animation in a temporary screenshot
  harness. No screenshot-only script is shipped with the site.

Final detailed browser evidence is retained in
`screenshots/projects-browser-checks.json`, including the original focus and
overflow failures. The screenshots below were opened and visually inspected:

- `screenshots/projects-laptop.png` — Projects introduction and collection.
- `screenshots/projects-arena-laptop.png` — game arena at laptop width.
- `screenshots/projects-fibonacci-laptop.png` — explorer at laptop width.
- `screenshots/projects-phone.png` — game at an actual 390px frame width,
  cropped to that frame without scaling.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T39 | Notebook accuracy | Compare all four cards and logic notes with the supplied notebook. | Descriptions match the actual Python work; browser additions are identified. | Pass — source review, 2026-10-26 |
| T40 | Winner rules | Evaluate all nine combinations of Rock, Paper, and Scissors. | Three ties and the correct winner in each other combination. | Pass — local Chrome in all four configurations |
| T41 | Private pass-and-play | Select 2 players; choose Player 1's move; inspect handoff; continue as Player 2. | Choice controls disappear, handoff receives focus, and the first choice stays concealed until Player 2 chooses. | Pass — local Chrome in all four configurations |
| T42 | Scoring and match end | Play a win, a tie, and a loss; reset; win five rounds; select Play again. | Ties have their own count; first to five ends the match; replay clears scores and round history. | Pass — local Chrome in all four configurations |
| T43 | Race and reset | Click a second move during a reveal; reset during a pending reveal; switch modes. | A round resolves only once; no old timer overwrites the fresh match. | Pass — local Chrome in all four configurations |
| T44 | Computer strategies | Play a round with Adaptive AI and Random picks; review the move commitment. | Both resolve a valid move; the computer commits before the current choice and uses previous moves only. | Pass — Chrome rounds plus source review |
| T45 | Exact Fibonacci values | Generate 1, 2, 12, and 100 terms. | Values begin 0, 1; term 12 is 89; term 100 is exactly 218922995834555169026; ratios with a zero denominator are undefined. | Pass — local Chrome in all four configurations |
| T46 | Invalid Fibonacci input | Submit empty input, 0, -1, 1.5, 101, and nonnumeric text; then submit a valid count. | Error appears, focus returns to the field, the previous sequence remains; valid generation clears the error. | Pass — local Chrome in all four configurations |
| T47 | Inspect and step | Select term 5; use previous and next; move the range control to 8. | Term 5 shows 1 + 2 = 3; stepping updates selection; the slider synchronizes the input and sequence. | Pass — local Chrome in all four configurations |
| T48 | Playback | Replay, pause after advancement, wait, then generate three terms and replay to completion. | One term advances at a time; pause holds the term; playback stops at the end. | Pass — local Chrome in all four configurations |
| T49 | Phone overflow and reduced motion | Load at 320px and 390px, generate 100 terms, and repeat at 320px with reduced motion. | No horizontal document overflow, exact long values wrap, and CSS motion is skipped for reduced motion. | Pass — browser geometry checks; light-mode 390px game screenshot inspected |
| T50 | Local references and assets | Check every href/src on all five pages, including anchor IDs and file existence. | Local references resolve, images have alt attributes, shared versions match, and illustrations are below 500 KB. | Pass — 80 local references, static checks, browser image loading |
| T51 | Text contrast | Calculate ratios for actual light/dark primary text, secondary text, buttons, links, and arena labels. | Normal text ratios are at least 4.5:1. | Pass — checked pairs range from 5.42:1 to 14.21:1; not a Lighthouse audit |
| T52 | Focus and disclosures | Use scripted Tab/Shift+Tab from the Fibonacci card link; open assignment notes; play a round; dismiss navigation with Escape. | Native summaries participate in custom Tab order, notes expand, Next round receives focus, and Escape closes the menu. | Pass — local scripted Chrome checks; physical Tab/Enter testing Not run |
| T53 | Other-page shared-script regression | Load local copies of Home, About, Skills, and Contact with error instrumentation. | Menu/theme initialize, each page retains one h1, and no browser runtime errors occur. | Pass — actual headless Chrome on all four pages |
| T54 | Published playground verification | After owner review and approved deployment, run the full test plan on GitHub Pages, including links, phone/laptop layouts, keyboard, and Lighthouse. | Published demos match the local build; all pages score at least 90 for Accessibility. | Full live plan Not run. Earlier two-demo commit aec96c0 deployed successfully on 2026-10-26; all five pages and 14 unique published references returned HTTP 200 with expected asset versions. Physical keyboard, visual interaction, and Lighthouse audits remain pending. |

The earlier full-site Not run entries remain pending wherever this focused
task did not exercise them. Visible-window Chrome access timed out; native
physical keyboard checks and Lighthouse still need to be performed before
submission. The headless checks recorded no page runtime errors. Chrome's
first sandboxed launch failed to initialize its GPU; the same installed
browser succeeded when run through the approved sandbox escalation.

## All four projects functional — local follow-up, 2026-10-26

The owner requested that every project function on the website. Calculator
and Shopping Cart were previously notes only; this revision adds working
browser demos, direct links from all four cards, and category filters. The
notebook is now named `Assignment_1_Sebastian_Szeliga.ipynb`; its calculator
logic, grocery names, prices, and starting inventory were read again before
implementation. The existing Rock Paper Scissors and Fibonacci code is
unchanged and was included in regression checks.

All **80 scripted assertions passed** in each configuration: actual 320px and
390px viewport frames, a 1366px laptop window (1348px content area), and a 320px
frame with reduced motion. These tests ran against local files in installed
Chrome, using programmatic clicks, submissions, focus, and keyboard events.
No page runtime errors were captured. They do not replace physical Tab/Enter
testing or a Lighthouse Accessibility audit.

Detailed results are in `screenshots/all-projects-browser-checks.json`.
The new `calculator-laptop.png`, `calculator-phone.png`, `cart-laptop.png`, and
`cart-phone.png` screenshots in `screenshots/` were opened and visually checked.
The cart captures show an actual test basket with one of each grocery, totaling
$12.97; they are not purchase records. Phone captures are cropped to the 390px
frame without scaling. Temporary test/renderer pages are not site content.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T55 | Four working project destinations | Open Projects locally and activate each card link; inspect target IDs and initialized controls. | Every card reaches its own working lab; no project is notes-only. | Pass — all four configurations |
| T56 | Calculator operations | Calculate 12 + 3, 12 − 3, 12 × 3, and 12 ÷ 3; also test -7 × 3, 0 − 2, and 0.1 + 0.2. | Results are 15, 9, 36, 4, -21, -2, and 0.3. | Pass — all four configurations |
| T57 | Calculator precision and limits | Calculate 1 ÷ 3 and 1e20 × 10; try 1e308 × 1e308. | Display rounds to 12 significant digits; large finite values use scientific notation; overflowing results produce an error and retain the last result. | Pass — all four configurations |
| T58 | Invalid calculator inputs | Submit empty first/second fields, nonnumeric/nonfinite input, and division by both 0 and -0; then calculate valid input. | Errors appear without adding history or replacing the prior answer; valid input clears errors. | Pass — all four configurations |
| T59 | Calculator history and reset | Make more than five successful calculations; use Reset example. | Only five results remain; reset restores 12 + 3 = 15, Add selection, and the history empty state. | Pass — all four configurations |
| T60 | Cart quantity validation | Submit empty, zero, negative, fractional, nonnumeric, nonfinite, and over-stock quantities. | A labeled field error appears and the basket, total, and inventory remain unchanged. | Pass — all four configurations |
| T61 | Cart add and stock | Add Frosted Flakes one at a time until both boxes are in the basket. | Total progresses from $2.99 to $5.98; stock reduces from 2 to 0; the shelf input/Add button and basket plus button disable at the cap. | Pass — all four configurations |
| T62 | Cart plus/minus and removal | Use minus, plus, Remove, and minus on a final unit. | Stock returns/removes correctly, a zero-quantity line disappears, and focus moves to a surviving control. | Pass — all four configurations |
| T63 | Exact cart totals and clear | Add all 2 cereal boxes, 3 eggs, and 4 loaves; remove all eggs; then Empty basket. | Total is $39.91, then $21.94, then $0.00; count is correct, all stock returns, and the empty state appears. | Pass — all four configurations |
| T64 | Repeated cart use | Add and remove one cereal box ten times. | Stock ends at 2 and total at exactly $0.00, without drift. | Pass — all four configurations |
| T65 | All-project regression | Play both computer strategies, private two-player rounds, a tie, a first-to-five match, replay/reset; generate, inspect, validate, step, and play Fibonacci. | Existing demos retain their expected behavior, including exact term 100 and pause/completion behavior. | Pass — all four configurations |
| T66 | New form focus, labels, layout | Focus a calculator input and dispatch Tab; exhaust shelf stock, remove a line, and empty the basket; inspect new phone/laptop screenshots. | Calculator operation is reachable, labels resolve, focus stays on live controls, and layouts have no horizontal overflow. | Pass — scripted focus/geometry and screenshot inspection; physical keyboard Not run |
| T67 | Live all-project update | After review and approved deployment, verify all four demos and rerun the full live plan, including Lighthouse. | Live content matches these local tests; physical keyboard and accessibility audit pass. | Full live plan Not run — physical keyboard and Lighthouse checks remain pending; source and deployment checks are separate. |

The 45-assertion result above describes the earlier two-demo version. The
80-assertion follow-up supersedes it for the current local revision and retains
the earlier failures and corrections as historical evidence.

## Project heading copy cleanup — 2026-10-26

Removed the short promotional paragraphs beside all four project lab headings,
including "Three choices. One little rivalry." Useful instructions inside the
demos remain. No JavaScript or CSS changed.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T68 | Project taglines removed | Load Projects directly from a local file at 390px and 1366px; inspect lab-heading content and the game layout. | All four heading-side paragraphs are gone; four headings remain; demos initialize; no sideways scrolling or new page errors. | Pass — actual headless Chrome DOM/layout checks at both widths; screenshots visually inspected. Physical keyboard and live deployment checks Not run for this text-only revision. |

## Professional monochrome redesign — 2026-11-02

The owner requested a professional white-and-black design with formal, lighter
typography and higher-contrast graphics, followed by removal of decorative
blurbs from every page. The shared stylesheet now uses Georgia headings,
regular-weight sans-serif body text, flat white surfaces, thin neutral rules,
and squared controls. All six SVG assets are monochrome. Home and About use
the major already specified in the approved project instructions: Electrical
& Computer Engineering. Existing five-page navigation and the four demos remain.

The Design section of `AGENTS.md` records this approved direction. Its other
pre-existing owner edits were preserved. The single-page migration described
elsewhere in that file is separate from this visual/copy task.

**603 scripted assertions passed in 21 configurations:** all five pages at
320px, 390px, and 1366px in light mode; all five at 1366px in saved dark mode;
and Projects at 320px with reduced motion. The browser checks exercised actual
DOM behavior, native submit-button activation, programmatic focus, and synthetic
keyboard events in installed Chrome using local files. Physical keyboard,
screen-reader, Lighthouse, and live deployment checks were not performed.

Results, including the initial dark-fixture failures, are in
`screenshots/monochrome-browser-checks.json`. The dark fixture originally changed
the root theme after load, which interacted with saved-theme restoration and
Chrome's virtual-time color transitions. Its initial steady-state background
assertion failed. The fixture was corrected to save its isolated test-profile
preference before CSS loads, matching the site's real restoration path; all
five dark-page retests passed. This was a test setup correction, not evidence
of a live-site color failure. Final screenshots use reduced motion to avoid
headless animation/compositing artifacts.

Visual review also caught light letterboxing around inverted dark thumbnails.
The image's pre-inversion backing was corrected; the final dark Projects
capture was inspected again. Input borders were strengthened separately from
decorative rules to keep essential controls identifiable.

Actual captures in `screenshots/monochrome-*.png` cover all five pages at phone
and laptop widths, saved dark versions, and the four project panels. Phone
captures use an actual 390px frame cropped without scaling. Older screenshot
files remain historical evidence of previous revisions.

Measured color pairs include light primary text 17.93:1, light secondary text
6.84:1, hovered primary-button text 11.73:1, and input outlines 4.54:1 against
white. Dark primary text is 17.32:1, dark secondary text 8.47:1, and dark control
outlines 5.47:1. These checks cover the actual palette values, not a Lighthouse
Accessibility score. Disabled controls are visually distinguished.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T69 | All-page responsive redesign | Open every page at 320px, 390px, and 1366px; inspect the layouts and current screenshots. | White backgrounds, serif headings, square panels, no horizontal overflow, and usable controls. | Pass — local Chrome geometry/font checks and visual review |
| T70 | Navigation and focus regression | On each page open navigation, dismiss with Escape, activate the skip link, and dispatch Tab from the brand. | Correct expanded state, focus return, working skip destination, and reachable theme control; one current-page indicator. | Pass — all tested configurations; physical keyboard testing Not run |
| T71 | Typography and contrast | Read computed heading font/weight and palette values; calculate normal, secondary, primary-button, hover, and control-outline contrast. | Georgia at regular weight; text at least 4.5:1 and essential outlines at least 3:1. | Pass — all tested configurations |
| T72 | Monochrome graphics and assets | Load all six SVGs, inspect Home/Projects graphics in light and dark modes, and check alt attributes. | No pastel colors, missing images, decorative stickers, or inappropriate alt text; contrasting line work. | Pass — browser loading/alt checks plus source and visual review |
| T73 | Four-project regression | Exercise both computer strategies and pass-and-play; generate valid/invalid Fibonacci values; submit calculator operations/errors; fill, remove from, and clear the basket. | Projects initialize and retain their established rules, exact sequence values, totals, stock constraints, and focus handling. | Pass — 59 checks on Projects in five configurations |
| T74 | Site-wide blurb cleanup | Inspect Home, About, Projects, Skills, Contact, graphics, empty states, and game initialization copy. | Decorative greetings/slogans removed; factual descriptions and required instructions retained. | Pass — source, browser text checks, and visual review |
| T75 | Neutral saved dark theme | Restore dark preference before CSS loads on every page, then inspect colors and graphics. | Neutral dark surfaces, readable text, visible controls, and white line work; no pastel palette. | Pass — all five desktop pages after correcting the test fixture |
| T76 | Motion behavior | Inspect reveal logic and load Projects at 320px with reduced motion. | Observed reveal items are unobserved after first entry; reduced-motion CSS skips nonessential animation. | Pass — source review and reduced-motion browser run; physical scrolling/reentry checks Not run |
| T77 | Local references and cache refresh | Resolve every local href/src and fragment; compare stylesheet, script, and illustration versions with file hashes; open local index.html. | All 80 references resolve; assets load from relative paths and old cached colors/scripts are bypassed. | Pass — source/hash checks, direct-file browser capture, and browser image loading |
| T78 | Published redesign and accessibility audit | After owner review and approved push, run the full plan on GitHub Pages, with physical Tab/Enter, a screen reader, and Lighthouse. | Live design matches the local revision; every page scores at least 90 for Accessibility. | Full live audit Not run — physical keyboard, screen-reader, and Lighthouse checks remain pending; deployment/source verification is separate. |

The older pastel, repeating-reveal, and decorative-copy expectations above are
historical. This section describes the current approved appearance and its
verification. The full published-site submission plan remains pending.

## Sunset background and single introduction — 2026-11-02

The owner requested one personal introduction, no Home illustration, a soft
sunset-like gradient, thinner typography, and slightly more stacked content.
Home now retains the only "I'm Sebastian" paragraph. Its circuit graphic and
duplicate Education section are removed, as is the repeated About introduction.
Education facts remain at `about.html#education`. The retired My studies links
were removed from all five navigation menus.

The content width is now capped at 1060px. Home, About/Education, and Contact
use stacked introductory layouts. Palatino headings replace Georgia, body
text uses a lighter weight, and the peach/rose/cream background fades to white.
White content panels and black-and-white project graphics remain; dark mode
uses a subdued warm gradient.

**270 focused assertions passed across 17 local Chrome configurations:**
all five pages at 320px, 390px, and 1366px, plus saved dark-mode Home at 1366px
and Projects at 320px. Checks use local files, programmatic clicks/focus, native
form buttons, and synthetic keyboard events. Reduced motion was enabled for
stable captures. They do not establish physical keyboard or Lighthouse results.
All four projects were smoke-tested; their full earlier edge-case suites were
not repeated for this styling/content change.

Results are retained in `screenshots/sunset-browser-checks.json`; actual phone
and laptop screenshots are named `screenshots/sunset-*.png`. Phone images use
390px frames cropped without scaling. An initial static fragment-link checker
omitted `.html` from its current-page fallback and falsely reported same-page
anchors as missing; correcting that checker resolves all 75 local references.
There was no corresponding website-link change needed.

Using conservative component-wise bounds for the gradient gives at least
14.21:1 for primary text, 5.91:1 for secondary text, and 3.60:1 for essential
control outlines. Dark secondary text against the lightest warm background
bound is 8.02:1. Actual gradient blends stay within these bounds.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T79 | One personal introduction | Inspect all five pages and count the personal introduction; inspect Home and Education. | Exactly one "I'm Sebastian" paragraph, on Home; no Home graphic or duplicate Education section; education facts retained separately. | Pass — source count and browser checks |
| T80 | Sunset background and contrast | Inspect light and saved dark modes, CSS gradient stops, and conservative contrast bounds. | Soft warm gradient with readable dark/light text, white panels in light mode, and adequate contrast for controls. | Pass — source contrast calculations, browser checks, and visual review |
| T81 | Thin fonts and stacked layout | View every page at 320px, 390px, and 1366px; inspect computed fonts, weights, and grid columns. | Palatino headings, light body text, narrower content, vertically stacked Home/About/Contact, and no horizontal overflow. | Pass — all 15 light-mode configurations |
| T82 | Navigation after removing My studies | Open and close every menu, dispatch Tab, and check all local file/fragment targets. | Five page links remain, Education still resolves, no retired My studies links, accurate menu state, and reachable controls. | Pass — 75 static local references and scripted browser navigation/focus checks; physical keyboard Not run |
| T83 | Projects remain usable | Filter to Math; play a computer round; generate term 100; calculate 2 + 3; add and clear cereal. | Correct filtering, resolved game round, exact Fibonacci value, result 5, and cart total $2.99 before clearing. | Pass — Projects smoke checks at phone/laptop/narrow sizes and saved dark mode |
| T84 | Published follow-up and full audit | After review and approved push, verify the live pages and run physical keyboard, screen-reader, and Lighthouse checks. | Published design matches the local build; complete accessibility checks pass. | Full live audit Not run — physical keyboard, screen-reader, and Lighthouse checks remain pending; deployment/source verification is separate. |

The previous no-gradient, Georgia, and Home/Education duplication expectations
are superseded by this approved follow-up. Earlier results and screenshots
remain historical evidence.

## Editorial portfolio refinement — 2026-11-07

The owner requested a more professional, credible portfolio. The revision keeps
all five pages and the existing factual content. Home now links directly to the
four real demonstrations. Laptop navigation is visible; smaller layouts use a
labeled Menu button. Projects and Skills use ruled rows instead of repeated
boxed cards. Education and Contact use flat sections, with a quieter warm wash,
Palatino headings, and regular-weight sans-serif body text. Keyboard preferences
are retained in a native disclosure in the footer. No credentials, client work,
testimonials, or claims of independent coding ability were added.

Final local checks passed **446 scripted assertions in 20 configurations**:
every page at 320px, 390px, and 1366px in light mode, and every page at 1366px in
saved dark mode. These use actual Chrome layout, programmatic clicks/focus,
synthetic keyboard events, native form-button activation, and reduced motion.
Evidence: `screenshots/editorial-browser-checks.json`.

A further **62 native browser input/resize assertions passed** on the original
local HTML files. Chrome DevTools delivered Tab, Shift+Tab, Enter, and Escape
at 390px and 1366px on every page. Checks cover focus order, menu activation,
Escape/focus return, skip-link activation, and opening/accessing Keyboard options.
Actual browser metrics changed from 1366px to 800px to 1100px to verify focus
across the menu breakpoint. Evidence: `screenshots/editorial-native-keyboard-checks.json`.
This is automated native browser input, not a physical keyboard or screen reader.

Four focused style checks passed for About button spacing at phone/laptop sizes
and selected-filter hover contrast in light/dark modes. All **73 relative file
and fragment references resolve**. Conservative light-gradient contrast bounds:
primary text 16.09:1, secondary text 6.69:1, control outlines 4.08:1. White text
on primary buttons is 17.93:1 and on hover is 11.73:1. Dark secondary text remains
at least 8.02:1. Source/style evidence is retained in the corresponding
`editorial-source-checks.json` and `editorial-style-checks.json` files.

Actual final screenshots cover every page at 390px and 1366px, plus saved-dark
Home and Projects: `screenshots/editorial-*.png`. They were captured directly
from the original local files using browser viewport emulation. Screenshots
were visually reviewed; reduced motion was used to stabilize captures.

Failures and corrections retained:

- A broad CSS replacement accidentally overwrote the About button's top margin.
  Screenshot review caught the missing gap. The selector was corrected; both
  phone/laptop spacing checks now pass. The original capture is retained as
  `editorial-about-phone-spacing-before.png`. This is a real agent mistake and
  correction, not a fabricated example.
- The first virtual-time iframe resize fixture raced its cross-frame messages.
  Its failed result is retained inside `editorial-browser-checks.json`. It was
  replaced with direct browser metric changes for reliable verification.
- Initial native-keyboard fixtures omitted Enter's carriage-return text and
  used the Alt modifier bit for Shift. Those test setup errors are preserved in
  `editorial-native-keyboard-initial.json` and
  `editorial-native-keyboard-modifier-before.json`; the corrected fixture uses
  Enter text, the Shift bit 8, and short event-processing delays.
- Native resizing then exposed an intermittent real focus failure: desktop CSS
  hid the focused Menu button before JavaScript could capture its focus. The
  redundant desktop display rule was removed; the hidden attribute now controls
  visibility after focus is captured. The failed result is retained in
  `editorial-native-keyboard-resize-before.json`; the final retest passed.
- Source review caught a selected-filter hover rule that could put white text
  on a light background. The hover fill now applies only to unselected filters;
  actual pointer-hover checks pass in both themes.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T85 | All-page editorial layout | Open all five pages locally at 320px, 390px, and 1366px; review phone/laptop captures. | Readable typography, quiet background, flat sections, no horizontal overflow, one h1 per page. | Pass — all 15 light configurations and visual review; About spacing error corrected and retested. |
| T86 | Responsive navigation and focus | Use native Tab/Shift+Tab/Enter/Escape on every page at 390px and 1366px; resize Home from laptop to mobile and back. | Visible desktop links, hidden closed mobile links, accurate expanded state, preserved focus. | Pass — 62 native input/resize assertions after fixture corrections and the responsive focus fix. |
| T87 | Home project index and references | Follow each project target in source; resolve every href/src/fragment across all pages; open index.html directly. | Four real demo targets, one personal introduction, no decorative Home graphic, all local references valid. | Pass — browser Home checks, 73 source references, direct-file captures. |
| T88 | Four project interactions | Filter Math/All; play computer and two-player rounds; generate 100 and invalid 0 Fibonacci terms; calculate 2+3 and divide by zero; add/clear groceries. | Correct filtering, hidden handoff, winner score, exact term 100, input errors, result 5, and $2.99 cart total before clearing. | Pass — focused regression in all four Projects configurations; earlier full edge-case suite not repeated. |
| T89 | Native footer disclosure | On every page focus Keyboard options; press Enter, then Tab. | Disclosure opens and the existing keyboard preference is reachable. | Pass — native input at phone and laptop widths; closed content excluded by the browser. |
| T90 | Dark theme and contrast | Restore saved dark mode on all pages; calculate palette contrast; move actual pointer over selected project filters in light/dark themes. | Readable text, visible controls, contrasting graphics, selected filters retain contrasting text/fill. | Pass — five saved-dark configurations, source bounds, and four focused style assertions including About spacing. |
| T91 | Local errors and assets | Capture uncaught errors/rejections in all 20 configurations; inspect image loading and relative asset versions. | No uncaught errors, missing images, or broken references; current stylesheet/script versions. | Pass — 20 browser configurations and source/hash verification. |
| T92 | Publication and submission audit | After owner review and approved push, run the full live plan, physical keyboard, screen reader, and Lighthouse. | Published revision matches local files and complete accessibility audit passes. | Full live audit Not run — physical keyboard, screen-reader, and Lighthouse checks remain pending; deployment/source verification is separate. |

Earlier screenshots/results remain historical. The latest checks do not replace
the full live-site submission plan or establish a Lighthouse Accessibility score.
