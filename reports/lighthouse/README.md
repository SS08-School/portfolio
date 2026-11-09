# Lighthouse reports

## Saved assignment exports - November 8, 2026

These are the actual live Mobile Navigation reports supplied by the owner.
Every after report scores 100 in Performance, Accessibility, Best Practices,
and SEO. Projects Performance changed from 98 to 100, and its Fibonacci
visible-label/name audit changed from Fail to Pass. Full comparisons, settings,
limitations, and pending Desktop/manual tests are in [TESTING.md](../../TESTING.md).

| Page | Before | After |
| --- | --- | --- |
| Home | [home-before.json](home-before.json) | [home-after.json](home-after.json) |
| About | [about-before.json](about-before.json) | [about-after.json](about-after.json) |
| Projects | [projects-before.json](projects-before.json) | [projects-after.json](projects-after.json) |
| Skills | [skills-before.json](skills-before.json) | [skills-after.json](skills-after.json) |
| Contact | [contact-before.json](contact-before.json) | [contact-after.json](contact-after.json) |

Only the missing .json extensions were added; SHA-256 checks verified the
export contents were unchanged. The dates are November 8 in America/New_York;
the JSON fetchTime values use November 9 UTC. Do not overwrite the original
before reports. No Desktop audit or new score screenshot is claimed here.

## Saving additional reports

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
