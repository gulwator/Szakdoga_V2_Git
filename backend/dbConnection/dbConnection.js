const createTables = require("./dbCreateTables.js");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection stable");
  return db;
});
createTables(db);

module.exports = { db };
