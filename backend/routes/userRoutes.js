const express = require("express");
const router = express.Router();
const { register, login, protect } = require("../controllers/userController");

router.post("/api/register", register);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.send("User profile");
});

module.exports = router;
