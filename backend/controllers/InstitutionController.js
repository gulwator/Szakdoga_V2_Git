const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/** Get all institutions
 * GET /api/institutions
 * @access public
 */
const getInstitutions = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM institutions`;
  console.log("getInstitutions");
  let institutions = db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

module.exports = { getInstitutions };
