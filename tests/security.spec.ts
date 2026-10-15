import { test, expect } from "@playwright/test";

test("security headers protect pages, assets and errors", async ({ request }) => {
  for (const path of ["/", "/de", "/id", "/sw.js", "/offline.html", "/missing-page"]) {
    const response = await request.get(path);
    const headers = response.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
    expect(headers["x-powered-by"]).toBeUndefined();
  }
  expect((await request.get("/sw.js")).headers()["cache-control"]).toContain("no-store");
});

async function ready(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise<void>(resolve => navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true }));
  });
  await page.reload();
}

test("cache expires, stays bounded, excludes query requests and clears only portfolio data", async ({ page, context }) => {
  await ready(page);
  await page.evaluate(async () => {
    const cache = await caches.open("seto-portfolio-v2");
    // Seed an expired page and more than the allowed number of entries.
    for (let i = 0; i < 45; i++) await cache.put(`/test-${i}`, new Response("test", { headers: { "x-portfolio-cached-at": String(Date.now()) } }));
    await cache.put("/projects/weather", new Response("EXPIRED", { headers: { "x-portfolio-cached-at": String(Date.now() - 8 * 86400000) } }));
    await (await caches.open("unrelated-cache")).put("/other", new Response("keep"));
  });
  await page.reload();
  expect(await page.evaluate(async () => (await (await caches.open("seto-portfolio-v2")).keys()).length)).toBeLessThanOrEqual(40);
  expect(await page.evaluate(async () => !!await (await caches.open("seto-portfolio-v2")).match("/projects/weather"))).toBe(false);
  await page.goto("/?private=value");
  expect(await page.evaluate(async () => (await (await caches.open("seto-portfolio-v2")).keys()).some(key => new URL(key.url).search))).toBe(false);
  await page.getByRole("button", { name: "Clear offline data" }).click();
  await expect(page.getByRole("status")).toContainText("Offline data cleared");
  expect(await page.evaluate(async () => (await caches.keys()).filter(key => key.startsWith("seto-portfolio-")))).toEqual([]);
  expect(await page.evaluate(() => caches.has("unrelated-cache"))).toBe(true);
  // Saving resumes on a subsequent visit, and the visited page works offline.
  await page.goto("/de");
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
});

test("production navigation and offline controls have no CSP violations", async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { violations?: string[] }).violations = [];
    document.addEventListener("securitypolicyviolation", event => {
      (window as Window & { violations?: string[] }).violations?.push(event.violatedDirective);
    });
  });
  await ready(page);
  for (const [route, label] of [["/de", "Offline-Daten löschen"], ["/id", "Hapus data luring"]]) {
    await page.goto(route);
    await expect(page.getByRole("button", { name: label })).toBeVisible();
    expect(await page.evaluate(() => (window as Window & { violations?: string[] }).violations)).toEqual([]);
  }
});
