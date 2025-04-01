const express = require("express");
const router = express.Router();
const {
  getProgramsWithLimits,
  registerForProgram,
} = require("../controllers/programController");

router.get("/getProgramsWithLimits", getProgramsWithLimits);
router.post("/registerForProgram", registerForProgram);

module.exports = router;
