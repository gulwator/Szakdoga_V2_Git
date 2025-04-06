const express = require("express");
const router = express.Router();
const {
  getProgramsWithLimits,
  registerForProgram,
  getProgramsForTheGroup,
} = require("../controllers/programController");

router.get("/getProgramsWithLimits", getProgramsWithLimits);
router.post("/registerForProgram", registerForProgram);
router.get("/:groupId/getPrograms", getProgramsForTheGroup);
module.exports = router;
