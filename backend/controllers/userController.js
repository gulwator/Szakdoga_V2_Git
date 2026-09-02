const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

const accessTokenExpiry = "15m";
const refreshTokenExpiry = "7d";

const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: accessTokenExpiry,
  });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: refreshTokenExpiry,
  });

const sendRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

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
    console.log("User registered :", email);
    res.status(201).json({ message: "User added to database" });
  });
});

/**    Login
// @route   POST /api/users/login
// @access  Public*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required!" });
  }

  let sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], async (error, row) => {
    if (row && (await bcrypt.compare(password, row.password))) {
      const accessToken = generateAccessToken(row);
      const refreshToken = generateRefreshToken(row);

      sendRefreshTokenCookie(res, refreshToken);

      return res.status(200).json({
        message: 1,
        token: accessToken,
        accessToken,
        role: row.role,
        institution: row.institutionId,
        user: {
          id: row.id,
          name: row.name,
          email: row.email,
          role: row.role,
          institution: row.institutionId,
        },
      });
    }

    return res.status(401).json({ message: 0 });
  });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 0 });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    db.get(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
      async (error, row) => {
        if (error || !row) {
          return res.status(401).json({ message: 0 });
        }

        const accessToken = generateAccessToken(row);
        return res.status(200).json({
          message: 1,
          token: accessToken,
          accessToken,
          role: row.role,
          institution: row.institutionId,
          user: {
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role,
            institution: row.institutionId,
          },
        });
      },
    );
  } catch (error) {
    return res.status(401).json({ message: 0 });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out" });
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
      req.user = { id: decoded.id, role: decoded.role };
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
});

//TODO:GET TEACHERS FROM INSTITUTION

module.exports = { getUsers, register, login, refresh, logout, protect };
