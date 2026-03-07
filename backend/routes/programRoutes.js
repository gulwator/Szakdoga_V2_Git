const express = require("express");
const router = express.Router();
const {
  getPrograms,
  registerGroupForProgram,
  getProgramsForTheGroup,
} = require("../controllers/programController");

router.get("/getPrograms", getPrograms);
router.post("/registerGroupForProgram", registerGroupForProgram);
router.get("/:groupId/getPrograms", getProgramsForTheGroup);
module.exports = router;
