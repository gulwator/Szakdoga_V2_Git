const sqlite3 = require("sqlite3").verbose();

const connectdb = async () => {
  try {
    const connect = new sqlite3.Database("./data.db", (err) => {
      if (err) {
        return console.error(err.message);
      }
      return console.log("Connection stable");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectdb;
