const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middleware/errorHandler");
const db = require("./dbConnection/dbConnection");
const app = express();

const cors = require("cors");
db;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const csurf = require("csurf");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// csrf protection endpoint (cookie-based token)
const csrfProtection = csurf({ cookie: true });
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use(express.json());
app.use("/api/child", require("./routes/childRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/institutionRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));
app.use(errorHandler);

const port = parseInt(process.env.PORT || process.env.port) || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
