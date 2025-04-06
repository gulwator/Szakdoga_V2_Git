const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/**
 * Get all the programs with limits for táboroztato timetable fokepernyo.
 * Maybe users too.
 */
const getProgramsWithLimits = asyncHandler(async (req, res) => {
  let sql = `SELECT DISTINCT 
    tt.startDate AS datum, 
    tt.startTime AS idopont, 
    p.name AS program, 
    (
        SELECT COALESCE(COUNT(c.id), 0) 
        FROM groupsInTimetable git
        LEFT JOIN children c ON git.groupId = c.groupId
        WHERE git.timetableId = tt.id
    ) AS regisztraltakszama,
     p."limit" as maxFerohely
FROM TimeTable tt
LEFT JOIN program p ON tt.programId = p.id
LEFT JOIN groupsInTimetable git ON tt.id = git.timetableId
LEFT JOIN groups g ON git.groupId = g.id
LEFT JOIN teachersInGroups tig ON g.id = tig.groupId
LEFT JOIN users u ON tig.userId = u.id
LEFT JOIN institutions i ON u.institutionId = i.om;`;
  db.all(sql, (error, rows) => {
    console.log("asd");
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    } else {
      res.status(200).send(rows);
    }
  });
});

/**
 * register New program for the group
 * @access public
 * POST /api/programs/registerForProgram
 */
const registerForProgram = asyncHandler(async (req, res) => {
  let sql =
      "Insert Or Ignore Into groupsInTimetable(timetableId, groupId) VALUES(?,?)",
    [timetableId, groupId] = req.body;
  db.run(sql, [timetableId, groupId], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: "group registered for the program" });
  });
});

/** Get all the programs with the groupId
 * GET /api/programs/:groupId/getPrograms
 */
const getProgramsForTheGroup = asyncHandler(async (req, res) => {
  let sql = `SELECT DISTINCT 
    tt.startDate AS datum, 
    tt.startTime AS idopont, 
    p.name AS program
FROM TimeTable tt
LEFT JOIN program p ON tt.programId = p.id
LEFT JOIN groupsInTimetable git ON tt.id = git.timetableId
LEFT JOIN groups g ON git.groupId = g.id
LEFT JOIN teachersInGroups tig ON g.id = tig.groupId
LEFT JOIN users u ON tig.userId = u.id
LEFT JOIN institutions i ON u.institutionId = i.om
where g.id=${req.params.groupId}`;
  db.all(sql, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    } else {
      res.status(200).send(rows);
    }
  });
});

/** Set institution for the program
 *
 */

module.exports = {
  getProgramsWithLimits,
  registerForProgram,
  getProgramsForTheGroup,
};
