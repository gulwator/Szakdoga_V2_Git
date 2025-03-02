const express = require("express");
const router = express.Router();
const { getInstitutions } = require("../controllers/InstitutionController");

router.get("/institutions", getInstitutions);

module.exports = router;
