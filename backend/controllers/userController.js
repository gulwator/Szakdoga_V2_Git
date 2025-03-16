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

  if (institution == null) {
    institution = undefined;
  }

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
  console.log(values);
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

      res.status(200).json({
        message: 1,
        token,
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

//TODO:GET TEACHERS FROM INSTITUTION

module.exports = { getUsers, register, login, protect };
