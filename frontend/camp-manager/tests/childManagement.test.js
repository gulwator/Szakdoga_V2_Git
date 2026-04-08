import { test, expect } from "@playwright/test";
import { reset, login } from "./scripts/testUtils.js";

test.beforeEach(async () => {
  await reset();
});

test("gyermek hozzáadása", async ({ page }) => {
  await login(page, "tanarteszteszt1@intezmeny.com", "test");
  await page.click('a[data-testid="gyerekekDrpHeader"]');
  await page.click('a[data-testid="gyerekHozzaadasBtnHeader"]');
  await page.fill('input[data-testid="nameTb"]', "Teszt Gyerek");
  await page.fill('input[data-testid="dateOfBirthDp"]', "2010-01-01");
  await page.fill(
    'input[data-testid="addressTb"]',
    "1234, Budapest Teszt utca 1.",
  );
  await page.fill('input[data-testid="parentNameTb"]', "Teszt Szülő");
  await page.fill('input[data-testid="parentPhoneTb"]', "+3612345678");
  await page.fill('input[data-testid="illnessTb"]', "Nincs");
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("child") &&
      response.request().method() === "POST",
  );
  await page.click('button[data-testid="AddChildSubmitBtn"]');

  const response = await responsePromise;
  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty("message");
});

test("gyermek hozzáadása hiányos adatokkal", async ({ page }) => {
  await login(page, "tanarteszteszt1@intezmeny.com", "test");
  await page.click('a[data-testid="gyerekekDrpHeader"]');
  await page.click('a[data-testid="gyerekHozzaadasBtnHeader"]');
  await page.fill('input[data-testid="nameTb"]', "Teszt Gyerek");

  await page.click('button[data-testid="AddChildSubmitBtn"]');

  const errorToast = page.locator(".Vue-Toastification__toast--error");
  await expect(errorToast).toHaveText(
    "Kérem, töltse ki az összes kötelező mezőt!",
  );
});
