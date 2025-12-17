import { expect, test } from "@playwright/test";

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/todos");
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole("heading", { name: "Giriş" })).toBeVisible();
});
