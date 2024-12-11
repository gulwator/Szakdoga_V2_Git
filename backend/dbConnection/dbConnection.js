const sqlite3 = require("sqlite3").verbose();


    const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE,(err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connection stable")
      return db;
      
    }
    );

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
        BandNumber integer,
        illness text)`
      );

module.exports = {db};
