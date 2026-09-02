import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.__INITIAL_AUTH__ = null;
  });
  await page.goto("http://localhost:5174");
  console.log("AUTH STATE:");
  console.log(
    await page.evaluate(() => ({
      auth: window.__INITIAL_AUTH__,
    })),
  );
  console.log("BODY TEXT:");
  console.log(await page.evaluate(() => document.body.innerText));
  console.log("BODY HTML:");
  console.log(await page.evaluate(() => document.body.innerHTML));
  await browser.close();
})();
