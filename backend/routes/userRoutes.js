const express = require("express");
const router = express.Router();
const csrfProtection = require("../middleware/csrf");
const {
  register,
  login,
  refresh,
  logout,
  protect,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", csrfProtection, refresh);
router.post("/logout", csrfProtection, logout);
router.get("/profile", protect, (req, res) => {
  res.send("User profile");
});

module.exports = router;
