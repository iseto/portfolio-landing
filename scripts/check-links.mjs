import { writeFile, mkdir } from "node:fs/promises";
const base =
  process.env.CHECK_BASE_URL || "https://portfolio-landing-gamma.vercel.app";
const routes = ["", "/de", "/id"].flatMap((prefix) => [
  prefix || "/",
  `${prefix}/accessibility`,
  ...["template-editor", "cineflix", "weather"].map(
    (slug) => `${prefix}/projects/${slug}`
  ),
]);
const urls = new Set();
const results = [];
for (const route of routes) {
  try {
    const response = await fetch(new URL(route, base), {
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) {
      results.push({
        url: new URL(route, base).href,
        status: response.status,
        outcome: "failed",
      });
      continue;
    }
    const html = await response.text();
    for (const match of html.matchAll(
      /<a\b[^>]*\bhref="(https?:\/\/[^"\s]+)"/g
    ))
      urls.add(match[1].replaceAll("&amp;", "&"));
  } catch (error) {
    results.push({
      url: new URL(route, base).href,
      outcome: "failed",
      error: error.message,
    });
  }
}
for (const url of urls) {
  let result;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: { "user-agent": "PortfolioLinkCheck/1.0" },
      });
      await response.body?.cancel();
      const status = response.status;
      result = {
        url,
        status,
        outcome: response.ok
          ? "ok"
          : [401, 403, 429, 999].includes(status)
            ? "manual-review"
            : "failed",
        destination: response.url,
      };
      if (response.ok || status < 500) break;
    } catch (error) {
      result = { url, outcome: "failed", error: error.message };
    }
  }
  results.push(result);
}
for (const result of results) {
  console.log(
    `${result.outcome}: ${result.url} (${result.status || result.error})`
  );
  if (result.outcome === "manual-review" && process.env.GITHUB_ACTIONS)
    console.log(
      `::warning::Manually verify ${result.url}; provider blocked the automated check.`
    );
}
await mkdir("reports", { recursive: true });
await writeFile(
  "reports/links.json",
  JSON.stringify(
    { checkedAt: new Date().toISOString(), base, results },
    null,
    2
  )
);
if (results.some((r) => r.outcome === "failed")) process.exitCode = 1;
