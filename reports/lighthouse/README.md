# Lighthouse reports

Save your actual exported Lighthouse reports and score screenshots in this folder.
No audit has been run or passed merely because this folder exists.

Use filenames such as:

- `2026-11-07-home-mobile-run1.html`
- `2026-11-07-home-desktop-run1.html`
- `2026-11-07-projects-mobile-run1.json`
- `2026-11-07-contact-mobile-run1-score.png`

Replace the date/page/device with the real run details. HTML is useful for review;
JSON is useful for investigating findings. Keep initial failing reports and add
`run2`, `run3`, etc. for retests; do not overwrite the first result.

After saving a report, fill its row in [TESTING.md](../../TESTING.md) with the
actual Accessibility score, Pass/Fail, report path, date, Chrome/Lighthouse
versions, and selected settings. The target is Accessibility ≥90 on every page.
Other category scores have no invented pass threshold.

The current test plan lists all five live URLs and ten Mobile/Desktop audit rows.
The live functional-preflight JSON files in the parent directory are browser
checks, not Lighthouse reports.
