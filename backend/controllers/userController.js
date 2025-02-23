const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM users`;

  let users = db.all(sql, (error, rows) => {
    res.status(200).send(rows);
  });
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    console.log(username, email, password, role);
    res.status(400);
    throw new Error("all fields are reqired!");
  }
  let token = "";
  // Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(name, email, hashedPassword);
  const query =
    "INSERT INTO users (username, email, password,role) VALUES(?,?,?,?)";
  const values = [username, email, hashedPassword, role];
  console.log(values);
  db.run(query, values, function (err) {
    if (err) {
      res.status(500);
      res.json({ error: err.message });
    }
    console.log(process.env.JWT_SECRET);
    token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({ message: "User added to database", token });
    console.log();
  });
});

// @desc    Login
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are reqired!");
  }
  let sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], async (error, row) => {
    if (row && (await bcrypt.compare(password, row.password))) {
      // Generate JWT token
      console.log("eddig jó\n");
      console.log(row);
      const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({ message: 1, token, role: row.role });
    } else {
      res.status(401).json({ message: 0 });
      // throw new Error("Invalid email or password");
    }
  });
});

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
});

module.exports = { getUsers, register, login, protect };
