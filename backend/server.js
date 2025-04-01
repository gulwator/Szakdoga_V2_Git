const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middleware/errorHandler");
const db = require("./dbConnection/dbConnection");
const app = express();

const cors = require("cors");
db;
app.use(cors());
app.use(express.json());
app.use("/api/child", require("./routes/childRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/institutionRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));
app.use(errorHandler);

const port = parseInt(process.env.port);

app.listen(port, () => {
  console.log(`server running in port  ${port}`);
});
