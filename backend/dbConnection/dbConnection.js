const createTables = require("./dbCreateTables.js");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection stable");
  return db;
});
try {
  db.run("PRAGMA foreign_keys = ON;");
  createTables(db);
} catch (error) {
  console.error("Error creating tables:", error.message);
}
// console.log("✅ db ready to work.");

module.exports = { db };
