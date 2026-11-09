# Website test plan

## Mobile scroll-up header — November 9, 2026

The owner requested access to the dropdown while partway down a phone page and
explicitly asked to stop computer control. No computer/browser automation or
screenshots were used for this change. The previous native dropdown correction
is included in this revision; the owner approved committing and pushing both fixes.

Below 60rem (about 960px), JavaScript enables a sticky header. Scrolling upward
by a small accumulated distance reveals it; scrolling downward beyond the
header's height hides it. An 8px threshold avoids tiny direction-change flicker.
The header remains visible near the top, with an open menu, or while header
controls have visible keyboard focus. Overscroll is clamped to page bounds;
page/history entry and breakpoint changes reset visibility. Desktop layout has
no sticky-header rule. Reduced motion skips the transform transition. Mobile
section anchors have extra top clearance for the revealed header. Without
JavaScript, the native dropdown still works and the header scrolls normally.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U25 | Mobile scroll direction and menu access | On each live page at phone portrait/landscape widths below 960px, scroll down beyond the header, then up slightly. Open the menu, keep scrolling, change pages, and use Back/Forward. | Header hides while scrolling down and reappears on upward scroll; the open menu stays accessible; page/history entry resets visibility; no header-layout jump or sideways overflow. | Isolated logic: Pass — initial/top visibility, downward hiding, upward threshold, jitter, open-menu pinning, history reset, and top/bottom overscroll cases passed. Actual browser/device/live: Not run, for owner testing. |
| U26 | Desktop, keyboard, and reduced-motion regression | At laptop widths of 960px and above, scroll each page; resize between phone/laptop layouts. On mobile, Tab into the header, follow a section link, and repeat with reduced motion. | Desktop header scrolls normally; resizing clears mobile state; focused header controls stay visible; anchors have clearance; reduced motion skips sliding. | Isolated logic/source: Pass — desktop cleanup, return-to-mobile reset, visible-keyboard-focus pinning, focus-entry reveal, and mobile/no-preference transition scoping passed. Anchor clearance is present in CSS. Actual layout/keyboard/motion/live: Not run. |

Validation: **14 isolated header/source checks passed**, using mocked scroll,
focus, breakpoint, and lifecycle events. These do not verify native scrolling,
rendering, or touch behavior. main.js parses; all 74 HTML references/fragments
resolve; all five pages retain native details/summary navigation and current
versions (JS `833b221df252`, CSS `97f351827fa5`). git diff --check passes.
No Lighthouse rerun was performed or requested. The owner will perform any
remaining browser/device checks unless they explicitly reauthorize automation.

## Menu fallback and page-switching fix — November 9, 2026

The owner's live Skills screenshot shows the page links as a tall header column
with no hamburger to close them. The markup hid the button until main.js ran,
and CSS positioned the panel only after JavaScript added `is-enhanced`. A missed
or delayed initialization therefore exposed an in-flow navigation block. The
screenshot matches that fallback; the precise reason initialization did not
complete in the owner's session was not established from a console recording.
HTTP checks confirmed all five live pages still used that vulnerable structure.

Local correction: use native details/summary on every page, with the same SVG
hamburger, accessible Menu name, square control, links, and selected page. CSS
always anchors the dropdown to the header and bounds its width/height. Pointer
activation opens/closes natively even with scripts blocked. JavaScript preserves
keyboard entry, Escape, outside-click/link closing, and focus return; pageshow
closes restored menus after Back/Forward. No open state is stored. The previous
menu/fallback expectations below are historical. No Lighthouse rerun is requested.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U21 | Menu before/without JavaScript | At phone/laptop widths, block or delay main.js and load all five pages directly and via their navigation. Open and close the hamburger. | The icon is visible immediately; the menu opens/closes natively and stays anchored at the header's right edge, without expanding the header into a tall column. | Initial live: Fail — owner screenshot and source inspection confirm the vulnerable hidden-button/in-flow fallback. Local source: Pass — all five pages use details/summary without a hidden toggle, and positioning no longer depends on is-enhanced. Browser/live retests: Not run. |
| U22 | Page changes and history | With scripts enabled, open the menu, follow each page link, then use Back/Forward; repeat at phone/laptop widths and with reduced motion. | Each page/history entry starts closed; the three-line control remains reachable; no stuck menu or horizontal overflow. | Isolated JavaScript logic: Pass — initial and pageshow closure/focus cases passed. Native browser, responsive, history-cache, and live retests: Not run. |
| U23 | Keyboard and pointer closing | Use Enter from the summary, Escape from links, click the summary, click outside, select a link, and move focus outside the menu. | Enter opens and focuses the first link; Escape closes and restores focus; pointer activation uses the native toggle; outside/link/focus-out close correctly. | Isolated JavaScript logic: Pass — eight total checks covered initialization, Enter, Escape, outside click, link activation, pageshow reset, focus leaving, and leaving pointer toggling to the browser. These used mocked event targets, not native browser defaults. Browser/live retests: Not run. |
| U24 | Source and local assets | Parse main.js, resolve all page links/assets/fragments, inspect unique IDs/headings, and compare CSS/JS versions on all pages. Separately open index.html directly and inspect rendered images and console. | Script parses, assets/links resolve, headings/IDs remain valid, versions match; direct-file pages work without errors. | Static: Pass — all 74 HTML references/fragments resolve; all five pages have one h1, unique IDs, and native menus; JS 67909ae369ce and CSS ca78cd6c47e7 match their hashes; git diff --check passes. Direct-file/rendered-image/console checks: Not run. |

Browser QA was attempted on the portfolio Chrome window. The helper reported
concurrent user input, then Computer Use was stopped with the physical Escape
key. No further computer input was issued. No visual, native-keyboard, console,
phone/laptop, or direct-file pass is claimed for this revision. The fix is local
and was subsequently approved for commit/push; prior failures are preserved above.

## Three-line menu correction and missing live changes — November 8, 2026

The owner reported that the dropdown and grocery changes were still missing
online and clarified that the original menu used three lines. Two separate
findings were confirmed: the previous restoration used the later text-only Menu
and desktop links (`f9d3a3d`), while the live site still served `e0d6cbb` because
the `fda338d` Pages deployment was stuck in its deploy step. That build passed,
but a successful push did not establish publication. The missing live content
was confirmed from HTTP responses, not assumed to be a browser cache issue.

Correction: use the original hamburger SVG path `M4 6h16M4 12h16M4 18h16` from
`5268c1d`, with theme followed by hamburger in the header, and a dropdown at all
widths. Keep the later header-anchored overflow/height fixes, current-page state,
Enter/Escape focus behavior, outside-click closing, and no-script links. Preserve
the About paragraph and grocery drawings. This supersedes the desktop-link and
text-only-button expectations in the previous restoration record below.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U19 | Original hamburger on all pages and sizes | At phone and laptop widths, inspect each header; open the three-line button with click/Enter, use page links and Escape, click outside, and inspect the panel in landscape. | Three SVG lines replace the tabs/text-only button at every width; all five links work, panel fits, and Escape restores focus. | Initial: Fail — source restored the wrong menu version and hid its dropdown on laptops. Corrected source: Pass — original SVG path restored to all five pages, with no desktop rule disabling the dropdown. Browser/live interaction retests: Not run. |
| U20 | Published About and grocery assets | After Pages deployment succeeds, load all five live URLs, inspect the About paragraph and Projects shelf, and request the new CSS/JS and all three grocery SVGs. | Every page uses the new versions; About has the approved text; cereal/egg/bread outlines replace initials; all resources return 200. | Initial: Fail — live HTTP checks still showed the old navigation, script, stylesheet, and About copy; live script had no grocery image template. Retest: Pass for HTTP/source publication — dd8bba1 deployed successfully; all five headers contain the hamburger and current CSS/JS, the exact About paragraph is present, all three grocery SVGs return 200, and the script contains the image template. Visual/interaction retest: Not run. |

Publication evidence: the previous [fda338d deployment](https://github.com/SS08-School/portfolio/actions/runs/42563313315)
eventually failed with the annotation "Timeout reached, aborting!". The
[dd8bba1 deployment](https://github.com/SS08-School/portfolio/actions/runs/42564255122)
completed successfully. All 74 live HTML links/assets/fragments resolved, plus
the three dynamically referenced grocery SVGs. Live script version is
`eb892289ce98`; stylesheet version is `1406d9bdc175`. These HTTP/source checks
verify published files, not native keyboard behavior or rendered appearance.

Browser QA was attempted, but input geometry was unavailable. Automatic approval
review then rejected screenshot capture because the selected Chrome window
displayed the private signed-in course assignment rather than the portfolio.
No further browser input was issued after rejection. Phone/laptop visuals,
native keyboard interaction, direct-file rendering, and console checks for
this correction remain Not run. No new Lighthouse audit is requested.

## Restored Menu, About copy, and grocery outlines — November 8, 2026

At the owner's request, restore the navigation implementation from `f9d3a3d`,
immediately before its removal in `1aad8ab`: desktop links plus the compact
phone Menu, including the visible Menu accessible name, header-anchored
viewport-width/max-height limits, Escape/focus return, outside-click closing,
current-page state, and resize handling. Only the menu markup, behavior, and
associated styles were restored; the newer calculator/cart keyboard behavior,
random opponent, SVG arrows, solid dark mode, and smooth Back to the top remain.
Hover effects remain restricted to fine pointers that support hover.
Source comparison: Pass — the restored menu behavior block and all five
navigation markup blocks match `f9d3a3d` exactly after line-ending normalization.

About now uses the owner's exact personal paragraph immediately before Get in
touch. The shopping shelf replaces FF/E/S with three original outline SVG files
in images/. They are decorative beside the product names and invert in dark
mode using the existing image rule. All three are under 500 KB (346–406 bytes).
Earlier permanent-navigation-row expectations below are historical for this
revision. The owner approved committing and pushing these changes. Deployment
verification is separate from the remaining interaction tests; no Lighthouse
rerun is claimed.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U14 | Restored Menu interaction and keyboard | On every page at phone width, click Menu, close it, open with Enter, press Escape, click outside, and follow each page link. Resize to laptop width and back with focus in navigation. | Five correct links, accurate expanded state, visible keyboard focus, Escape returns to Menu; outside click/link activation closes it; laptop links stay visible and focus survives resize. | Partial — native local Chrome on Home: click opened Menu, Enter focused its Home link, Escape closed it with visible Menu focus, and maximizing exposed all five desktop links. All-page, exact phone-width, outside-click, and full resize retests: Not run. |
| U15 | Narrow and landscape menu regression | On all pages at 320px/390px and short landscape sizes, open Menu and scroll within it; repeat in dark mode and without JavaScript. | Panel stays inside both viewport edges, all links remain reachable, dark mode stays readable; no-script links remain visible. | Not run for this revision. Source retains the earlier tested viewport-width and maximum-height fixes; earlier results are not a new browser pass. |
| U16 | Owner-provided About paragraph | Open About at phone/laptop widths. Read the paragraph, use Get in touch with Tab/Enter, and inspect Education. | Exact supplied paragraph appears once above the contact link; Education remains; contact link works; no overflow. | Source: Pass — supplied paragraph and contact destination verified. Browser/live: Not run. |
| U17 | Grocery outline drawings and cart regression | Open local Projects at phone/laptop widths and in dark mode. Inspect cereal/egg/bread drawings; add items, use minus/plus/remove, and check arrow focus order and totals. | Three distinct responsive outlines replace initials, invert in dark mode, and do not change names, prices, stock, totals, or keyboard actions. | Assets/source: Pass — three valid SVG XML files, all below 500 KB, decorative empty alt text, and fixed grocery data retained. Rendered drawings and cart interaction retest: Not run. |
| U18 | Direct-file and source validation | Double-click index.html; inspect Menu. Parse main.js, resolve HTML links/assets/fragments and grocery images, check versions and whitespace. | Home works without a server; script parses; one h1 and one current-page navigation link per page; references and versions match; no whitespace errors. | Pass for observed direct-file Home and static checks — script parses, all 74 HTML references/fragments resolve, all three grocery SVGs exist and parse, and all five pages have five menu links, one current page, one h1, and unique IDs. CSS version 0b44117df635; JS version 3de00dd14624; git diff --check passes. Full console/rendered-image audit: Not run. |

Computer Use recovered enough to inspect local Home in a compact Chrome window
and then a maximized window. Exact CSS viewport sizes were not measured. During
the attempt to enable responsive testing, the user stopped Computer Use with
the physical Escape key; no further browser input was issued. Native AX focus
snapshots lagged screenshots, so the limited focus results above rely on visible
focus outlines. No new screenshots were saved to the repository. Phone/laptop
QA on About/Projects and the remaining navigation cases still need checking.
The existing Lighthouse reports are retained at the owner's request.

## Owner live test results and keyboard follow-up — November 8, 2026

The owner reported the results below after testing the live GitHub Pages site:
https://ss08-school.github.io/portfolio/. U01–U12 correspond to T1–T12 in the
conversation's twelve-example table, not the older T1–T12 in the historical
record. These are owner-reported results. Exact browser version, viewport sizes,
and the deployed commit were not supplied; no new device details are inferred.
Earlier detailed failures and results below are retained.

| ID / conversation ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U01 / T1 | Every navigation link | From each page activate all five page links; repeat at phone/laptop widths. | Every destination and current-page indicator are correct. | Pass — owner reported T1 is OK on the live site. Exact run configurations were not supplied. |
| U02 / T2 | Phone layouts | Inspect and scroll through all five pages in portrait and landscape, with browser controls visible. | Content and controls fit without clipping or sideways scrolling and remain usable in a short viewport. | Portrait: Pass — owner reported the vertical layout was fine. Landscape: owner reported Chrome controls at the top and bottom reduced available room and the site felt zoomed in. No clipping or overflow was specifically reported. Landscape usability needs follow-up; no spacing fix or retest is claimed. |
| U03 / T3 | Laptop layouts | Inspect all five pages at laptop width. | Text, images, and controls remain readable without overlap or clipping. | Pass — owner reported T3 is OK. |
| U04 / T4 | Keyboard on every page | Use Tab, Shift+Tab, Enter, arrows, and Escape; inspect calculator operations and cart controls. | Focus stays visible; Left/Right browse calculator operations without selecting; cart arrows reach item actions before Empty basket; Enter activates. | Fail — owner reported Left/Right selected calculator operations and cart arrows reached Empty basket before the desired item controls. Other keyboard behavior was reported OK. Local fixes implemented; browser and live retests: Not run. |
| U05 / T5 | Theme and persistence | Switch themes on every page, reload, and navigate. | Theme updates and persists; dark background is solid. | Pass — owner reported T5 is OK. |
| U06 / T6 | Manual carousel | Use Previous/Next and keyboard controls, then each demo link. | All slides and demo links work with visible focus. | Pass — owner reported T6 is OK. |
| U07 / T7 | Calculator | Try all operations with 12 and 3, blank input, division by zero, and reset; browse operations with arrows and select with Enter. | Correct arithmetic and errors; arrows only move focus; Enter selects without calculating until submission. | Fail for keyboard selection — owner reported calculator otherwise OK. Same failure/fix as U04; local browser and live retests: Not run. |
| U08 / T8 | Shopping cart | Add/change/remove/empty items; test invalid quantities; move Left/Right between shelf and basket actions. | Stock and totals update; invalid values are rejected; item controls are reached before Empty basket. | Fail for arrow navigation — owner reported cart otherwise OK. Same failure/fix as U04; local browser and live retests: Not run. |
| U09 / T9 | Rock Paper Scissors | Play computer and two-player modes; inspect scoring, handoff, Next round, and reset. | Game rules, concealment, scores, and reset work. | Pass — owner reported no additional game-specific problem; shared keyboard failures are recorded in U04/U07/U08. |
| U10 / T10 | Fibonacci explorer | Generate valid and invalid counts; select terms and use stepping/playback controls. | Valid sequences begin at 0; invalid counts are rejected; controls update correctly. | Pass — owner reported no additional Fibonacci-specific problem; shared keyboard failures are recorded separately. |
| U11 / T11 | Contact validation and draft | Test blank/invalid/valid input; create a draft and edit a field. | Errors appear for invalid input; valid input prepares an encoded draft; editing invalidates it. | Pass — owner reported T11 is OK. No message delivery is claimed. |
| U12 / T12 | Lighthouse and motion | Run Accessibility on each live page; scroll through Skills/Contact and inspect reduced motion separately. | Every page scores at least 90; reveals occur once and reduced motion skips effects. | Lighthouse: Pass — owner reports completion; existing five Mobile after-exports record Accessibility 100. Reveal/reduced-motion checks were not specifically confirmed in this owner session: Not run. Desktop audits remain Not run. |

### Requested fixes and retest status

- T2 clarification: the concern is phone landscape with browser controls visible,
  not portrait. Source inspection confirms all five pages declare
  `width=device-width, initial-scale=1`; no forced zoom was found in those
  declarations. Some heading sizes scale with viewport width, so source alone
  does not establish why the page felt zoomed in. No CSS or viewport changes
  were made for this observation. Recheck the affected landscape page on the
  actual phone with browser controls visible, recording device/browser and
  whether text or controls are clipped or simply require more vertical scrolling.
- Calculator Left/Right now prevent native radio selection and move focus in
  control order. Enter selects the focused operation without submitting. Mouse
  and native Space activation remain available. Up/Down navigation is preserved.
- Cart Left/Right now follow each product's Quantity, Add, minus, plus, and Remove
  controls, skipping disabled/unavailable actions. Empty basket follows all
  products. Tab order is unchanged. Arrows do not add/remove items.
- Shared script URLs were refreshed on all five pages. README and project
  instructions describe the owner's requested keyboard behavior.
- Static validation: Pass — main.js parses as a classic script; all 74 local
  link/asset references and HTML fragments resolve; all five pages use the
  current script SHA-256 prefix `44a588a2cebe`; git diff --check passes. These
  checks do not establish browser behavior. The five saved Mobile after-report
  JSON files were read again: each records Accessibility 100 on its live URL.
- Browser verification was attempted using native Chrome on the direct-file
  site. Computer Use stopped because it could not determine the current browser
  URL with enough confidence to enforce policy. No further UI input was issued.
  Phone/laptop keyboard, direct-file loading, rendered images, and console checks
  for this change remain Not run. No new screenshots or Lighthouse runs are claimed.
- The owner approved committing and pushing these changes. After deployment, repeat
  U04/U07/U08 at phone/laptop widths. Keep the failures above alongside the new
  results. The owner declined further Lighthouse runs: retain the completed
  reports as evidence for their audited revision; no new audit is required by
  this follow-up and no score for these later changes is claimed.

### Back to the top transition — November 8, 2026

The owner requested a smooth transition when activating Back to the top.
Source inspection found that a click handler forced an instant jump before
the native anchor could use the existing reduced-motion-aware CSS scrolling.
The handler now stops any pending custom keyboard scroll and leaves scrolling,
focus, and fragment history to the native link. The shared script URLs are
refreshed. Existing keyboard-focus transitions remain unchanged.
Static retest: Pass — the script parses, all 74 local references/fragments
resolve, all page script versions match, and git diff --check passes. Browser
retest was unavailable: the browser access host was unavailable and the native
Chrome window was minimized. Phone/laptop, direct-file, rendered-image, console,
and motion checks remain Not run for this correction. No Lighthouse rerun was
performed or requested.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| U13 | Back to the top transition | At phone and laptop widths, scroll to the end of Projects. Click/tap Back to the top, then repeat using Tab and Enter, including when the URL already ends in #top. Enable reduced motion and repeat. | Normal motion scrolls smoothly to the top; reduced motion returns instantly. The fragment and keyboard navigation remain usable. | Initial: Fail by source inspection — the handler explicitly forced an instant jump, matching the owner's report. Local correction implemented. Browser/live retests: Not run. |

## Lighthouse assignment results - November 8, 2026

All five supplied live Mobile before/after pairs were read from actual JSON exports.
Every after category score is 100. All five after Accessibility results meet the
assignment target of at least 90; no after Accessibility, Best Practices, or SEO
audit has a failing score. The Projects visible-label/name audit changed from
Fail (score 0) to Pass (score 1). Its zero scoring weight explains why the
Accessibility category stayed at 100.

| Page | Performance before -> after | Accessibility before -> after | Best Practices before -> after | SEO before -> after |
| --- | --- | --- | --- | --- |
| Home | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 |
| About | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 |
| Projects | 98 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 |
| Skills | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 |
| Contact | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 |

Report settings: Navigation mode; Mobile form factor; simulated throttling;
Lighthouse 13.5.0; host Chrome user agent 156.0.0.0 on Windows. All reports have
screenEmulation.disabled=true, so the stored 412 by 823 preset does not establish
the actual audit viewport. Incognito use was not independently verified from
these JSON files. All runs were November 8, 2026 in America/New_York (EST);
their UTC fetchTime dates are November 9. No new Lighthouse runs were performed
while documenting these results. The Lighthouse assignment specifies Mobile;
Desktop rows belong to the broader portfolio test plan and are not a requirement
of this assignment. Unrun Desktop and manual checks remain Not run.

### Remaining Performance findings

Every after report still flags Use efficient cache lifetimes, Network dependency
tree, Render-blocking requests, and Minify JavaScript. Projects additionally
flags Max Potential First Input Delay (100 ms). These findings have zero category
scoring weight in these reports. The increase in Projects Performance from 98 to
100 does not establish that the label correction caused a performance improvement.

| Finding | Disposition under the current project rules |
| --- | --- |
| Use efficient cache lifetimes | Could not fix in the site files: GitHub Pages controls the 10-minute server cache headers. The assignment explicitly says to leave server settings alone. |
| Network dependency tree | Remains: the HTML requests the shared stylesheet and early theme script. They are already declared in the head. Further optimization requires a separate measured Performance task; no loading change is claimed. |
| Render-blocking requests | Remains: the stylesheet supplies the initial design and theme.js applies the saved theme before paint. Deferring the script could introduce a theme flash. Inline CSS conflicts with the external-stylesheet rule. |
| Minify JavaScript | Remains: estimated savings are about 2 KiB. Readable main.js is retained for the school demo; the current rules prohibit build tools. No minified deployment workflow was introduced. |
| Max Potential First Input Delay | Remains on Projects at 100 ms. A Performance recording is needed before identifying a responsible task; no function is blamed without evidence. |

Best Practices and SEO needed no fixes. Performance findings were reviewed
without changing the design, adding dependencies, hiding content, or claiming
that every diagnostic must pass to meet the Accessibility score target.

The ten original exports were renamed with .json extensions; SHA-256 checks
confirmed their contents were unchanged. They stay in the established
reports/lighthouse folder, which is this repository's documented location for
the assignment's lighthouse report folder. Initial failures are retained.


## Fibonacci accessible-name correction — November 8, 2026

The saved live report `reports/lighthouse/projects-before.json` fails
`label-content-name-mismatch` for the 12 generated Fibonacci term buttons.
A later Projects report reviewed during this session had the same failure.
Both Accessibility scores were 100 because this audit has zero weight;
the scores do not mean the reported failure passed. Preserve initial failures.

Local correction: remove the generated buttons' overriding `aria-label` so
their visible index and value provide the accessible name. The containing
group remains named "Fibonacci terms" and `aria-pressed` still identifies the
selected term. Refresh the Projects script URL for the changed JavaScript.
No visual design, CSS, libraries, or frameworks changed.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| FIB-A11Y-01 | Visible label matches accessible name | Open local Projects at phone and laptop widths. Inspect all 12 initial term buttons in the browser accessibility tree. | Each accessible name matches the visible index and value, including leading zeros. | Initial live result: Fail in both saved Projects reports. Local retest: Pass — Chrome accessibility tree lists all 12 matching names, from 01 0 through 12 89, at laptop and phone layouts. |
| FIB-A11Y-02 | Keyboard selection remains usable | At phone and laptop widths, use Tab to a Fibonacci term and Enter to select it; move to another term and repeat. | Focus remains visible and selection/calculation update. | Pass — native Tab/Enter selected terms 1 and 2 in both layouts; screenshots showed focus outlines, selected states, and matching calculations. |
| FIB-A11Y-03 | Direct-file and responsive regression | Open index.html directly, follow Projects, inspect at phone/laptop widths, use the Fibonacci controls, and check local links, images, overflow, and console errors. | Pages and controls work without a server, with no missing assets, overflow, or console errors. | Partial — direct-file Home and its Projects navigation passed; Fibonacci visuals, labels, and focus fit the inspected layouts. All 21 referenced local files exist. Full-page overflow, console errors, and every image's rendered state: Not run. |
| FIB-A11Y-04 | Published Lighthouse retest | After owner review and approved deployment, run Lighthouse on live Projects and inspect label-content-name-mismatch explicitly. | The audit passes with no flagged Fibonacci buttons; retain a new report alongside previous failures. | Pass — projects-after.json records the live audit passing with score 1; Accessibility remains 100. |
| FIB-A11Y-05 | Source validation | Parse main.js as a classic script, resolve Projects local file references, verify its script URL against the SHA-256 prefix, and run git diff --check. | JavaScript parses; referenced files exist; script version matches; diff has no whitespace errors. | Pass — JavaScript parsed, all 21 local file references resolved, script version ec53b5549eb7 matched, and diff check passed. This is not browser validation. |
| FIB-A11Y-06 | Names after regeneration | Generate 1 and 100 terms at phone/laptop widths; inspect the resulting buttons' accessible names. | All regenerated buttons use their visible index and value as their accessible name. | Not run. |

Browser access recovered during this local correction after the earlier
Computer Use policy stop. Checks used native Chrome UI on the original
file:// pages in a 1536-pixel-wide laptop window and Responsive mode at
400 by 738 pixels. Keyboard and visual checks are limited to the described
cases; native accessibility snapshots sometimes lagged screenshots. No new
Lighthouse or screen-reader result is claimed. Console inspection did not
complete, so it remains Not run. The original saved reports are unchanged.

## Current submission plan — November 8, 2026

Use this section for the current site. Older results are preserved under
[Historical test record](#historical-test-record); their retired features are
not current requirements.

- Live site: [Sebastian Szeliga's portfolio](https://ss08-school.github.io/portfolio/).
- Functional preflight baseline: `1c690d6` (smaller Contact title and email).
- Accessibility readiness correction: `123049d` (Menu uses its visible text as
  its accessible name; open/closed state remains in aria-expanded). Record the
  actually audited deployment/commit with your Lighthouse reports.
- Mobile layout correction: `99200af`, verified live on November 8 at narrow
  portrait/landscape widths. See T139–T144 and the mobile follow-up below.
- Automated live preflight: **Pass — 444 checks** on November 7, 2026.
  This comprises 302 page/feature checks, 50 primary navigation activations,
  66 additional project/input checks, and 26 brand/content-link activations.
- Browser: Chrome 156.0.8078.81; phone viewport 390 × 1000 and laptop 1366 × 1000.
- Method: original live HTTPS pages, native browser keyboard input and DOM
  interactions in isolated Chrome. Reduced motion stabilized functional checks
  and captures. This was **not** a Lighthouse run or a physical-keyboard/
  screen-reader session.
- **Lighthouse Mobile results: Pass for the score target on all five pages.**
  Actual before/after exports are recorded above and in LH01/LH03/LH05/LH07/LH09.
  Desktop Lighthouse and unrun manual checks remain Not run.

An Actual result of Pass below refers only to the described automated live
check. Pending manual/Lighthouse cases say Not run. After your own test, append
the date, browser/version, device/viewport, exact URL, and Pass or Fail.
Never replace an initial failure with a passing result: retain both attempts.

### Live URLs

| Page | URL |
| --- | --- |
| Home | https://ss08-school.github.io/portfolio/ |
| About / Education | https://ss08-school.github.io/portfolio/about.html |
| Projects | https://ss08-school.github.io/portfolio/projects.html |
| Skills | https://ss08-school.github.io/portfolio/skills.html |
| Contact | https://ss08-school.github.io/portfolio/contact.html |

### Calculator, cart arrows, and solid dark mode — local follow-up

Enter now selects the focused calculator operation without implicitly submitting
the previously selected operation. Recent calculation markup, history storage,
and its descriptions/styles are removed. On each shopping shelf row, Right
from Quantity goes to Add; Left from Add returns to Quantity. Dark mode uses
a solid near-black background; the light-theme gradient remains. Live
interaction retests, physical-device checks, and Lighthouse remain **Not run**.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T160 | Enter on each calculator operation | Tab to each of the four operation radios, press Enter twice, then activate Calculate. Also use Space and Right on the radios. | Enter checks the focused operation without submitting or reverting to a previous one; Calculate returns 15, 9, 36, or 4 for 12 and 3. Space and Right remain usable. | Initial baseline: Fail — Multiply stayed unselected after Enter at 390px/1366px. Fix/retest: Pass — all four operations, repeated Enter, Space, and Right at 320px/390px/1366px. Live: Not run. |
| T161 | No recent calculations | Calculate several answers, inspect the result area and showcase copy, then Reset example. | Only the current result is shown; no recent list or history text remains; reset restores 12 + 3 = 15. | Initial baseline: Fail — history still present at both baseline widths. Local retest: Pass at all three widths. Live: Not run. |
| T162 | Quantity/Add horizontal navigation | For cereal, eggs, and bread, press Right from Quantity, Left from Add, then Right and Enter. Try an invalid 0 quantity; fill all shelf stock and Empty basket. | Focus moves within the correct shelf row without changing quantity; Enter adds the chosen amount; errors, stock limits, focus relocation, totals, and clearing still work. | Initial baseline: Fail — Right stayed in Quantity at both baseline widths. Local retest: Pass for all three products at all three widths, including full stock/disabled controls and $39.91 total. Live: Not run. |
| T163 | Solid dark theme and persistence | On all five pages at phone/laptop widths, toggle dark, inspect background, reload, and toggle back to light. | Dark background has no image/gradient and is #111111; it persists after reload; switching to light restores its gradient. | Initial baseline: Fail — dark gradient remained at both baseline widths. Local retest: Pass on all 15 page/width configurations. Live: Not run. |
| T164 | Calculator validation regression | Calculate negative decimals, submit blank input, divide by zero, multiply 1e308 by itself, and reset. | Decimal result is correct; missing input, division by zero, and nonfinite results are rejected; reset clears errors and restores the example. | Pass — local native browser input at all three widths. Live: Not run. |
| T165 | Responsive/focus regression | Open every page at 320px, 390px, and 1366px; use Tab from the brand, inspect focus, images, document width, and page errors. | Navigation remains reachable with visible focus; no document overflow, broken visible images, or browser errors. | Pass — all 15 local configurations. Physical devices/live: Not run. |

Evidence:

- [Baseline](reports/calculator-cart-before-2026-11-08.json): eight failed desired-behavior checks across 390px/1366px before these changes.
- [Completed local retest](reports/calculator-cart-local-2026-11-08.json): **210 assertions passed across 15 configurations**, using original file:// pages, native Chrome keyboard input, and reduced motion.
- [Initial retest fixture output](reports/calculator-cart-initial-fixture-2026-11-08.json): nine currency assertions falsely failed because PowerShell expanded literal dollar signs in their expected values. Correcting the fixture produced the complete passing rerun; no website changes were made between those two runs.
- All 74 local asset/link references and fragments resolve; stylesheet/script versions match the current files.
- Actual captures at 390px/1366px: screenshots/calculator-enter-*.png, screenshots/cart-arrow-dark-*.png, and screenshots/solid-dark-home-*.png. Each is under 500 KB.

Earlier history-list and dark-gradient expectations below describe retired
behavior; retain them as historical evidence and use T160–T165 for this revision.

### Random-opponent follow-up — previous revision

At the owner's request, all jump/skip links and their hidden help copy are
removed. The computer now makes independent random picks; the adaptive logic
and strategy dropdown are removed. On Projects, Up/Down navigate away from
selection and number controls without changing values. Left/Right retain
native adjustment/caret behavior. Live interaction retests remain pending. Older
results below preserve their original expectations; jump-link, adaptive-AI,
and native project Up/Down expectations are superseded by these cases.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T155 | No jump link and direct Tab entry | Load all five pages at 320px, 390px, and 1366px. Tab from page load, Tab again, wrap forward/backward, and press Escape. | First Tab reaches the brand, then Home; no jump link exists; wrapping returns to real controls; Escape releases the loop. | Pass — local native Chrome input on all 15 page/width configurations. Live: Not run. |
| T156 | Random computer only | Inspect the game and logic notes. Test deterministic samples selecting each computer move before the player chooses; advance/reset, test tie and computer win. | No adaptive content or strategy selector remains; computer commits independently before the current move; scores and Next round work. | Pass — local browser samples for all three random branches, player/computer wins, tie, and next round at all three widths. The test harness controls randomness; production uses Math.random. Live: Not run. |
| T157 | Two-player regression | Use Enter to select rock, hand off, and select scissors for five rounds; use Next round and Play again, then switch back to computer. | First choice is concealed during handoff; score reaches five; replay clears scores; computer mode restores its random-opponent instruction. | Pass — local native Enter controls at all three widths. Live: Not run. |
| T158 | Project Up/Down without changing values | Focus a game mode, Fibonacci count/range, calculator operation/number, and cereal quantity; press Up/Down. Then use Right on range and radio. | Vertical keys leave the row/control without changing mode, value, or operation; Right still adjusts range/radio choices. | Pass — local native keys at all three widths, including both directions from each tested input. Live: Not run. |
| T159 | Keyboard and responsive regression | On each page inspect focus and horizontal bounds; use carousel Right and Contact caret Left; inspect errors and visible images. | Focus remains visible, no document overflow or page errors, visible images load, carousel changes slide, and Contact caret editing works. | Pass — local Chrome at 320px, 390px, and 1366px. Live/physical devices: Not run. |

[Local report](reports/random-computer-keyboard-local-2026-11-08.json):
**243 assertions passed across 15 configurations** on original file:// pages
using native Chrome keys and reduced motion. All 74 local link/asset references
and fragments resolve; CSS/JS versions match their content. Phone/laptop game
captures: screenshots/random-computer-390.png and
screenshots/random-computer-1366.png. Lighthouse and physical-device checks
remain **Not run**.

### Earlier keyboard direction follow-up — superseded behavior retained

This earlier revision kept the accessibility shortcut but called it
"Jump to page content". It is hidden until keyboard focus and excluded from
arrow-key cycling. Left/Right follow control order; Up/Down use the row above
or below and scroll when there is no control in that direction. Native editing,
radio, slider, and carousel keys remain intact. Live interaction retests,
physical-keyboard checks, and Lighthouse results remain **Not run**.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T151 | Keyboard-only jump shortcut | Reload each page at 390px and 1366px. Inspect before focus, press Tab, then Enter. | The shortcut is initially hidden, reads Jump to page content when keyboard-focused, and moves focus to main content on Enter. | Pass — local native Chrome input on all 10 page/width combinations. Live: Not run. |
| T152 | Distinct horizontal and vertical arrows | From About in the header, use Right/Left, then Down/Up. On Home press Down from View projects. On Skills press Down from navigation. | Left/Right traverse links; Down moves to content below instead of the adjacent tab, Up returns above; if there is no control below, Down scrolls rather than moving sideways. | Pass — local checks across all five pages at both widths, including text-only Skills and the last control row on Home. Live: Not run. |
| T153 | Arrow wrap, Tab cycle, and Escape | Use Left from the brand and Right from the last control. Tab from the last control, then press Escape. | Arrow cycling omits the jump link; Tab still reaches it; Escape releases the custom Tab loop. | Pass — local native key input on all five pages at both widths. Live/physical keyboard: Not run. |
| T154 | Native feature and field keys | Use carousel Right, Down from Rock, radio Right, slider Up; type into Contact and use caret Left and multiline Up/Down. | Carousel changes slides; Down leaves the horizontal move row; radio/slider values update; editing keys stay inside fields. | Pass — local Projects and Contact checks at both widths. Live: Not run. |

[Local results](reports/vertical-keyboard-local-2026-11-08.json): **146 assertions
passed across 10 page/viewport combinations** using original file:// pages,
native Chrome keyboard events, and reduced motion. No browser errors, broken
visible images, or document overflow were found. Screenshots:
screenshots/keyboard-jump-390.png and screenshots/keyboard-jump-1366.png.

The [initial run](reports/vertical-keyboard-initial-2026-11-08.json) retained one
failed combined image/error assertion on Projects at 1366px. That assertion
also counted hidden, lazy-loaded carousel images. The retest checked rendered
images and recorded diagnostics separately: no browser errors or broken visible
images; two hidden lazy images were pending at 390px. All 146 retest assertions
passed with no website changes between the two runs.

### Navigation row revision — visible navigation and touch feedback

This revision replaces the dropdown with a visible row of five links, uses SVG
arrows, and restricts hover styling to hover-capable fine pointers. Local
functional results are recorded below; live functional retests remain pending.
Earlier live results refer to their recorded deployments and do not verify
this new revision.
Dropdown-only cases T115, T137, and T140 are retired and preserved below.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T145 | Visible row and all page destinations | Open each page at phone and laptop widths; activate all five header links from each source. | Five links remain visible left-to-right, with no dropdown; all 50 source/destination activations reach the correct page. | Pass — local touch/mouse input: all 50 destinations at 390px/1366px. Live: Not run. |
| T146 | Matching arrow icons | Inspect arrow links, carousel buttons, Fibonacci controls, round results, and match replay on phone and laptop. | SVG arrows share one style; no arrow text becomes an emoji, including dynamic game buttons. | Pass — local SVG/text-glyph checks across 45 configurations; round/replay icon checks included. Physical Safari and live: Not run. |
| T147 | Touch release and real selections | Tap theme/carousel controls and a calculator operation; release; use Tab to focus controls. | Temporary press/hover feedback clears after release; actual selections and keyboard focus stay visible. | Pass — emulated touch release on theme/carousel; selected radio and keyboard-outline checks passed. Physical-device and live: Not run. |
| T148 | Keyboard with permanent navigation | On every page use Tab from the brand, Left/Right between page links, Tab across boundaries, and Escape. Type in Contact and use its caret arrows. | Focus is visible, navigation remains available, loop works until Escape, and editing keys remain native. | Pass — native Chrome keyboard input on every page across 45 configurations; Contact typing/caret checks passed. Live/physical keyboard: Not run. |
| T149 | Navigation without JavaScript | Disable scripts; load all five pages at 320px and 1366px. | All five page links remain visible without a menu button or sideways overflow. | Pass — all 10 local no-script page/viewport checks. Live: Not run. |
| T150 | Reflow regression | Load every page at 280, 320, 360, 390, 430, 568, 844, and 1366px; repeat at 390px in dark mode; interact with demos and form. | Navigation labels, SVGs, text, fields, and controls fit; no document overflow or left/right clipping. | Pass — 45 local viewport/theme configurations, before and after interactions. Live and physical devices: Not run. |


Local Chrome results: **45 configurations, 1,213 assertions, 50 page-link
activations, and 10 no-script checks passed**. Sizes: 280×653, 320×568,
360×640, 390×844, 430×932, 568×320, 844×390, and 1366×900 for all five pages;
390×844 also runs in dark mode. Checks use reduced motion, Chrome touch/viewport
emulation, native keyboard input, and original file:// pages. They are not
physical-device or Lighthouse results.

- [Local browser results](reports/navigation-row-local-2026-11-08.json).
- [Local links, asset versions, syntax, and image sizes](reports/navigation-row-source-2026-11-08.json): 79 local references pass; no image is 500 KB or larger.
- Phone screenshots: `screenshots/navigation-row-{index,about,projects,skills,contact}-390.png`.
- Laptop screenshots: `screenshots/navigation-row-{index,projects}-1366.png`.
- [Initial runner output](reports/navigation-row-initial-fixture-2026-11-08.json)
  preserves a test-fixture mistake: a duplicated glyph check had double-escaped
  Unicode ranges and falsely failed 45 times. The independent correct glyph
  check passed in that run. The fixture was corrected; the complete rerun
  above passed without changing website code to satisfy the faulty check.

### Current test cases

Run on the URLs above, not only Live Preview. Repeat interactive cases at
phone and laptop widths. Examples use test data rather than real personal data.
The contact form prepares a draft; sending email is not part of automated testing.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T108 | Every Home navigation link | Open Home; activate the visible Home, About, Projects, Skills, and Contact links using Enter. Return to Home before each activation; repeat on laptop. | Each destination opens and exactly one page is identified as current. | Pass — all 10 live activations; see navigation matrix. |
| T109 | Every About navigation link | From About repeat all five page-link activations at phone/laptop sizes. | All destinations and current-page states are correct. | Pass — all 10 live activations. |
| T110 | Every Projects navigation link | From Projects repeat all five page-link activations at phone/laptop sizes. | All destinations and current-page states are correct. | Pass — all 10 live activations. |
| T111 | Every Skills navigation link | From Skills repeat all five page-link activations at phone/laptop sizes. | All destinations and current-page states are correct. | Pass — all 10 live activations. |
| T112 | Every Contact navigation link | From Contact repeat all five page-link activations at phone/laptop sizes. | All destinations and current-page states are correct. | Pass — all 10 live activations. |
| T113 | Brand, CTAs, and project anchors | Activate the name/monogram on every page, both Home action links, About's Get in touch, every carousel project's demo link, and Back to the top. | Brand reaches Home; CTAs reach the named page; demo links focus the correct lab; Back to the top reaches the top. | Pass — 26 live native-Enter activations across phone/laptop sizes. |
| T114 | Every page on phone/laptop | Open all five pages at 390px and 1366px; inspect text, images, fields, and header; check sideways scrolling. | Content fits, images load, controls are reachable, and there is no horizontal overflow. | Pass — 10 live layouts; current captures are linked below. Human visual review remains your submission check. |
| T116 | Keyboard on every page | Reload each page; use Tab/Shift+Tab across boundaries and arrows from the brand. | Focus is visible, Tab cycles through available controls, arrows move focus, and hidden controls are skipped. Current no-jump behavior is covered by T155. | Pass — live native browser input on all five pages at both widths; also perform T135. |
| T117 | Theme toggle and persistence | On every page switch to dark, reload, switch to light, and reload again. Inspect both states. | Button state and palette update; the chosen theme survives reload. | Pass — live light/dark toggle and reload checks on every page at both widths. Manual dark contrast inspection remains part of T135. |
| T118 | Image carousel | Use Previous/Next, Left/Right, Home, and End; inspect all four slides and use a slide link. | One slide is active, status updates, every project is reachable, focus stays visible, and there is no autoplay. | Pass — live carousel checks and all four slide-link activations at both widths. |
| T119 | Computer RPS and reset | Play against the random computer, advance, reset, and play again. | Rounds resolve, Next round works, and Reset clears the match. | Earlier live rounds passed for both strategies; adaptive AI is now retired. Current local random-only results: T156 Pass. Live retest: Not run. |
| T120 | Two-player RPS, ties, match end | Select 2 players; choose rock, hand off, choose scissors; repeat to five wins, then Play again. Also play rock versus rock and reset. | First move stays hidden during handoff; Player 1 wins correctly; first-to-five ends the match; Play again/reset clear scores/ties. | Pass — live handoff, scores 1–5, match end, replay, tie, and reset checks at both widths. |
| T121 | Fibonacci valid input | Generate 1, 12, and 100 terms. Inspect lengths and final values. | Results end at 0, 89, and exactly 218922995834555169026 respectively. | Pass — live exact-value checks at both widths. |
| T122 | Fibonacci invalid input | Submit blank, 0, -1, 1.5, and 101. | Each is rejected with a clear error; invalid input receives focus. | Pass — all five invalid inputs tested live at both widths. |
| T123 | Fibonacci controls | Move the range to 6; select a term, use Previous/Next, start Replay, wait for advancement, and Pause. | Range updates the sequence; selection/calculation update; replay advances and pause stops it. | Pass — live range, term, step, playback, and pause checks at both widths. |
| T124 | Calculator valid operations | Use 12 and 3 with +, −, ×, ÷; add -2.5 and 1.25; reset. | Results are 15, 9, 36, 4, and -1.25; reset restores 12 + 3. | Pass — live operation, decimal, and reset checks at both widths. |
| T125 | Calculator invalid input | Submit a missing value, divide 12 by 0, and multiply 1e308 by 1e308. | Missing input, division by zero, and overflow show errors rather than a misleading result. | Pass — all three live error paths at both widths. |
| T126 | Cart valid quantities and controls | Add cereal, use +/−, remove it, then add all 2 cereal/3 eggs/4 bread and Empty basket. | Stock and totals agree; limits disable exhausted stock; full basket is 9 items and $39.91; empty restores stock and $0.00. | Pass — live quantity, plus/minus, remove, stock-limit, full-total, and clear checks at both widths. |
| T127 | Cart invalid quantities | On an empty basket enter blank, 0, 1.5, and 3 for cereal, whose stock is 2. | Values are rejected, errors identify valid quantities, and total remains $0.00. | Pass — all four live invalid quantities at both widths. |
| T128 | Contact invalid input | Submit blanks, a malformed email, and a whitespace-only message. Try pasting beyond the visible field length limits. | Invalid values prevent draft creation and focus the first invalid field; maxlength limits input. | Not run for the complete case — blank/email/whitespace subchecks passed live at both widths; length-limit paste check remains pending. |
| T129 | Contact valid input and draft invalidation | Enter Test Visitor, visitor@example.org, and a message; Create email draft; inspect the prepared recipient, then edit the message. | A draft addressed to ss5764@njit.edu is prepared; editing removes the stale draft link; no sent-message claim appears. | Pass — live draft preparation/invalidation at both widths. External email-app handoff: Not run; no message was sent. |
| T130 | Project logic disclosures | Focus a Game/Sequence/Calculator/Cart logic summary and press Enter to open/close it. | Summary is keyboard-operable and its explanation becomes available. | Not run for the complete case — Game logic passed live at both widths; the other three disclosure activations remain pending. |
| T131 | Assets, names, and console | On each live page inspect Console/Network, image alt text, headings, and control labels; interact with the page. | No uncaught errors, missing visible images, unnamed controls, duplicate page h1, or unlabelled fields. | Not run for the complete manual review — automated error/image/h1/alt/control-name subchecks passed on all five live pages at both widths. |
| T132 | Reduced motion / animation | Enable reduced motion, reload and scroll Skills/Contact; then use normal motion and keyboard-focus content during entry. | Content remains available; reduced motion skips decorative effects; focused controls appear immediately. | Not run manually on the live site. Earlier local automated checks passed; do not treat them as this live result. |
| T133 | No-JavaScript fallback | Disable JavaScript temporarily; reload every live page and inspect navigation, content, project cards, and the direct email link. Restore JavaScript afterward. | Navigation/content remain available; all four project cards show; direct email link works; JavaScript-only draft control stays disabled. | Not run on the live site. Earlier local fallback checks are historical evidence only. |
| T134 | Lighthouse on every page | Follow the procedure below for all five live URLs, first Mobile then Desktop; save each report and score. | Accessibility is at least 90 on each page/configuration; reported failures are fixed and retested. | Mobile: Pass for the score target on all five pages; Projects label mismatch failed initially and passed after correction. Desktop: Not run. |
| T135 | Physical keyboard, zoom, and dark inspection | On every live page use your physical Tab/Shift+Tab, Enter, Space, arrows, and Escape; verify you can leave the loop; inspect both themes at 200% zoom. | Focus is visible and can escape to browser controls; inputs retain native keys; content stays readable and reachable with no clipped controls. | Not run — your manual submission check, separate from automated input. |
| T136 | Screen-reader check | With a screen reader, visit every page; inspect page/heading names, navigation/current-page state, field labels/errors, carousel status, and game announcements. | Labels and dynamic results make sense and hidden content is not announced as available controls. | Not run — manual check; a Lighthouse score does not replace it. |
| T138 | Additional direct-file check | Separately double-click local index.html, follow its page links, and inspect styles/scripts. Use the live HTTPS URLs above for submission/Lighthouse tests. | Local files remain usable without a server; submission audits use the published site. | Not run in this live preflight; earlier local checks remain in the history below. |
| T139 | Mobile reflow and horizontal panning | On every page test widths 280, 320, 360, 375, 390, 414, and 430px, then 568/667/844px landscape and a laptop regression. Inspect the navigation row and both themes; attempt horizontal page scrolling. | Content stays within both viewport edges and the page cannot scroll sideways at normal scale. | Pass — local and live emulation: 65 page/viewport/theme configurations, 470 layout states and 505 interaction assertions per run; no final overflow failures. |
| T141 | Long project content | Open all logic notes; generate 100 Fibonacci terms and an input error; inspect long calculator results/history, quantity errors, a full basket, carousel slides, and pass-and-play states. | Code wraps rather than requiring a horizontal scrollbar; values, explanations, and controls stay inside their containers. | Initial result: Fail — Fibonacci code overflowed its preformatted box at 320px/375px. Fixed in 99200af; all local and live state checks passed. |
| T142 | Contact errors, long fields, and short viewport | Submit blanks, then fill 70-character name, valid long email, and a 3,000-character unbroken message; prepare a draft. Focus Message with available viewport height reduced to 360px. | Errors and draft controls remain usable; long content does not widen the page; the focused textarea remains scrollable into view. | Pass — local and live touch-enabled emulation at all configured widths. Short-height emulation approximates available space; it does not reproduce a real on-screen keyboard. |
| T143 | Normal-motion mobile bounds | Enable normal motion; inspect navigation and sample game shake, reveal, and completed-round states at 280px, 320px, 390px, and 568px. | Animations do not push visible elements outside the horizontal viewport. | Pass — 20 additional live normal-motion layout samples; no overflow. |
| T144 | Physical phone/browser check | On an actual iPhone/Safari and Android/Chrome, open every page in portrait/landscape, use the header links and project/form controls, open the keyboard, and try sideways dragging. | No unintended horizontal page scrolling or clipped controls; zoom and native text editing still work. | Not run — emulation does not establish results for physical devices or Safari. Record your device/browser and actual outcome here. |

### Navigation coverage matrix

Each cell was activated with native Enter from the source page on the live site
at **both 390px and 1366px**. This earlier live matrix used the dropdown. The new row is checked in T145.
Each cell represents two passing activations (50 total).

| Source page | Home | About me | Projects | Skills | Contact |
| --- | --- | --- | --- | --- | --- |
| Home | Pass | Pass | Pass | Pass | Pass |
| About | Pass | Pass | Pass | Pass | Pass |
| Projects | Pass | Pass | Pass | Pass | Pass |
| Skills | Pass | Pass | Pass | Pass | Pass |
| Contact | Pass | Pass | Pass | Pass | Pass |

Brand/CTA/demo-anchor coverage is recorded separately under T113.

### Lighthouse procedure for your test session

1. Use Chrome with extensions disabled (an Incognito window is convenient).
   Open a live URL from the table above.
2. Press F12, open **Lighthouse**, and choose **Navigation** mode.
3. Choose **Mobile** and **Accessibility**. You may also select Performance,
   Best Practices, and SEO. Use the same settings for comparable runs.
4. Leave **Clear storage** enabled for the baseline first-visit audit. This
   resets saved theme choices, so the baseline should be light mode.
5. Run the page-load audit. Save the actual report and a score screenshot to
   [reports/lighthouse](reports/lighthouse/README.md); record the version/date/settings.
6. Repeat using **Desktop**, then repeat for the other four pages. Mark
   Accessibility ≥90 as Pass, below 90 as Fail; retain failed reports and retests.

For extra state checks, inspect dark mode, an open menu, carousel slides, and
contact errors separately. Navigation audits reload the page; Snapshot can audit
the current state. Do not change the site merely to hide findings.

References: [Chrome's Lighthouse guide](https://developer.chrome.com/docs/devtools/lighthouse)
and [accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring).
Automated scores exclude some manual checks and do not prove full accessibility.

### Lighthouse results — complete these from saved reports

Arrows show before -> after. A dash means no score was measured. Do not enter an expected/estimated score.
Use the optional score columns only if those categories were included.

| Audit ID | Page / device | Accessibility | Performance | Best Practices | SEO | Actual result | Report / date / Chrome and Lighthouse versions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LH01 | Home / Mobile | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 | Pass — Accessibility >=90 in both runs. | [Before](reports/lighthouse/home-before.json) 19:53:41; [After](reports/lighthouse/home-after.json) 20:38:22 EST, 2026-11-08; Chrome 156.0.0.0 / LH 13.5.0; settings above. |
| LH02 | Home / Desktop | — | — | — | — | Not run | — |
| LH03 | About / Mobile | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 | Pass — Accessibility >=90 in both runs. | [Before](reports/lighthouse/about-before.json) 19:57:27; [After](reports/lighthouse/about-after.json) 20:39:25 EST, 2026-11-08; Chrome 156.0.0.0 / LH 13.5.0; settings above. |
| LH04 | About / Desktop | — | — | — | — | Not run | — |
| LH05 | Projects / Mobile | 100 -> 100 | 98 -> 100 | 100 -> 100 | 100 -> 100 | Pass — Accessibility >=90 in both runs; label mismatch initially Fail, after Pass. | [Before](reports/lighthouse/projects-before.json) 19:58:21; [After](reports/lighthouse/projects-after.json) 20:41:00 EST, 2026-11-08; Chrome 156.0.0.0 / LH 13.5.0; settings above. |
| LH06 | Projects / Desktop | — | — | — | — | Not run | — |
| LH07 | Skills / Mobile | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 | Pass — Accessibility >=90 in both runs. | [Before](reports/lighthouse/skills-before.json) 19:58:55; [After](reports/lighthouse/skills-after.json) 20:41:27 EST, 2026-11-08; Chrome 156.0.0.0 / LH 13.5.0; settings above. |
| LH08 | Skills / Desktop | — | — | — | — | Not run | — |
| LH09 | Contact / Mobile | 100 -> 100 | 100 -> 100 | 100 -> 100 | 100 -> 100 | Pass — Accessibility >=90 in both runs. | [Before](reports/lighthouse/contact-before.json) 19:59:17; [After](reports/lighthouse/contact-after.json) 20:42:38 EST, 2026-11-08; Chrome 156.0.0.0 / LH 13.5.0; settings above. |
| LH10 | Contact / Desktop | — | — | — | — | Not run | — |

### Retired dropdown cases

These results belong to the earlier dropdown implementation. Keep them as
history; use T145–T150 for the new navigation row.

| ID | Testing | Steps to run | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T115 | Mobile menu | On every page at phone width, press Enter on Menu, inspect expanded state, then Escape; reopen and select a page. | Menu opens with all five links, expanded state is accurate, Escape returns focus, and page selection works. | Pass — live native input on all five pages. |
| T137 | Menu visible/accessibility label match | At phone width inspect the Menu name in the accessibility tree, open it with Enter, then close with Escape on every page. | Accessible name includes the visible word Menu; expanded state and focus return work. | Initial live result: Fail on all five pages (name was Open navigation). Corrected in 123049d; 20 local and 20 live retest assertions passed on all five pages. |
| T140 | Narrow mobile menu and touch navigation | Open Menu on every page at narrow widths; inspect its left/right edges, tap the current-page link, then reopen using Enter and close with Escape. Repeat with short landscape heights. | Popup stays inside the screen, links remain reachable, touch selection closes it, and keyboard focus returns correctly. | Initial result: Fail — menu extended about 26px left at 320px and 11px at 375px. Fixed in 99200af; all local and live retests passed. |

### Evidence and retests

- [Live page/feature and primary-navigation results](reports/live-preflight-2026-11-07.json).
- [Additional input, full-match, and content-link results](reports/live-feature-preflight-2026-11-07.json).
- [Source, metadata, relative-link, and image-size preflight](reports/source-preflight-2026-11-07.json).
- Live screenshots: `screenshots/live-preflight-{index,about,projects,skills,contact}-{390,1366}.png`.
- Historical local screenshots/results remain in `screenshots/`; their filenames
  identify earlier revisions and are not presented as live Lighthouse evidence.
- [Menu label failure before correction](reports/menu-label-before-2026-11-07.json) and
  [local correction retest](reports/menu-label-local-retest-2026-11-07.json) are
  retained for T137. The [published retest](reports/menu-label-live-retest-2026-11-07.json)
  passed on all five pages after deployment.
- An initial preflight stopped because of temporary test-runner quoting.
  [Its incomplete record](reports/live-preflight-incomplete-2026-11-07.json) is
  retained; corrected complete runs above passed. This was a runner error,
  not a recorded website failure.

For every failure, append a row rather than replacing the first attempt:

| Date / test ID / URL / viewport | Initial result and issue | Fix / commit | Retest result | Evidence filename |
| --- | --- | --- | --- | --- |
| 2026-11-07 / T137 / all five live pages / 390px | Fail — visible Menu had accessible name Open navigation | 123049d: use native visible label; retain aria-expanded | Pass — 20 local and 20 live retest checks on all five pages | reports/menu-label-before-2026-11-07.json; reports/menu-label-local-retest-2026-11-07.json; reports/menu-label-live-retest-2026-11-07.json |
| 2026-11-08 / T140 / all pages / 320px and 375px | Fail — open popup left edge was outside the viewport | 99200af: anchor popup to full header | Pass — local and live mobile regressions | reports/mobile-overflow-before-2026-11-08.json; reports/mobile-overflow-live-2026-11-08.json |
| 2026-11-08 / T141 / Projects / 320px and 375px | Fail — code example required horizontal scrolling | 99200af: wrap preformatted content | Pass — local and live code states | reports/mobile-overflow-before-2026-11-08.json; reports/mobile-overflow-live-2026-11-08.json |

Before submission, complete all pending rows, preserve the initial and retest
reports, and rerun affected checks after any website change. Record a final
pass/fail for each case and a Lighthouse score for every page.


## Mobile viewport follow-up — November 8, 2026

The owner requested reliable mobile layouts without sideways scrolling.
The menu was anchored to its small button wrapper, allowing its left edge to
leave narrow viewports even when the document's scrollWidth did not grow.
That deployed fix anchored the dropdown to the full header; the latest local
revision supersedes it with the permanent navigation row. Its height also fits short landscape
viewports. The Fibonacci notebook excerpt now soft-wraps long lines instead of
using its own horizontal scrollbar. No page-wide overflow hiding was added.

The baseline diagnostics recorded **14 failed states out of 36**: menu position
at 320px/375px across all five pages, plus open code-content states on Projects.
The diagnostic was refined to exclude unpainted content inside closed details;
the retained baseline uses that corrected visibility check. This corrects the
limitation of earlier tests that checked only positive document width and could
miss content hanging off the left edge.

Both local and published-site retests passed **65 configurations**, each with
**470 layout states and 505 behavior assertions**. They cover all five pages
in light mode at 280×653, 320×568, 360×640, 375×667, 390×844, 414×896, 430×932,
568×320, 667×375, 844×390, and 1366×900; all five pages also run in dark mode at
320×740 and 390×740. Mobile configurations use Chrome touch emulation at device
pixel ratio 2. Laptop uses desktop emulation at pixel ratio 1.

Geometry checks inspect document width, actual element bounds on both edges,
horizontal page-panning range, and component scroll widths. They run with open
menus, all carousel slides, open notes, 100 exact Fibonacci terms, long
calculator results, errors, a full cart, hidden-choice handoff/result states,
long contact fields, and shortened textarea viewports. Real emulated touch taps
exercise Menu, links, carousel controls, and form actions. Native Enter/Escape
checks retain keyboard support. No mail app is opened or message sent.

These broad functional/layout runs use reduced motion for stable capture.
Another **20 live normal-motion samples** check the menu and game shake/reveal
states at four narrow widths. All passed. This is a browser-emulation result,
not proof of every physical device/browser combination. Physical iPhone/Safari,
Android hardware, actual on-screen-keyboard, and Lighthouse runs remain manual.

The website fix is deployed in `99200af`. Evidence:

- [Baseline failures](reports/mobile-overflow-before-2026-11-08.json).
- [Local regression](reports/mobile-overflow-local-2026-11-08.json).
- [Live regression](reports/mobile-overflow-live-2026-11-08.json).
- [Live normal-motion checks](reports/mobile-motion-live-2026-11-08.json).
- [Relative links, asset versions, and image-size checks](reports/mobile-source-2026-11-08.json).
- Before/after menu: `screenshots/mobile-overflow-menu-before.png`,
  `mobile-overflow-menu-after.png`, and `mobile-overflow-menu-live-after.png`.
- Earlier deployed phone captures: `screenshots/mobile-fit-live-{index,about,projects,skills,contact}-390.png`
  and `screenshots/mobile-fit-live-code-320.png`.

Use the current deployed revision when running Lighthouse and retain any
initial failed report alongside its retest. No Lighthouse score is inferred
from these layout checks.

## Historical test record

The dated records below preserve earlier checks and mistakes. Expectations about
Home's My studies/index, clickable filters, a disabled-only contact form, a footer
keyboard toggle, or repeating reveals were superseded by owner requests.
Use the current plan above when testing the current site.

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

## Keyboard, contact form, carousel, and monogram — 2026-11-07

The owner requested removal of the Home project index and clickable category
filters, default-on keyboard cycling without a footer toggle, arrow-key control
navigation, a message form with validation, a project image carousel, an SS
header/favicon mark, and a slightly slower page transition. These requests
supersede the earlier Home index, category-filter, and visual-only-contact rules.
The separate five-page structure and all four working demonstrations remain.

Final browser verification passed **758 assertions across 22 configurations**:
all five pages at 320px, 390px, and 1366px in light mode; all five at 1366px in
saved dark mode; and Projects/Contact at 320px in saved dark mode. Tests open the
original HTML files directly in installed Chrome. Native DevTools input delivers
Tab, Shift+Tab, all four arrows, Enter, Escape, Home, and End; DOM assertions check
layout and valid/invalid data. Old saved keyboard-off preferences are deliberately
seeded before loading every page. Cycling still starts enabled.

Evidence is in `screenshots/interaction-browser-checks.json`. The initial phone
pass is retained there, followed by final phone retests after a compact-header
adjustment. Supplemental checks passed **16 assertions**: 560ms normal entry,
instant visibility for focused content, reduced-motion behavior, three repeated
phone/laptop focus transitions, accessible control names on every page from
Chrome's accessibility tree, and no-JavaScript navigation/contact fallbacks.
These are automated local browser checks, not physical keyboard, screen-reader,
Lighthouse, or live-site audit results.

The contact form checks required/whitespace-only values, email syntax, and input
lengths. A valid form creates an encoded mailto draft link addressed to the
existing public email. Editing any field removes that link. The tests verify
recipient, subject, and multiline body without opening an external email app.
No contact content is stored, submitted to a server, or automatically sent.
Actual mail-app handoff and delivery remain under the visitor's control and were
not exercised by automation.

Static verification resolves **79 relative file/fragment references**, confirms
one external stylesheet and one h1 per page, checks version hashes, and finds no
inline styles or event handlers. All seven site images are SVGs below 500 KB;
the largest is 2,300 bytes and the monogram is 337 bytes. All images have alt
attributes; decorative header/game images use empty alt text. New controls use
the existing palette: conservative light-gradient contrast is at least 16.09:1
for primary text, 6.69:1 for secondary text, and 4.08:1 for essential outlines.
Dark secondary text remains at least 8.02:1. These values are contrast bounds,
not an accessibility audit score.

Actual phone/laptop captures are `screenshots/interaction-*.png`, including
Contact's complete form and narrow/desktop dark views. Reduced motion stabilizes
screenshots. The corrected 320px header uses a smaller monogram/name and compact
controls to stay on one row even with a scrollbar. Its earlier wrapped capture
is retained as `interaction-projects-320-header-before.png`.

Challenges and corrections:

- The first test runner stalled while serializing PowerShell provider metadata
  attached to Get-Content strings. Reading JavaScript through .NET as plain text
  corrected the runner. A later browser connection closed during a long run;
  short isolated batches with incremental results completed all 22 configurations.
  No result from an incomplete run is treated as a complete pass.
- The initial contact draft assertion expected literal backslash-n characters
  instead of actual newline characters. The website's encoded draft was correct;
  correcting the expectation passes. The failed fixture result is retained in
  `interaction-contact-initial-checks.json`.
- The initial compact-header layout wrapped the theme button at 320px when a
  scrollbar reduced available width. Visual review caught this real layout
  mistake. Header sizing was corrected and all 12 phone configurations retested,
  including a new one-row geometry assertion.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T93 | Home and filter removal | Load Home and Projects; inspect the DOM and phone/laptop captures. | Home has no project index/cards; category filter buttons are absent; all four labs remain on Projects. | Pass — all tested configurations. |
| T94 | Default-on Tab cycling | Seed the previous saved off preference; load every page; use native Tab/Shift+Tab and wrap from the last/first control. | Cycling starts enabled every time; hidden slides/menu links and disabled controls are skipped; no footer toggle remains. | Pass — native keyboard checks in all 22 configurations. |
| T95 | Arrow-key control navigation | Focus the brand and use Down/Up/Right/Left; use Down inside the mobile menu; focus the page background and use Down where the page can scroll. | Focus moves in both directions; menu links work; background arrows scroll long pages. | Pass — native keys and scroll/focus assertions. |
| T96 | Native editing and Escape | Move the caret in a contact field with Right; use Escape with the mobile menu open and with it closed. | Caret keys retain native behavior; Escape closes/returns menu focus or releases Tab for the current page. | Pass — native input and event-default checks; screen-reader navigation Not run. |
| T97 | Manual project image carousel | Use native Right, Home, End, and Enter on Previous/Next; wrap through first/last slides. | Exactly one active slide, accurate status, focused links stay visible, all four projects accessible; no autoplay. | Pass — all five Projects configurations. |
| T98 | Invalid contact input | Submit blank values, malformed email, a whitespace-only message, and an overlength name. | Clear field errors, first invalid field focused, no draft link available. | Pass — all five Contact configurations. |
| T99 | Valid contact draft | Enter valid name/email and a multiline message with reserved characters; prepare the draft; edit a field. | Correct recipient and encoded content; draft link receives focus; editing removes stale draft. | Pass — corrected newline expectation; external email-app handoff/delivery Not run. |
| T100 | SS monogram and favicon | Load all pages; inspect the header image, icon link, local SVG, and light/dark screenshots. | Original SS mark beside the name and an SVG favicon on every page; decorative header image has empty alt text. | Pass — source/browser loading checks and visual review; browser chrome tab screenshot not captured. |
| T101 | Responsive layout and consistency | View every page at 320px, 390px, and 1366px; inspect the shared stylesheet, fonts, and header geometry. | One stylesheet, responsive media queries, consistent colors/type, no horizontal scrolling, header controls on one row. | Pass — 15 light configurations plus narrow dark retests; initial header wrap corrected. |
| T102 | Contrast, image sizes, and names | Inspect alt attributes, image sizes, contrast bounds, and Chrome's accessibility tree on every page. | Images under 500 KB, appropriate alt text, readable text/controls, no unnamed interactive controls. | Pass — all seven images, source bounds, and five accessibility-tree checks. |
| T103 | Entry speed and reduced motion | Load Home with normal motion, focus its CTA, then load Skills with reduced motion. | 560ms page entry; focused content immediately visible; reduced motion skips animation/hiding. | Pass — supplemental browser checks. |
| T104 | Offline behavior, errors, and project regression | Open original local files, exercise all demos, check uncaught errors, then disable JavaScript for Projects/Contact. | Working demos, no new uncaught errors, valid relative assets, visible fallback project cards/nav and email link. | Pass — browser and source checks; full historical project edge-case suite not repeated. |
| T105 | Publication and full accessibility audit | After review and approved push, run the complete live plan, physical keyboard, screen reader, and Lighthouse on all pages. | Published behavior matches local files and Accessibility score reaches at least 90. | Full live audit Not run — physical keyboard, screen-reader, and Lighthouse checks remain pending; deployment/source verification is separate. |

Earlier tests describe earlier revisions. The former filter, Home-index, and
footer-toggle expectations are superseded by this owner-requested follow-up.

## Contact email hierarchy — 2026-11-07

The owner requested a smaller email link so the message form is the visual
priority. The address now uses 16px system text and the existing secondary color,
with a compact inline Email label and less vertical spacing. The link retains
a 44px hit area, its original mailto destination, and visible keyboard focus.
The stylesheet version was refreshed across all five pages; JavaScript is unchanged.

All 48 focused assertions passed in local Chrome: Contact at 320px, 390px, and
1366px in light mode, plus 1366px in saved dark mode. Native Tab, Shift+Tab,
ArrowDown, and Enter verify focus flow and an invalid-form smoke check. Direct
local Home loading also passed. Phone/laptop screenshots were visually reviewed.
Evidence: `screenshots/contact-hierarchy-checks.json` and matching PNG captures.
This is a focused local check, not a repeat of the full live-site or Lighthouse audit.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T106 | Contact email and form hierarchy | Open local Contact at 320px/390px/1366px and saved dark 1366px; compare email and form heading sizes, inspect the compact row, use Tab/Shift+Tab/Down, and activate Create email draft with blank fields. | Email is secondary 16px text, form heading is larger, no overflow, original email destination and 44px hit area remain, keyboard focus is visible, and validation still focuses Name. | Pass — 48 local native-browser/DOM assertions and visual phone/laptop review; direct local Home check also passed. Published revision, physical keyboard, screen-reader, and Lighthouse retests Not run for this change. |

## Smaller Contact heading — 2026-11-07

The owner also requested a smaller Contact title and publication of the compact
email change. The page title now scales from 32px to 40px; the email remains 16px.
All 36 focused Chrome assertions passed at 320px, 390px, and 1366px in light mode,
plus 1366px in saved dark mode. Checks cover type sizes, compact spacing, overflow,
image loading, the email destination, native Tab into the form, invalid-form
focus, and uncaught errors. Phone/laptop captures were visually reviewed.
Evidence: `screenshots/contact-compact-checks.json` and matching PNG captures.

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T107 | Contact heading size | Open local Contact at phone/laptop widths and saved dark mode; inspect heading/email sizes and use Tab/Enter to reach and validate the form. | Contact title is 32–40px, email is 16px, form remains prominent and usable, and no layout or script errors occur. | Pass — 36 local Chrome assertions and visual review. Full live accessibility/Lighthouse audit remains pending; deployment/source verification is separate. |
