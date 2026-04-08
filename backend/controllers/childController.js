const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/**Get all children
  @route GET /api/child
  @access public
  * 
  */
const getContacts = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM children`;
  db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

/** Get children from Group
 * @route GET /api/child/group/:groupId
 * @access public
 */
const getChildFromGroup = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM children WHERE groupId = ?`;
  db.all(sql, [req.params.groupId], (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

/** Get children from institution
 * @route GET /api/child/institution/:institutionId
 * @access public
 */
const getChildFromInstitution = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM children WHERE institutionId = ?`;
  let contacts = db.all(sql, [req.params.institutionId], (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(rows);
  });
});

//TODO: Ezt átgondolni hogy ez í]y biztos kell-e
/** add child to Group
 * PUT /api/child/group/:groupId/:childid
 * @access public
 */
const addChilToGroup = asyncHandler(async (req, res) => {
  let sql = `UPDATE children SET groupId = ? WHERE id = ?`;

  db.run(sql, [req.params.groupId, req.params.childid], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  });
  res.status(200).json({ message: "Child added to group" });
});

/** Create new child
 * @route POST /api/child
 * @access public
 */
const createChild = asyncHandler(async (req, res) => {
  const {
    name,
    dateOfbirth,
    parentName,
    parentPhone,
    address,
    institutionId,
    illness,
  } = req.body;
  if (
    !name ||
    !dateOfbirth ||
    !parentName ||
    !parentPhone ||
    !address ||
    !institutionId
  ) {
    res.status(500);
    throw new Error("all fields are reqired!");
  }
  const query =
    "INSERT INTO children (name,dateOfBirth,parentName,parentPhone,address, institutionId, illness) VALUES(?,?,?,?,?,?,?,?,?)";
  const values = [
    name,
    dateOfbirth,
    parentName,
    parentPhone,
    address,
    institutionId,
    illness,
  ];
  db.run(query, values, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  });
  res.status(201).json({ message: "Child added to database" });
});

/** Get child
 * @route GET /api/child/:id
 * @access public
 */
const getChild = (req, res) => {
  const sql = "SELECT * FROM children WHERE id=?";
  const values = [req.params.id];
  const user = db.get(sql, values, (error, row) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).send(row);
  });
};

/** update child
 * PUT /api/child/:id
 * @access public
 */
const updateChild = (req, res) => {
  const {
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolId,
    color,
    bandNumber,
    illness,
  } = req.body;
  sql = `UPDATE children SET name = ?,dateOfBirth = ?,parantName = ?,parantPhone = ?,address = ?, schoolId = ?, color = ?, bandNumber = ?, illness = ? WHERE id = ?`;
  values = [
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolId,
    color,
    bandNumber,
    illness,
    req.params.id,
  ];
  db.run(sql, values, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  });
  res.status(201).json({ message: "child modified in database" });
};

/** Delete child
 * DELETE /api/child/:id
 * @access public
 */

const deleteChild = (req, res) => {
  const sql = "DELETE FROM children WHERE id=?";
  values = req.params.id;

  db.run(sql, values, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  });
  res.status(200).json({ message: `Child deleted for ${values}` });
};

module.exports = {
  getContacts,
  createChild,
  getChild,
  updateChild,
  deleteChild,
  getChildFromGroup,
  addChilToGroup,
  getChildFromInstitution,
};
