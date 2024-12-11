const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

// @desc Get all contracts
//@route GET /api/contracts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM children`;

  let contacts = db.all(sql, (error, rows) => {
    res.status(200).send(rows);
  });
  // console.log(contracts);
});

// @desc Create new contracts
//@route POST /api/contracts
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
  db.run(query, values);
  res.status(201).json({ message: "Child added to database" });
});

// @desc Get contract
//@route GET /api/contract/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}` });
};
// @desc update contract
//@route PUT /api/contract/:id
//@access public

const updateContact = (req, res) => {
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
  // res.status(200).json({ message: `Update Contact for ${req.params.id}` });
};

// @desc Delete contract
//@route DELETE /api/contract/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Contact deleted for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createChild,
  getContact,
  updateContact,
  deleteContact,
};
