# Portfolio verification — 14 October 2026

Local verification of this portfolio update, before deployment.

- ESLint: passed.
- TypeScript: passed.
- Production build: passed; three homepages, nine localized project pages, and three accessibility-report pages generated.
- Playwright Chromium: 75 passed, one intentional skip (physical-keyboard behavior under mobile emulation).
- Automated accessibility rules: no violations reported across fifteen pages in desktop/mobile configurations for the selected WCAG A/AA tags. This does not establish full conformance.
- Regression coverage: document language, canonical paths, one main and h1, internal destinations and fragment targets, overflow, case-study locale switching, keyboard skip link, aligned language controls and tap sizes, 320px reflow with custom text spacing, reduced motion, and service-worker offline behavior.
- Visual review: English desktop full page and German mobile homepage at 390px width.
- Manual screen reader audit: pending; not claimed as completed.
- External demos and repositories: HTTP 200 during the local link check.
- Blog: `blog.iseto.com` did not resolve from this environment. Review DNS before relying on this contact path.
- LinkedIn: HTTP 999; provider blocked the automated request. Requires manual review.
- Production dependency audit: zero advisories after updates. Five high advisories remain in the development-only ESLint dependency chain involving braces/micromatch/fast-glob. The reported automated remedy downgrades the Next.js lint configuration; it was not applied.

Next.js and eslint-config-next were aligned at 16.4.0. Existing Blog and baseline-browser-mapping additions were retained. Both npm and pnpm lockfiles were updated. No deployment, external publishing, or Template Editor changes were performed.

## Follow-up changes in this release

Added Bahasa Indonesia on every portfolio page, fixed the language separator alignment and 44px language targets, and fixed German reflow under custom text spacing. Added the public localized accessibility report, expanded downloadable audit template, weekly evidence workflow with always-retained reports, and an install manifest plus offline behavior for visited pages.

Captured real screenshots from existing local app previews, without editing the apps. Captions distinguish local development versions from deployed demos. The modernized Weather repository returned public HTTP 404; the public earlier-source link is retained and explicitly labeled. The dead Blog link is removed. LinkedIn's HTTP 999 remains a manual-review requirement.

## Atmos link correction — 15 October 2026

The weather entry still linked to the earlier `iseto/react-weather-app` repository and GitHub Pages demo. Vercel's production project confirms Atmos is deployed at `https://react-typescript-weather-app-one.vercel.app`; the similarly named address without `-one` serves the old Create React App build. Updated the shared project record and all three localized descriptions to match Atmos. The current source is `iseto/react-typescript-weather-app`, which is private (anonymous requests return 404), so the public pages display a localized private-repository label instead of a broken source link. Repository visibility is unchanged.

Validation: portfolio lint, TypeScript and production build passed; browser suite passed 81 checks with the expected mobile keyboard skip. Atmos lint, 15 unit tests, production build and all 16 desktop/mobile browser tests passed. The Atmos production deployment was refreshed from its existing committed revision `c316205`.
