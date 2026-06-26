const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  protect,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

module.exports = router;
