
const createTables=(db)=>{
    
db.run(
    `CREATE TABLE IF NOT EXISTS children(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text NOT NULL,
          dateOfBirth date NOT NULL,
          parantName text NOT NULL,
          parantPhone integer NOT NULL,
          address text NOT NULL,
          schoolID integer NOT NULL,
          color integer,
          groupID integer,
          BandNumber integer,
          illness text)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS institutions(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text,
          om text UNIQUE NOT NULL,
          address text)`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS program(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text,
          institutionID integer
          )`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS groups(
          id integer PRIMARY KEY AUTOINCREMENT,
          name text,
          institutionID integer
          )`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS users(
          id integer PRIMARY KEY AUTOINCREMENT,
          username text not null,
          password text not null,
          email text unique not null,
          role text not null,
          institutionID integer,
          groupID integer,
          color integer,
          bandNumber integer,
          address text)`
  );
  
  /* db.run(
    `CREATE TABLE IF NOT EXISTS teacher(
         id integer PRIMARY KEY AUTOINCREMENT,
           username text not null,
           password text not null,
           email text unique not null,
           institutionID integer not null,
          groupID integer,
          role text not null
          address text)`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS worker(
          id integer PRIMARY KEY AUTOINCREMENT,
          username text not null,
          password text not null,
          email text unique not null,
          groupID integer,
          role text not null
          address text)`
  );
  */
  
}
module.exports = createTables