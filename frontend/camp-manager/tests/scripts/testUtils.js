import { execSync } from "child_process";
import fs from "fs";

export async function reset() {
  const dbPath = "./frontend/camp-manager/tests/test.db";

  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath);
    } catch (e) {
      console.log("DB locked, retry...");
      await new Promise((r) => setTimeout(r, 100));
      fs.unlinkSync(dbPath);
    }
  }

  execSync(
    `sqlite3 ${dbPath} < ./frontend/camp-manager/tests/scripts/create_minimal_data.sql`,
  );
}

export async function login(page, email, password) {
  await page.goto("http://localhost:5173/login-with-email");
  await page.fill('input[data-testid="email-input"]', email);
  await page.fill('input[data-testid="password-input"]', password);
  await page.click('button[data-testid="login-sbmt"]');
  if (email.includes("staff")) {
    await page.waitForURL("**/programs");
  } else {
    await page.waitForURL("**/child-list");
  }
}

export default { reset, login };
