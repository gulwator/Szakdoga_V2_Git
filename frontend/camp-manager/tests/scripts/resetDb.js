import { execSync } from "child_process";
async function reset() {
  execSync(
    "sqlite3 ./frontend/camp-manager/tests/test.db < ./backend/create_minimal_data.sql",
  );
}

export default reset;
