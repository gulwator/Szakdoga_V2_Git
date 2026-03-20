const createTables = require("./dbCreateTables.js");

const sqlite3 = require("sqlite3").verbose();
const dbData = process.env.DB_DATA || "./data.db";
const db = new sqlite3.Database(dbData, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection stable");
  return db;
});
try {
  db.run("PRAGMA foreign_keys = ON;");
  if (!db) {
    throw new Error("Failed to initialize database");
  }
  if (process.env.NODE_ENV === "development") {
    // console.log("Running in development mode, creating tables...");
    // createTables(db);
  }
} catch (error) {
  console.error("Error creating tables:", error.message);
}
// console.log("✅ db ready to work.");

module.exports = { db };
