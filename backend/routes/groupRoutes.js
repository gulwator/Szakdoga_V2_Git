const express = require("express");
const router = express.Router();
const {
  getGroups,
  addGroup,
  addGroupTeacher,
  getGroupTeachers,
} = require("../controllers/groupController");

router.get("/:institutionId/getGroups", getGroups);
router.post("/addGroup", addGroup);
router.post("/addGroupTeacher", addGroupTeacher);
router.get("/:institutionId/getTeachers", getGroupTeachers);

module.exports = router;
