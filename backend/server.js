const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const db = require("./dbConnection/dbConnection");
const app = express();

const cors = require("cors");
db;
app.use(cors());
app.use(express.json());
app.use("/api/child", require("./routes/childRoutes"));
app.use(errorHandler);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server running in port  ${port}`);
});
