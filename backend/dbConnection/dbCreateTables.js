const createTables = (db) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS children(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text NOT NULL,
          dateOfBirth date NOT NULL,
          parentName text NOT NULL,
          parentPhone integer NOT NULL,
          address text NOT NULL,
          schoolId integer NOT NULL,
          color integer,
          groupId integer,
          bandNumber integer,
          illness text)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS institutions(
      om INTEGER PRIMARY KEY NOT NULL,  
      name TEXT,
      address TEXT
    )`,
    (err) => {
      if (err) {
        console.error("Hiba a tábla létrehozásánál:", err.message);
        return;
      }
      console.log(
        "✅ Institutions tábla sikeresen létrehozva vagy már létezik"
      );
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS program(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text,
          institutionId integer
          )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS groups(
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
          description not null,
          maxLimit not null
          )`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS teachersInGroups(userId integer, groupId integer)`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS users(
      id integer PRIMARY KEY AUTOINCREMENT,
      username text not null,
      password text not null,
      name text not null,
      email text unique not null,
      role text not null,
      institutionId integer,
      groupId integer,
      color integer,
      bandNumber integer,
      address text)`
  );

  db.run(`CREATE TABLE IF NOT EXISTS TimeTable (
    timetableId  PRIMARY KEY
                 UNIQUE,
    startDate,
    startTime,
    programId,
    registered,
    groupId,
    holderId
);
db.run('CREATE TABLE groupsInTimetable (
    timetableId,
    groupId
);')
`);

  /* db.run(
      `CREATE TABLE IF NOT EXISTS teacher(
        id integer PRIMARY KEY AUTOINCREMENT,
           username text not null,
           password text not null,
           email text unique not null,
           institutionId integer not null,
           groupId integer,
           role text not null
           address text)`
           );
           
           db.run(
            `CREATE TABLE IF NOT EXISTS worker(
          id integer PRIMARY KEY AUTOINCREMENT,
          username text not null,
          password text not null,
          email text unique not null,
          groupId integer,
          role text not null
          address text)`
          );
          */
};
module.exports = createTables;
