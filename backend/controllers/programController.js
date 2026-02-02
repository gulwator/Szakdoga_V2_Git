const { db } = require("../dbConnection/dbConnection");
const asyncHandler = require("express-async-handler");

/**
 * Get all the programs with limits for táboroztato timetable fokepernyo.
 * Maybe users too.
 */
const getProgramsWithLimits = asyncHandler(async (req, res) => {
  let sql = `SELECT DISTINCT tt.id AS id,
    tt.startDate AS datum, 
    tt.startTime AS idopont, 
    p.name AS program, 
    p.description AS leiras,
    (
        SELECT COALESCE(COUNT(c.id), 0) 
        FROM groupsInTimetable git
        LEFT JOIN children c ON git.groupId = c.groupId
        WHERE git.timetableId = tt.id
    ) AS regisztraltakszama,
     p.childLimit as maxFerohely
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
 * register group for the program
 * @access public
 * POST /api/programs/registerForProgram
 */
const registerForProgram = asyncHandler(async (req, res) => {
  const { timetableId, groupId } = req.body;
  try {
    const programCapacity = await new Promise((resolve, reject) => {
      db.get(
        "SELECT childLimit FROM program WHERE id = ?",
        [timetableId],
        (error, row) => (error ? reject(error) : resolve(row))
      );
    });
    if (!programCapacity) {
      return res.status(404).json({ error: "Program not found" });
    }
    const capacity = programCapacity.childLimit;

    const registeredCount = await new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(children.id) AS total
        FROM groupsInTimetable
        JOIN groups ON groups.id = groupsInTimetable.groupId
        JOIN children ON children.groupId = groups.id
        WHERE groupsInTimetable.timetableId = ?`,
        [timetableId],
        (error, row) => (error ? reject(error) : resolve(row))
      );
    });

    const groupSize = await new Promise((resolve, reject) => {
      db.get(
        "SELECT COUNT(*) AS 'count' FROM children WHERE groupId = ?",
        [groupId],
        (error, row) => (error ? reject(error) : resolve(row))
      );
    });
    console.log(groupSize);

    const totalAfterRegistration = registeredCount.total + groupSize.count;

    if (totalAfterRegistration > capacity) {
      return res.status(400).json({
        error:
          "A program befogadó képessége nem elegendő. A friss adatokért kérem töltse újra az oldalt.",
      });
    }

    db.run(
      "INSERT OR IGNORE INTO groupsInTimetable (timetableId, groupId) VALUES (?, ?)",
      [timetableId, groupId],
      function (error) {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        if (this.changes === 0) {
          // Nem történt beszúrás, már létezett
          return res.status(200).json({
            message: "Ez a csoport már regisztrálva van erre a programra.",
          });
        }
        res
          .status(201)
          .json({ message: "Csoport sikeresen regisztrálva a programra." });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Szerverhiba történt." });
  }
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

module.exports = {
  getProgramsWithLimits,
  registerForProgram,
  getProgramsForTheGroup,
};
