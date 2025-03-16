const express = require("express");
const router = express.Router();
const {
  getContacts,
  getChildFromInstitution,
  createChild,
  getChild,
  updateChild,
  deleteChild,
  getChildFromGroup,
  addChilToGroup,
} = require("../controllers/childController");

router.route("/").get(getContacts);

router.route("/").post(createChild);
router.route("/:id").get(getChild);
router.route("/institution/:institutionId").get(getChildFromInstitution);
router.route("/:id").put(updateChild);
router.route("/:id").delete(deleteChild);
router.route("/group/:groupId").get(getChildFromGroup);
router.route("/group/:groupId/:childid").put(addChilToGroup);

module.exports = router;
