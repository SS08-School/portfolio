# Website test plan

The Home page is implemented. The remaining pages and project filtering are
planned for later tasks. Run these cases on the live GitHub Pages site before
submission, recording its URL, browser, viewport, and test date. For cases
covering multiple pages, record a separate result for each page as it is added.

No browser or live-site results have been recorded yet. "Not run" is a pending
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
  keyboard behavior, console checks, direct-file behavior, live deployment,
  and Lighthouse remain unverified.

## Browser and live-site cases

| ID | Testing | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| T1 | Home navigation | Activate the brand and every Home navigation link. | Home opens; My studies reaches the studies section. | Not run |
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
| T15 | Contact | Once implemented, activate the email link. If a form is added, test empty, invalid, and valid inputs. | Email link opens an email application when configured; form errors are clear; no false sent-message confirmation. | Not run; Contact page pending |
| T16 | Zoom and reduced motion | On each page, use 200% browser zoom and enable reduced motion in the OS. | Content stays readable and reachable; nonessential motion is disabled. | Not run |
