const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection stable");
  return db;
});

db.run(
  `CREATE TABLE IF NOT EXISTS children(
        id integer PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL,
        dateOfBirth date NOT NULL,
        parantName text NOT NULL,
        parantPhone integer NOT NULL,
        address text NOT NULL,
        schoolID integer NOT NULL,
        color integer,
        groupID integer,
        BandNumber integer,
        illness text)`
);
db.run(
  `CREATE TABLE IF NOT EXISTS institutions(
        id integer PRIMARY KEY AUTOINCREMENT,
        name text,
        om text UNIQUE NOT NULL,
        address text)`
);

db.run(
  `CREATE TABLE IF NOT EXISTS users(
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        password text,
        email text UNIQUE,
        address text)`
);

module.exports = { db };
