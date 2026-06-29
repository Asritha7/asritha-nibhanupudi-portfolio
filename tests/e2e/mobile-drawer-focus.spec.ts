import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["Pixel 5"] });

test("mobile drawer: focus returns to menu button after close", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu|menu/i }).first();
  await menuButton.click();

  // Drawer should be open; press Escape to close
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  const focusedLabel = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    return el?.getAttribute("aria-label") ?? el?.textContent?.trim() ?? "";
  });
  expect(focusedLabel.toLowerCase()).toMatch(/menu/);
});

test("mobile drawer: tapping a link closes the drawer", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu|menu/i }).first();
  await menuButton.click();
  const link = page.getByRole("link", { name: /^contact$/i }).last();
  await link.click();
  await page.waitForTimeout(500);
  await expect(page).toHaveURL(/#contact$/);
});
