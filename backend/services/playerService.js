const db = require("../database/db.js");
const SQL = require("sql-template-strings");

async function getSkaters() {
  try {
    let q = SQL`SELECT * FROM lwl_db.skaters`;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}
async function getGoalies() {
  try {
    let q = SQL`SELECT * FROM lwl_db.goalies`;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getSkaters, getGoalies };
