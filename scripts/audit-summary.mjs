import { readFile, appendFile } from "node:fs/promises";
try {
  const report = JSON.parse(
    await readFile("reports/audit-results.json", "utf8")
  );
  const { expected, unexpected, flaky, skipped, startTime } = report.stats;
  const summary = `## Portfolio accessibility and regression evidence\n\nRun: ${startTime}\nRevision: ${process.env.GITHUB_SHA || "local working tree"}\n\nPassed: ${expected}; failed: ${unexpected}; flaky: ${flaky}; skipped: ${skipped}.\n\nDownload the regression-report artifact for HTML, JSON, axe rule results (including incomplete/manual-review findings) and failure traces. These checks do not establish full WCAG conformance. Real screen reader evaluation remains separate.\n`;
  if (process.env.GITHUB_STEP_SUMMARY)
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  else console.log(summary);
} catch {
  console.log(
    "No completed browser report available. Check earlier job failures."
  );
}
