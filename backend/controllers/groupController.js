const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/** Get all groups from given istitution
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

/** Get all groups from given istitution
 * GET /api/groups/:institutionId/getGroups
 * @access public
 */
const getGroupswithCount = asyncHandler(async (req, res) => {
  let sql = `SELECT 
  g.name, 
  g.id, 
  COUNT(c.id) AS "count"
FROM 
  groups g
LEFT JOIN 
  children c ON g.id = c.groupId
WHERE 
  g.institutionId = ${req.params.institutionId}
GROUP BY 
  g.id, g.name`;
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
  let sql = `SELECT DISTINCT  u.id, u.name, u.address, t.groupId  FROM users AS u LEFT JOIN teachersInGroups AS t ON u.id = t.userId Where u.institutionId =${req.params.institutionId}`;
  let groups = db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

/** add new group to groups
 * POST /api/groups
 * @access public
 */
const addGroup = asyncHandler(async (req, res) => {
  let sql = `INSERT INTO groups (name, institutionId) VALUES(?,?)`;
  const { name, institutionId } = req.body;
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
const Savegroupsintodatabase = async (req, res) => {
  const { users = [], children = [] } = req.body; // Alapértelmezett üres tömbök

  const insertUsers =
    users.length > 0
      ? users.map((user) => {
          return new Promise((resolve, reject) => {
            db.run(
              `INSERT or IGNORE into teachersInGroups (userId, groupId) VALUES (?, ?)`,
              [user.id, user.groupId],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });
        })
      : [];

  const insertChildren =
    children.length > 0
      ? children.map((child) => {
          return new Promise((resolve, reject) => {
            db.run(
              `UPDATE children SET groupId = ? WHERE id = ?`,
              [child.groupId, child.id],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });
        })
      : [];

  try {
    await Promise.all([...insertUsers, ...insertChildren]);
    res.status(201).json({ message: "Users and children added to database" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGroups,
  addGroup,
  getGroupswithCount,
  getGroupTeachers,
  Savegroupsintodatabase,
};
