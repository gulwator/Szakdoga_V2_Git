const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middleware/errorHandler");
const db = require("./dbConnection/dbConnection");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrfProtection = require("./middleware/csrf");
db;
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.get("/api/csrf", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken ? req.csrfToken() : null });
});
app.use("/api/refresh", require("./middleware/csrf"));
app.use("/api/logout", require("./middleware/csrf"));
app.use("/api/child", require("./routes/childRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/institutionRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));
app.use(errorHandler);

const port = parseInt(process.env.PORT || process.env.port || 3000, 10);
// const port = 3000;
app.listen(port, () => {
  console.log(`server running in port  ${port}`);
});
