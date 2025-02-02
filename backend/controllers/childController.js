const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

// @desc Get all children
//@route GET /api/children
//@access public

const getContacts = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM children`;

  let contacts = db.all(sql, (error, rows) => {
    res.status(200).send(rows);
  });
});

// @desc Create new child
//@route POST /api/child
//@access public

const createChild = asyncHandler(async (req, res) => {
  const {
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolID,
    color,
    bandNumber,
    illness,
  } = req.body;
  if (
    !name ||
    !dateOfbirth ||
    !parantName ||
    !parantPhone ||
    !address ||
    !schoolID
  ) {
    res.status(400);
    throw new Error("all fields are reqired!");
  }
  const query =
    "INSERT INTO children (name,dateOfBirth,parantName,parantPhone,address, schoolID, color, Bandnumber, illness) VALUES(?,?,?,?,?,?,?,?,?)";
  const values = [
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolID,
    color,
    bandNumber,
    illness,
  ];
  const child = db.run(query, values);
  res.status(201).json({ message: "Child added to database" });
});

// @desc Get child
//@route GET /api/child/:id
//@access public

const getChild = (req, res) => {
  const sql = "SELECT * FROM children WHERE id=?";
  values = [req.params.id];
  const user = db.get(sql, values, (error, row) => {
    res.status(200).send(row);
  });
};
// @desc update child
//@route PUT /api/child/:id
//@access public

const updateChild = (req, res) => {
  const {
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolID,
    color,
    bandNumber,
    illness,
  } = req.body;
  sql = `UPDATE children SET name = ?,dateOfBirth = ?,parantName = ?,parantPhone = ?,address = ?, schoolID = ?, color = ?, Bandnumber = ?, illness = ? WHERE id = ?`;
  values = [
    name,
    dateOfbirth,
    parantName,
    parantPhone,
    address,
    schoolID,
    color,
    bandNumber,
    illness,
    req.params.id,
  ];
  db.run(sql, values);
  res.status(201).json({ message: "child modified in database" });
};

// @desc Delete child
//@route DELETE /api/child/:id
//@access public

const deleteChild = (req, res) => {
  const sql = "DELETE FROM children WHERE id=?";
  values = req.params.id;

  db.run(sql, values);
  res.status(200).json({ message: `Contact deleted for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createChild,
  getChild,
  updateChild,
  deleteChild,
};
