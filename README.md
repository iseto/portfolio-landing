# Ignatius Seto — living portfolio

Next.js, React and TypeScript portfolio with English (`/`), German (`/de`), and Bahasa Indonesia (`/id`) pages, localized case studies, a dated Now section, engineering notes, and a public Template Editor roadmap. Source and demo links remain in `data/projects.json`; localized copy and project context live in `data/portfolio.ts`; dated engineering notes are assembled in `data/notes.ts`.

## Local development

Use Node.js 22 or newer and npm. `package-lock.json` is the single dependency lockfile for local development, CI, and Vercel. `vercel.json` explicitly uses `npm ci` and `npm run build`; do not add competing package-manager lockfiles.

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run lint
npm run type-check
npm run build
npx playwright install chromium
npm test
npm run check:links
```

Browser tests start the production server after building. They cover all three languages and all case studies on desktop and mobile Chromium: document language, canonical URL, single main/h1, automated accessibility rules, overflow, internal paths/anchors, locale switching, keyboard skip link and reduced motion. These checks are not a manual screen reader audit or a full accessibility conformance assessment. JSON/HTML reports and axe rule results are saved on every run, with traces/screenshots on failure. Reports include incomplete findings needing human review.

CI runs lint, TypeScript, build and browser regression checks on main pushes, PRs, and weekly schedules. Dependabot proposes weekly npm and GitHub Actions updates on Mondays at 06:00 Europe/Berlin; it does not merge them automatically. Dependabot alerts and security updates were enabled in repository settings on 20 October 2026, along with the required dependency graph. Security fix PRs are triggered by advisories independently of the weekly version-update schedule.

A daily 06:23 UTC workflow audits production and development dependencies from the lockfile. It saves JSON and Markdown reports for 30 days and fails on new/changed findings (including newly available fixes) or audit errors. Unchanged findings remain visible in the summary without repeated failures. A cached baseline tracks the previous completed audit; the first run or cache eviction can report existing findings again. The production audit in PR CI remains a separate blocking check. A separate Monday 07:00 UTC workflow checks external links, with bounded requests and a retry. Authentication/bot/rate-limit responses require manual review; other unsuccessful responses or repeated network failures fail the check. JSON reports are retained as workflow artifacts. Manual workflow dispatch is available. GitHub schedules become active on the default branch; notifications follow GitHub account settings.

## Content maintenance

- Update project URLs in `data/projects.json` and localized descriptions in `data/portfolio.ts`.
- Keep all three languages synchronized. Language links preserve the current case study.
- Real screenshots in `public/screenshots/` show local development versions captured on 14 October 2026. The deployed app demos may differ. Recapture them after UI updates; do not imply the screenshots establish accessibility.
- Change `reviewed` only after reviewing Now. Add dated note records separately when future notes are published; do not rewrite the historical first note date.
- Keep planned features and unverified outcomes clearly labeled. Publish measured evidence after the work happens.
- Check [the milestone plan](docs/MILESTONES.md) and use [the accessibility report template](docs/ACCESSIBILITY-REPORT.md) for the separate Template Editor project.

The dead Blog link was removed from navigation; GitHub and LinkedIn remain. The external checker discovers links from rendered pages, including all locales and report links. Set `CHECK_BASE_URL=http://127.0.0.1:4174` to inspect a local production preview. No private email, résumé, production outcome, audit result or AI evaluation is invented. Deployment is not part of this local change.

## Accessibility evidence and PWA

`/accessibility`, `/de/accessibility`, and `/id/accessibility` explain automated coverage, the real workflow history, dated observations, outstanding manual review, and feedback channels. The downloadable report template records scope, revision, individual criteria/tasks, findings and retest evidence. No automated result is presented as certification.

The portfolio has an install manifest and production-only service worker. Visited same-origin pages/assets are cached; uncached offline routes show a multilingual fallback. External demos are not cached. No automatic install prompt, notifications or background API work. Bump the service-worker cache version when changing offline behavior; new workers wait for old tabs to close. Browser installation availability depends on platform and HTTPS (localhost is supported).

This change edits only the portfolio repository; linked app source repositories were inspected and screenshotted without modifying their source.

## Security and offline controls

See [security notes and local test steps](docs/SECURITY.md) for security headers,
seven-day offline cache expiry, storage limits, the localized clear-data button,
and the remaining development dependency advisory. `npm run security:audit` checks
production dependencies and runs in CI; `npm run security:audit:all` includes tooling.
