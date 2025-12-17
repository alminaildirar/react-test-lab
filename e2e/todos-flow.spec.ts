import { expect, test } from "@playwright/test";

test("login and manage todos end-to-end", async ({ page }) => {
  // go to protected route
  await page.goto("/todos");

  await expect(page).toHaveURL(/\/login\?/);

  const url = new URL(page.url());
  expect(url.pathname).toBe("/login");
  expect(url.searchParams.get("next")).toBe("/todos");

  // login
  await page.getByLabel("email").fill("mina@example.com");
  await page.getByLabel("password").fill("123456");
  await page.getByRole("button", { name: "Giriş yap" }).click();

  await expect(page).toHaveURL("/todos");

  // add todo
  await page.getByLabel("new-todo").fill("E2E todo");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("E2E todo")).toBeVisible();

  // toggle
  const item = page.locator("li.todoItem", { hasText: "E2E todo" });
  await item.getByRole("checkbox").click();
  await expect(item).toHaveAttribute("data-completed", "true");

  // filter completed
  await page.getByRole("button", { name: "Completed" }).click();
  await expect(page.getByText("E2E todo")).toBeVisible();

  // detail
  await page.getByRole("link", { name: "E2E todo" }).click();
  await expect(page.getByText("Todo Detail")).toBeVisible();

  // back
  await page.getByRole("link", { name: /back to todos/i }).click();
  await expect(page).toHaveURL("/todos");

  // logout
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL("/login");
});
