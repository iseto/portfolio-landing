# Accessibility audit report template

Status: not started. Create one dated report per product/version. Keep previous reports as history; never turn a blank checklist or an automated score into a conformance claim.

## Identity and scope

- Product / deployed URL / repository:
- Date, tester and reviewer:
- Revision (commit SHA; note uncommitted changes):
- Pages, locales, states and complete user tasks evaluated:
- Target: WCAG 2.2 A/AA; specify which criteria were actually evaluated:
- Browser / OS / screen reader and versions:
- Tools, versions, rule tags, commands and test fixtures:
- Environment: local build, preview or deployed site:
- Explicit exclusions (external apps, content, authentication, third-party embeds):

## Automated evidence

Link to the exact workflow run, dated JSON/HTML report and source revision. Record pages, viewports, failures, incomplete/needs-review results, and deliberately skipped tests. Retain failed runs as well as passes. A green workflow icon is a workflow result, not an accessibility certificate. Record automated checks separately from manual evaluation.

## Manual task checklist

For each row use Pass, Fail, Not tested or Not applicable, with evidence and rationale. Include the affected WCAG criterion where evaluated.

| Task / check | Result | Method and evidence | Finding / severity | Fix reference | Retest date / outcome |
| --- | --- | --- | --- | --- | --- |
| Find a project, read it, and switch locales using only keyboard | Not tested | — | — | — | — |
| Skip navigation; visible focus; logical order; no traps | Not tested | — | — | — | — |
| Complete primary tasks with a real screen reader | Not tested | — | — | — | — |
| Landmarks, headings, names and link purpose | Not tested | — | — | — | — |
| Forms, validation and error recovery, if applicable | Not tested | — | — | — | — |
| Status announcements and focus after changes | Not tested | — | — | — | — |
| 200% browser zoom; 400% equivalent / 320 CSS-pixel reflow | Not tested | — | — | — | — |
| Text spacing: 1.5 line height, 2em paragraphs, .12em letters, .16em words | Not tested | — | — | — | — |
| Text/non-text contrast, focus contrast and forced colors | Not tested | — | — | — | — |
| Target sizes, touch operation and orientation | Not tested | — | — | — | — |
| Reduced motion, imagery alternatives and media | Not tested | — | — | — | — |
| Offline, install and update states, if applicable | Not tested | — | — | — | — |

## Findings and follow-up

Give each finding an ID, affected task/criterion, steps to reproduce, observed versus expected behavior, user impact, owner, proposed fix, source reference, and retest evidence. Distinguish blockers, other barriers and improvements. List all remaining known limitations publicly.

## User evaluation

Record assistive-technology user sessions only after they happen. With consent, summarize tasks and barriers without publishing private participant details. Keep professional review and user evaluation distinct.

## Publication and cadence

Publish a plain-language scope, actual test date/version, automated run link, manual status and remaining limitations. Recheck automation weekly and after changes. Repeat manual tasks after substantial UI changes and quarterly. Revisit labels/dates only after a real review. Ask a human reviewer to sign off before making a scoped WCAG conformance statement.

Reference: https://www.w3.org/WAI/test-evaluate/ and https://www.w3.org/WAI/test-evaluate/report-template/
