import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("system preferences, explicit choices, localization and reload persistence", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "dark", contrast: "more" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "more");
  await page.getByLabel("Color theme").selectOption("light");
  await page.getByLabel("Contrast", { exact: true }).selectOption("standard");
  await page.emulateMedia({ colorScheme: "light", contrast: "no-preference" });
  await page.emulateMedia({ colorScheme: "dark", contrast: "more" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute(
    "data-contrast",
    "standard"
  );
  await page.goto("/de/projects/template-editor");
  await expect(page.getByLabel("Farbschema")).toHaveValue("light");
  await expect(page.getByLabel("Kontrast")).toHaveValue("standard");
  await page.goto("/id");
  await expect(page.getByLabel("Tema warna")).toHaveValue("light");
  await page.getByLabel("Tema warna").selectOption("system");
  await page.getByLabel("Kontras", { exact: true }).selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "more");
  expect(errors).toEqual([]);
});

test("blocked storage keeps choices for the visit and forced colors remain usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.goto("/");
  await page.getByLabel("Color theme").selectOption("dark");
  await page.getByLabel("Contrast", { exact: true }).selectOption("more");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "more");
  await expect(
    page.getByRole("status").filter({ hasText: "Appearance changed" })
  ).toBeVisible();
  await page.emulateMedia({ forcedColors: "active", colorScheme: "light" });
  await expect(page.getByLabel("Color theme")).toHaveValue("dark");
  expect(
    await page
      .getByLabel("Color theme")
      .evaluate((el) => getComputedStyle(el).forcedColorAdjust)
  ).toBe("auto");
  await page.getByLabel("Color theme").focus();
  await expect(page.getByLabel("Color theme")).toBeFocused();
  await expect(
    page.getByRole("heading", { name: "Selected work" })
  ).toBeVisible();
});

for (const theme of ["light", "dark"])
  for (const contrast of ["standard", "more"]) {
    test(`${theme}/${contrast}: accessible pages and narrow layout`, async ({
      page,
    }) => {
      await page.goto("/");
      await page.getByLabel("Color theme").selectOption(theme);
      await page.getByLabel("Contrast", { exact: true }).selectOption(contrast);
      for (const route of [
        "/",
        "/projects/template-editor",
        "/accessibility",
      ]) {
        await page.goto(route);
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(result.violations).toEqual([]);
        await page.setViewportSize({ width: 320, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          )
        ).toBe(true);
      }
    });
  }
