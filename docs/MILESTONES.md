# Living portfolio and Template Editor milestones

Plan established: 14 October 2026. Estimates are working sessions, not calendar promises. Complete each gate before beginning the next. The editor work belongs in the separate `dynamischer-template-editor` repository; this change prepares its portfolio presentation and delivery plan.

## M0 — Portfolio foundation (this change)

English `/`, German `/de`, and Bahasa Indonesia `/id`; clear positioning; project case studies; dated Now and notes; contact destinations; automated navigation, language, mobile layout and accessibility checks; weekly external-link checks. Publish after reviewing both languages and the local preview. Do not mark Template Editor work as completed as a side effect of this release.

## M1 — Editor baseline (2–3 sessions)

- Inspect the actual editor repository and identify one primary user and task.
- Record personal contribution, existing features, architecture, schema and state ownership. Remove unsupported claims.
- Capture real screenshots of the current editing workflow. The portfolio now includes local development screenshots; refresh them after editor changes and confirm the deployed demo matches before changing captions.
- Record baseline bundle size and measured loading/interaction behavior with environment and method. Distinguish lab data from real-user data.
- Publish the expanded case study with limitations and source references.

Gate: a reviewer can understand and complete the primary task from the demo, and the case study accurately describes the implementation. Update Now and add one dated note.

## M2 — Accessibility baseline and fixes (3–4 sessions)

Use `ACCESSIBILITY-REPORT.md`. Test the entire primary task: create/edit a template, preview, validate, save/export if implemented, and recover from errors. Include keyboard-only operation, visible focus, dialog focus return if applicable, screen reader feedback, labels/errors, 200% zoom, narrow reflow, contrast and reduced motion.

Run automated checks, then manually test desktop keyboard and at least one real browser/screen reader combination. Track findings, severity, affected tasks, fixes and retest outcomes. Have people who use assistive technology review the task when feasible; do not present that as completed until it happens.

Gate: blocking findings in the primary task are fixed and retested; remaining limitations are public. Publish a dated report and one note on a concrete fix. No blanket WCAG conformance claim from automated scans.

## M3 — AI-assisted drafts (4–6 sessions)

User story: describe a template, receive a structured draft, inspect/edit the proposal, explicitly apply it, and undo application.

- Define a versioned output schema, supported template features and input/output limits.
- Keep credentials server-side; validate provider output before it reaches editor state.
- Show a preview or diff; never overwrite the current template automatically. Retain the original on rejection, cancellation or error.
- Implement cancel, timeout, retry, provider-error and invalid-schema states; prevent stale responses from overwriting newer requests.
- Use accessible names and status announcements; keep focus stable while generating. Test the complete workflow with keyboard and screen reader.
- Tell users what text is sent to the provider. Keep telemetry minimal and avoid retaining prompt content by default. Decide retention/provider settings before release.
- Add rate limits and a spending limit; provide a useful manual path when generation is unavailable.
- Document AI functionality separately from AI-assisted development tools.

Gate: the successful task and failure/cancellation paths are tested; output is validated; application requires explicit action and can be undone; provider/data handling is documented. A public demo requires working quota controls.

## M4 — Evaluation and publication (2–3 sessions)

Create a versioned set of at least 20 representative inputs covering simple/complex templates, German/English, ambiguous requests, unsupported features and malformed/adversarial instructions. Define expected constraints and a rubric before evaluating.

Record model/version, prompt/schema revision, date, schema-valid rate, task success under the rubric, latency distribution, estimated cost and concrete failure examples. Repeat after changes to the model, prompt or schema; never invent improvements. Publish the evaluation method and limitations without exposing sensitive inputs.

Gate: case study links to a working feature, accessible workflow report and reproducible evaluation summary. Update project status, Now and notes. Reassess whether the AI feature earns its complexity.

## Maintenance rhythm

- Every meaningful release: update the relevant case study, add a short note explaining a decision/result, and review Now. Change dates only after review.
- Monthly (30 minutes): manually inspect demos, contact paths and weekly link reports. Review dependency update proposals. Check whether Now still reflects the work.
- Quarterly (one session): rerun manual accessibility tasks, review performance evidence, improve one case study, and rerun AI evaluation if applicable.
- Yearly: select projects against career direction; archive projects with context rather than removing evidence of past work.

Automation runs in GitHub after these workflows reach the default branch. Weekly link failures use GitHub Actions notifications according to account settings; no email or issue posting is configured. Blocked/rate-limited providers are flagged for manual review, never represented as verified links. If a failing external service is deliberately retired, update its project links and status before accepting the next report.
