# Portfolio security and offline storage

Local implementation reviewed 15 October 2026. This is a technical baseline,
not a legal compliance assessment. Hosting logs and provider retention are separate.

## Browser protections

`next.config.ts` applies security headers to pages, static files and error responses:

- Content Security Policy restricts resources and connections to the same origin;
  blocks framing, plugin objects, base tags, forms and embedded frames.
- `X-Frame-Options: DENY` provides additional framing protection.
- `X-Content-Type-Options: nosniff` prevents MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin` sends only the origin to
  other sites, and no referrer on HTTPS-to-HTTP navigation.
- Permissions Policy disables camera, microphone, location, payments and USB.
- The Next.js identifying header is disabled. This does not hide the framework.
- `/sw.js` is served with `no-store` so browsers check for updated worker code.

The CSP allows inline scripts/styles to preserve static Next.js hydration and
existing styling. It is a baseline, not strict XSS protection. No production
`unsafe-eval` or external script origins are allowed. Development adds eval and
WebSocket support for debugging/hot reload. A future nonce policy needs a separate
rendering/caching design. See the [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy).

HSTS is left to the HTTPS hosting configuration; verify it after deployment.
Local HTTP remains usable. New analytics, embeds, forms or APIs require reviewing
both CSP and data collection before enabling them.

## Offline storage

The production-only service worker uses `seto-portfolio-v2`:

- Only known public portfolio routes and local static assets are saved.
- External sites, APIs, RSC payloads, query-string requests, errors, and responses
  marked `private` or `no-store` are excluded from storage.
- Entries expire seven days after being saved. Reading a cached asset does not
  extend its age; a successful network refresh of a page does.
- Expired entries are removed during activation or an eligible request, before
  they can be served offline. Browsers cannot run deletion while closed/inactive;
  expiry prevents reuse after the deadline but is not a wall-clock deletion job.
- At most 40 entries, each at most 2 MiB, are stored (up to about 80 MiB of response
  bodies, plus browser overhead). Oldest saved entries are evicted first.
- Old portfolio cache versions are deleted when the new worker activates.
- The footer button clears all portfolio service-worker caches and reports
  success/failure. It leaves unrelated caches and normal browser HTTP caching
  alone. Browsers also provide a broader site-data clearing option.
- Saving resumes on subsequent visits/eligible requests, including in other open
  tabs. Clearing is not a persistent opt-out. The offline fallback is restored on
  the next successful visit to a known public page.
- New workers wait for older controlled tabs to close. Close all tabs for this
  origin and reopen after an update, or use DevTools to update/unregister the worker.

These limits describe public content cached on the visitor's device, not hosting
logs, user submissions, or GDPR retention of personal records. No new visitor
identifiers or server database were added.

## Dependency checks

Next.js and eslint-config-next were updated from 16.4.0 to 16.4.1 using npm;
`package-lock.json` is the single lockfile used locally, in CI, and on Vercel.
The stale pnpm lockfile was removed after Vercel selected it and rejected the
16.4.1 dependency specifiers. `vercel.json` explicitly installs with `npm ci`.

```sh
npm run security:audit       # production dependencies; also runs in CI
npm run security:audit:all   # includes build/lint/test tooling
```

On 15 October 2026, the production audit reported zero known vulnerabilities.
The full audit reported five high-severity package findings from one development
chain: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch →
braces. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
affects braces up to 3.0.3, and the registry had no patched release. The current
lint dependency remains affected after the patch update. No suppression or forced
framework downgrade was applied. Recheck when upstream publishes a fix. Existing
Dependabot updates and scheduled CI remain enabled; production audit failures
now fail CI. The full tooling audit remains an explicit separate check.

## Test locally before committing

Use the production server to exercise the service worker:

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Open http://127.0.0.1:3000 (service workers work on localhost/loopback).

1. Check all three languages and their case-study navigation. The footer should
   show the localized clear-data button after JavaScript loads.
2. In DevTools → Network, inspect a document response for the headers above.
   Check Console for CSP errors. Test any preview tooling separately on deployment.
3. In Application → Service Workers, wait for the worker to activate, then reload.
   In Cache Storage, inspect `seto-portfolio-v2` and its cached-at response headers.
4. Use Network → Offline, then reload a visited page. Visit an unvisited public
   page to see the multilingual offline fallback. Turn Offline off afterwards.
5. Click “Clear offline data”. Confirm the success message and portfolio caches
   disappearing. Another navigation can populate them again. Test the German and
   Indonesian labels too. The button does not erase the page currently displayed.
6. For automated expiry, entry-limit, query exclusion, CSP and clearing checks:

```sh
npm test
```

Playwright starts its own production server on port 4187. No commit or push is
needed for any of these checks. `npm run dev` intentionally does not register the
service worker and does not show the offline-data control.
