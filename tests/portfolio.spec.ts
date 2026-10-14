import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["", "/de", "/id"].flatMap((prefix) => [
  `${prefix}/`.replace(/\/$/, "") || "/",
  `${prefix}/accessibility`,
  ...["template-editor", "cineflix", "weather"].map(
    (slug) => `${prefix}/projects/${slug}`
  ),
]);
for (const route of routes) {
  test(`${route}: language, accessibility, layout, and internal destinations`, async ({
    page,
  }, testInfo) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      route.startsWith("/de") ? "de" : route.startsWith("/id") ? "id" : "en"
    );
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!).href).toBe(
      new URL(route, "https://portfolio-landing-gamma.vercel.app").href
    );
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await testInfo.attach("axe-results", {
      body: JSON.stringify({
        route,
        checkedAt: new Date().toISOString(),
        viewport: page.viewportSize(),
        ...audit,
      }),
      contentType: "application/json",
    });
    expect(audit.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) => [
        ...new Set(elements.map((el) => el.getAttribute("href")!)),
      ]);
    for (const href of links) {
      const response = await page.request.get(href.split("#")[0] || "/");
      expect(response.ok(), href).toBe(true);
      const hash = href.split("#")[1];
      if (hash) expect(await response.text(), href).toContain(`id="${hash}"`);
    }
  });
}
test("keyboard skip link moves focus into main", async ({ page, isMobile }) => {
  test.skip(
    isMobile,
    "Mobile emulation does not represent physical keyboard navigation."
  );
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" })
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
test("language switch preserves case study and navigation reaches projects", async ({
  page,
}) => {
  await page.goto("/projects/template-editor");
  await page.getByRole("link", { name: "DE — Deutsch" }).click();
  await expect(page).toHaveURL(/\/de\/projects\/template-editor$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.getByRole("link", { name: "EN — English" }).click();
  await expect(page).toHaveURL(/\/projects\/template-editor$/);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.getByRole("heading", { name: "Selected work" })
  ).toBeVisible();
});
test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior)
  ).toBe("auto");
});

for (const prefix of ["", "/de", "/id"]) {
  test(`${prefix || "/"}: language alignment and tap sizes`, async ({
    page,
  }) => {
    await page.goto(prefix || "/");
    const boxes = await page
      .locator(".languages a, .language-separator")
      .evaluateAll((elements) =>
        elements.map((el) => {
          const r = el.getBoundingClientRect();
          return {
            center: r.y + r.height / 2,
            height: r.height,
            width: r.width,
            link: el.tagName === "A",
          };
        })
      );
    expect(
      Math.max(...boxes.map((b) => b.center)) -
        Math.min(...boxes.map((b) => b.center))
    ).toBeLessThan(1);
    for (const box of boxes.filter((b) => b.link)) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });
}
test("Indonesian switch preserves report and case study", async ({ page }) => {
  await page.goto("/de/projects/weather");
  await page.getByRole("link", { name: "ID — Bahasa Indonesia" }).click();
  await expect(page).toHaveURL(/\/id\/projects\/weather$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await page.goto("/id/accessibility");
  await page.getByRole("link", { name: "EN — English" }).click();
  await expect(page).toHaveURL(/\/accessibility$/);
});
for (const route of routes) {
  test(`${route}: narrow reflow and custom text spacing`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(route);
    await page.addStyleTag({
      content:
        "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }",
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  });
}
test("manifest and offline fallback are usable", async ({ page, context }) => {
  await page.goto("/id");
  const manifestResponse = await page.request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBe(true);
  const manifest = await manifestResponse.json();
  expect(manifest.display).toBe("standalone");
  for (const icon of manifest.icons)
    expect((await page.request.get(icon.src)).ok()).toBe(true);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise((resolve) =>
        navigator.serviceWorker.addEventListener("controllerchange", resolve, {
          once: true,
        })
      );
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await page.goto("/never-visited-page");
  await expect(
    page.getByRole("heading", { name: "You’re offline", exact: true })
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
