const express = require("express");
const router = express.Router();
const {
  getGroups,
  addGroup,
  getGroupTeachers,
  Savegroupsintodatabase,
  getGroupswithCount,
} = require("../controllers/groupController");

router.get("/:institutionId/getGroups", getGroups);
router.get("/:institutionId/getGroupsWithCount", getGroupswithCount);
router.post("/addGroup", addGroup);
router.get("/:institutionId/getTeachers", getGroupTeachers);
router.put("/saveGroups", Savegroupsintodatabase);
module.exports = router;
