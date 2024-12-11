const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const db = require("./dbConnection/dbConnection");
const app = express();

db
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server running in port  ${port}`);
});

// // SQL
// const sqlite3 = require("sqlite3").verbose();
// let sql;

// //Connect to db
// const db = new sqlite3.Database("./test.db", (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   return console.log("Connecttion established");
// });

// //create to db
// db.run(
//   `CREATE TABLE IF NOT EXISTS children(
//   id integer PRIMARY KEY AUTOINCREMENT,
//   name text NOT NULL,
//   dateOfBirth date NOT NULL,
//   parantName text NOT NULL,
//   parantPhone integer NOT NULL,
//   address text NOT NULL,
//   schoolID integer NOT NULL,
//   color integer,
//   BandNumber integer,
//   illness text)`
// );

// // INSERT data into the table
