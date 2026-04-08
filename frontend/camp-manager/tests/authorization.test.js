import { test, expect } from "@playwright/test";
import { reset, login } from "./scripts/testUtils.js";

test.beforeEach(async () => {
  await reset();
});

test("bejelentkezés staff userrel", async ({ page }) => {
  await login(page, "taboroztato@staff.com", "test");
  await expect(page).toHaveURL("http://localhost:5173/programs");
});

test("bejelentkezés teacher userrel", async ({ page }) => {
  await login(page, "tanarteszteszt1@intezmeny.com", "test");
  await expect(page).toHaveURL("http://localhost:5173/child-list");
});

test("regisztráció staff userrel", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("register") &&
      response.request().method() === "POST",
  );
  await page.goto("http://localhost:5173/registration");
  await page.click('div[data-testid="worker-btn"]');
  await page.waitForURL("**/registration/Taboroztato");
  await page.fill('input[data-testid="name-input"]', "Playwright");
  await page.fill('input[data-testid="username-input"]', "playwright");
  await page.fill(
    'input[data-testid="email-input"]',
    `${Date.now()}@staff.com`,
  );
  await page.fill('input[data-testid="password-input"]', "test");
  await page.fill('input[data-testid="checkpassword-input"]', "test");
  await page.fill('input[data-testid="zipcode-input"]', "1234");
  await page.fill('input[data-testid="city-input"]', "Tesztváros");
  await page.fill('input[data-testid="street-input"]', "Teszt utca");
  await page.fill('input[data-testid="number-input"]', "1");
  await page.fill('input[data-testid="floor-input"]', "1");
  await page.fill('input[data-testid="door-input"]', "1");
  await page.click('button[data-testid="register-sbmt"]');
  const response = await responsePromise;
  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty("message");
});

test("regisztráció teacher userrel", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("register") &&
      response.request().method() === "POST",
  );
  await page.goto("http://localhost:5173/registration");
  await page.click('div[data-testid="teacher-btn"]');
  await page.waitForURL("**/registration/Kisero");
  await page.fill('input[data-testid="name-input"]', "Playwright");
  await page.fill('input[data-testid="username-input"]', "playwright");
  await page.fill(
    'input[data-testid="email-input"]',
    `${Date.now()}@intezmeny.com`,
  );
  await page.fill('input[data-testid="password-input"]', "test");
  await page.fill('input[data-testid="checkpassword-input"]', "test");
  await page.getByTestId("institution-select").selectOption({
    label: "10001 Minta Intézet",
  });
  await page.fill('input[data-testid="zipcode-input"]', "1234");
  await page.fill('input[data-testid="city-input"]', "Tesztváros");
  await page.fill('input[data-testid="street-input"]', "Teszt utca");
  await page.fill('input[data-testid="number-input"]', "1");
  await page.fill('input[data-testid="floor-input"]', "1");
  await page.fill('input[data-testid="door-input"]', "1");
  await page.click('button[data-testid="register-sbmt"]');
  const response = await responsePromise;
  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty("message");
});
