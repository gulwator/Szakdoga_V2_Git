const express = require("express");
const router = express.Router();
const {
  getContacts,
  createChild,
  getChild,
  updateChild,
  deleteChild,
} = require("../controllers/childController");

router.route("/").get(getContacts);

router.route("/").post(createChild);
router.route("/:id").get(getChild);
router.route("/:id").put(updateChild);
router.route("/:id").delete(deleteChild);

module.exports = router;
