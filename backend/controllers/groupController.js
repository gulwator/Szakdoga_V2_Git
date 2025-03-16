const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/** Get all groups from istitution
 * GET /api/groups/:institutionId/getGroups
 * @access public
 */
const getGroups = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM groups where institutionId=${req.params.institutionId}`;
  db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

/** Get group Teacher
 * GET /api/groups/:institutionId/getTeachers
 * @access public
 */
const getGroupTeachers = asyncHandler(async (req, res) => {
  let sql = `SELECT u.id, u.name, u.address, t.groupId  FROM users AS u LEFT JOIN teachersInGroups AS t ON u.id = t.userIds Where u.institutionId =${req.params.institutionId}`;
  let groups = db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

/** add to groups
 * POST /api/groups
 * @access public
 */
const addGroup = asyncHandler(async (req, res) => {
  let sql = `INSERT INTO groups (name, institutionId) VALUES(?,?)`;
  const { name } = req.body;
  db.run(sql, [name, institutionId], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: "group added to database" });
  });
});

/** Add to GroupTeacher
 * POST /api/groups
 * @access public
 */

const addGroupTeacher = asyncHandler(async (req, res) => {
  let sql = `INSERT INTO teachersInGroups (userIds, groupId) VALUES(?,?)`;
  const { userIds, groupId } = req.body;
  db.run(sql, [userIds, groupId], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: "teachersInGroups added to database" });
  });
});

module.exports = { getGroups, addGroup, addGroupTeacher, getGroupTeachers };
