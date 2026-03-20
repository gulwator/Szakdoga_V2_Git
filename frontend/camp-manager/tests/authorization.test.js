import { test, expect } from "@playwright/test";
import reset from "./scripts/resetDb.js";

test.beforeEach(async () => {
  await reset();
});

test("bejelentkezés staff userrel", async ({ page }) => {
  await page.goto("http://localhost:5173/login-with-email");
  await page.fill('input[data-testid="email-input"]', "taboroztato@staff.com");
  await page.fill('input[data-testid="password-input"]', "test");
  await page.click('button[data-testid="login-sbmt"]');
  await page.waitForURL("**/programs");
  await expect(page).toHaveURL("http://localhost:5173/programs");
});

test("bejelentkezés teacher userrel", async ({ page }) => {
  await page.goto("http://localhost:5173/login-with-email");
  await page.fill(
    'input[data-testid="email-input"]',
    "tanarteszteszt1@intezmeny.com",
  );
  await page.fill('input[data-testid="password-input"]', "test");
  await page.click('button[data-testid="login-sbmt"]');
  await page.waitForURL("**/child-list");
  await expect(page).toHaveURL("http://localhost:5173/child-list");
});

test("regisztráció staff userrel", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("api/register") && response.status() === 201,
  );
  await page.goto("http://localhost:5173/registration");
  await page.click('div[data-testid="worker-btn"]');
  await page.waitForURL("**/registration/Taboroztato");
  await page.fill('input[data-testid="name-input"]', "Teszt Taboroztato");
  await page.fill('input[data-testid="username-input"]', "playwright");
  await page.fill('input[data-testid="email-input"]', "playwright@staff.com");
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
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty("message");
});
