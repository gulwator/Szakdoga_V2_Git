const createTables = (db) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, 
      dateOfBirth DATE NOT NULL, 
      parentName TEXT NOT NULL, 
      parentPhone TEXT NOT NULL, 
      address TEXT NOT NULL, 
      institutionId INTEGER NOT NULL, 
      color INTEGER, 
      groupId INTEGER, 
      bandNumber INTEGER, 
      illness TEXT,
      FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE SET NULL)`,
    (err) => {
      if (err) {
        console.error("Hiba a(z) Children tábla létrehozásánál:", err.message);
        return;
      }
      console.log("✅ Children tábla sikeresen létrehozva vagy már létezik");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS institutions(
      om INTEGER PRIMARY KEY NOT NULL,  
      name TEXT,
      address TEXT
    )`,
    (err) => {
      if (err) {
        console.error(
          "Hiba a(z) institutions tábla létrehozásánál:",
          err.message
        );
        return;
      }
      console.log(
        "✅ Institutions tábla sikeresen létrehozva vagy már létezik"
      );
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS program(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          institutionId INTEGER,
          FOREIGN KEY (institutionId) REFERENCES institutions(om)
          )`,
    (err) => {
      if (err) {
        console.error("Hiba a(z) program tábla létrehozásánál:", err.message);
        return;
      }
      console.log("✅ program tábla sikeresen létrehozva vagy már létezik");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  institutionId INTEGER,
  FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE SET NULL
)`,
    (err) => {
      if (err) {
        console.error("Hiba a(z) groups tábla létrehozásánál:", err.message);
        return;
      }
      console.log("✅ groups tábla sikeresen létrehozva vagy már létezik");
    }
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS teachersInGroups (
  userId INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  PRIMARY KEY (userId, groupId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
)`,
    (err) => {
      if (err) {
        console.error(
          "Hiba a(z) teachersInGroups tábla létrehozásánál:",
          err.message
        );
        return;
      }
      console.log(
        "✅ TeachersInGroups tábla sikeresen létrehozva vagy már létezik"
      );
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  institutionId INTEGER,
  groupId INTEGER,
  color INTEGER,
  bandNumber INTEGER,
  address TEXT,
  FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE SET NULL,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE SET NULL
)`,
    (err) => {
      if (err) {
        console.error("Hiba a(z) users tábla létrehozásánál:", err.message);
        return;
      }
      console.log("✅ users tábla sikeresen létrehozva vagy már létezik");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS TimeTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startDate DATE,
  startTime TIME,
  programId INTEGER NOT NULL,
  holderId INTEGER,
  FOREIGN KEY (programId) REFERENCES program(id),
  FOREIGN KEY (holderId) REFERENCES users(id))`,
    (err) => {
      if (err) {
        console.error("Hiba a(z) TimeTable tábla létrehozásánál:", err.message);
        return;
      }
      console.log("✅ TimeTable tábla sikeresen létrehozva vagy már létezik");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS groupsInTimetable (
  timetableId INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  PRIMARY KEY (timetableId, groupId),
  FOREIGN KEY (timetableId) REFERENCES TimeTable(id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
);`,
    (err) => {
      if (err) {
        console.error(
          "Hiba a(z) GroupsInTimetable tábla létrehozásánál:",
          err.message
        );
        return;
      }
      console.log(
        "✅ GroupsInTimetable tábla sikeresen létrehozva vagy már létezik"
      );
    }
  );
};
module.exports = createTables;
