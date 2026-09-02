import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const sqlite3 = require(
  path.resolve(__dirname, "../../../../backend/node_modules/sqlite3"),
).verbose();

export async function reset() {
  const dbPath = path.resolve(__dirname, "../test.db");
  const sqlPath = path.resolve(
    __dirname,
    "create_minimal_data.sql",
  );

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const sql = fs.readFileSync(sqlPath, "utf8");
  const db = new sqlite3.Database(dbPath);

  await new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  db.close();
}

export async function login(page, email, password) {
  await page.goto("http://localhost:5173/login-with-email");
  await page.fill('input[data-testid="email-input"]', email);
  await page.fill('input[data-testid="password-input"]', password);
  await page.click('button[data-testid="login-sbmt"]');
  if (email.includes("staff")) {
    await page.waitForURL("**/all-programs");
  } else {
    await page.waitForURL("**/child-list");
  }
}

export async function loadAppAsGuest(page) {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
}

export async function loadAppWithRole(page, role) {
  await page.goto("http://localhost:5173/");
  await page.evaluate((roleValue) => {
    localStorage.setItem("role", roleValue);
    localStorage.setItem("institution", "1");
    localStorage.setItem("token", "test-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Test User", role: roleValue }),
    );
  }, role);
  await page.reload();
}

export default { reset, login, loadAppAsGuest, loadAppWithRole };
