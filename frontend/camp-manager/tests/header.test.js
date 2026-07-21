// @ts-check
import { test, expect } from "@playwright/test";
import { loadAppAsGuest, loadAppWithRole } from "./scripts/testUtils.js";

test.describe("Header component", () => {
  test("renders guest auth actions for unauthenticated users", async ({
    page,
  }) => {
    await loadAppAsGuest(page);

    await expect(page.getByRole("link", { name: "Regisztráció" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Bejelentkezés" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Kijelentkezés" })).toHaveCount(0);
  });

  test("renders kisero role navigation and logout", async ({ page }) => {
    await loadAppWithRole(page, "Kisero");

    const gyerekekToggle = page.getByRole("button", { name: "Gyerekek" });
    const csoportokToggle = page.getByRole("button", { name: "Csoportok" });

    await expect(gyerekekToggle).toBeVisible();
    await expect(csoportokToggle).toBeVisible();
    await expect(page.getByText("Kijelentkezés")).toBeVisible();

    await gyerekekToggle.click();
    await expect(page.getByText("Gyerekek listája")).toBeVisible();
    await expect(page.getByText("Gyerek hozzáadása")).toBeVisible();

    await csoportokToggle.click();
    await expect(page.getByText("Csoportok kezelése")).toBeVisible();
    await expect(page.getByText("Csoportok órarendje")).toBeVisible();
    await expect(page.getByText("Programok")).toBeVisible();
  });

  test("renders taboroztato role navigation and logout", async ({ page }) => {
    await loadAppWithRole(page, "Taboroztato");

    await expect(page.getByRole("link", { name: "Beosztás" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Táborozók" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Programok" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Kijelentkezés" }),
    ).toBeVisible();
  });

  test("shared home link is visible in every header variant", async ({
    page,
  }) => {
    await loadAppAsGuest(page);
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

    await loadAppWithRole(page, "Kisero");
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

    await loadAppWithRole(page, "Taboroztato");
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  });
});
