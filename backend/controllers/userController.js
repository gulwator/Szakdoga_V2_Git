const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/**    Get all users
// @route   GET /api/users
// @access  Public
*/
const getUsers = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM users`;

  let users = db.all(sql, (error, rows) => {
    res.status(200).send(rows);
  });
});

/**    Register a new user
// @route   POST /api/users/register
// @access  Public
*/
const register = asyncHandler(async (req, res) => {
  const { username, name, email, password, role, institution, address } =
    req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(name, email, hashedPassword);
  const query = `INSERT INTO users (
  username, 
  password,
  name, 
  email, 
  role,
  institutionId,
  address
  ) VALUES(?,?,?,?,?,?,?)`;
  const values = [
    username,
    hashedPassword,
    name,
    email,
    role,
    institution,
    address,
  ];

  db.run(query, values, function (err) {
    if (err) {
      return res.json({ error: err.message });
    }

    res.status(201).json({ message: "User added to database" });
  });
});

/**    Login
// @route   POST /api/users/login
// @access  Public*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are reqired!");
  }
  let sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], async (error, row) => {
    if (error) {
      res.status(500).json({ message: "Server error" });
    } else if (row && (await bcrypt.compare(password, row.password))) {
      // Generate JWT token
      const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .json({
          message: 1,
          role: row.role,
          institution: row.institutionId,
        });
    } else {
      res.status(401).json({ message: 0 });
      // throw new Error("Invalid email or password");
    }
  });
});

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Logout
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
});

// Get profile
const getProfile = asyncHandler(async (req, res) => {
  const sql = `SELECT id, username, name, email, role, institutionId FROM users WHERE id = ?`;
  db.get(sql, [req.user], (error, row) => {
    if (error) return res.status(500).json({ message: "Server error" });
    if (!row) return res.status(404).json({ message: "User not found" });
    res.status(200).json(row);
  });
});

module.exports = { getUsers, register, login, logout, getProfile, protect };
