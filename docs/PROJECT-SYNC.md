# Project synchronization

The landing page is connected to these public repositories:

- `iseto/dynamischer-template-editor`
- `iseto/wc-cineflix`
- `iseto/react-typescript-weather-app`

Each provides a root `portfolio.json` with `version: 1`, a `title`, a `stack` array, and `descriptions.en`, `descriptions.de`, and `descriptions.id`. Edit this file as part of a user-facing feature release. Use plain text; the landing page renders descriptions as text. Keep all three translations current. Update the GitHub repository website setting when moving the demo.

## Automatic publication

`.github/workflows/sync-projects.yml` runs at minute 17 of every hour (UTC), or through **Run workflow** in GitHub Actions. Scheduled runs may be delayed by GitHub. It fetches manifests from each repository's default branch, takes the repository website as the demo URL (falling back to the existing URL when empty), checks public source availability and live demo HTTP responses, and records the latest default-branch commit date. This date describes source activity, not deployment or a manual review. A code-only update changes the date; user-facing descriptions change when the manifest changes.

All manifests must validate and all project links must pass before any data is written. API failures, missing translations, private/archived repositories, blocked demo checks and broken links stop publication. Reports and workflow failures remain available in GitHub Actions. Existing published data stays in place. A future private repository requires an intentional listing/access change; private metadata is never automatically published.

When content changes, the workflow runs maintenance tests, lint, TypeScript, a production build, desktop/mobile browser regression checks and a link audit of the local production build. It then commits only `data/projects.json` to a unique `codex/portfolio-sync-*` branch, creates a pull request, waits for the Vercel preview deployment to trigger the required regression workflow, and merges only after that check passes. Existing required checks and branch rules remain enforced; no admin bypass is used. No changes means no commit or deployment. A concurrent main update may block the merge; the next hourly run starts from the new main. Failed PRs stay visible for investigation.

The existing Vercel Git integration must remain connected to `main` with deployment access for the repository owner's commit identity. This workflow preserves the checked-out commit's author identity for compatibility with that integration; GitHub Actions authenticates the branch push and PR merge. Deployment status is a separate Vercel check: a successful sync commit does not itself confirm successful deployment. GitHub's `GITHUB_TOKEN` does not trigger other push-based Actions, so the sync workflow runs its own validation, then waits for the trusted Vercel `deployment_status` event to run the required check on the same revision. GitHub does not accept `workflow_dispatch` checks for required-status rules. The deployment handler verifies a successful Vercel preview and matches its SHA to an open sync PR in this repository. Unrelated deployments cannot emit a skipped check called `regression`. A missing/failed preview or check fails publication visibly; no branch rule is bypassed.

In repository **Settings → Actions → General → Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. The workflow requests only contents, pull requests and actions write permissions. The setting permits PR creation; it does not waive branch rules or require an approval from the bot. Current rules require zero approvals and a passing `regression` check. If repository or organization policy disables bot-created PRs, the workflow fails visibly until that setting is enabled.

## Local verification

```sh
npm run test:maintenance
npm run sync:projects
npm run lint
npm run type-check
npm run build
npm test
```

Public repositories can be read without a token locally. Optionally supply `GITHUB_TOKEN` to avoid unauthenticated API limits. Never commit it. The workflow uses its built-in repository token; no secrets in linked repositories or cross-repository write permissions are required.

Case-study context, plans, screenshots, manual accessibility evidence and engineering notes stay editorial. Source activity does not prove deployed behavior, accessibility conformance or performance. Screenshots retain their capture date until recaptured. Feature descriptions are deliberately supplied by the source project rather than guessed from commit messages.

The daily link workflow checks the published site, including all locales. LinkedIn returns bot-block status 999 and is reported for manual review, not silently marked healthy.
