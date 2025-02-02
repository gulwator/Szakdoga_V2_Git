const express = require("express");
const router = express.Router();
const { register, login, protect } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.send("User profile");
});

module.exports = router;
