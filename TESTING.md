# Website test plan

The Home, Skills, and visual-only Contact pages are implemented. About,
Projects, and project filtering are planned for later tasks.
Run these cases on the live GitHub Pages site before
submission, recording its URL, browser, viewport, and test date. For cases
covering multiple pages, record a separate result for each page as it is added.

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

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T1 | Existing-page navigation | On Home, Skills, and Contact, activate the brand and every navigation link. | Home, Skills, and Contact open; My studies reaches the Home studies section; the current page is identified. | Not run |
| T2 | All-page navigation | Once all five pages exist, activate every navigation link on every page. | Each destination loads with the correct current-page indicator. | Not run; remaining pages pending |
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
| T15 | Visual contact form | On Contact, try empty fields, an invalid email, and valid sample values. Press Enter in each input and attempt to activate Send. Repeat with JavaScript disabled. Inspect the network panel. | Fields are labeled and editable; Send stays disabled; no validation, submission request, navigation, or sent-message confirmation occurs. Enter in the message field adds a line break. | Not run |
| T16 | Zoom and reduced motion | On each page, use 200% browser zoom and enable reduced motion in the OS. | Content stays readable and reachable; nonessential motion is disabled. | Not run |
