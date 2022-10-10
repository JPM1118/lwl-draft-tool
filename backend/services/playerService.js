const db = require("../database/db.js");
const SQL = require("sql-template-strings");

async function getMyPlayers() {
  try {
    let q = SQL`
    SELECT 
      tp.* 
    FROM 
      fantasy_hockey_db.total_projections tp
    JOIN
      fantasy_hockey_db.drafted_players dp USING(total_projection_id)
    WHERE
      is_my_pick = 1
        `;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}
async function getSkaters() {
  try {
    let q = SQL`
      SELECT 
        * 
      FROM 
        fantasy_hockey_db.total_projections tp
      WHERE
        POS <> "G"
        AND
        tp.total_projection_id NOT IN(
          SELECT
            total_projection_id
          FROM
            fantasy_hockey_db.drafted_players dp
          WHERE
            dp.total_projection_id = tp.total_projection_id
        )
        `;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}
async function getGoalies() {
  try {
    let q = SQL`
    SELECT 
      * 
    FROM 
      fantasy_hockey_db.total_projections tp
    WHERE
      POS = 'G'
      AND
        tp.total_projection_id NOT IN(
          SELECT
            total_projection_id
          FROM
            fantasy_hockey_db.drafted_players dp
          WHERE
            dp.total_projection_id = tp.total_projection_id
        )
    `;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}
async function getTakenPlayerList() {
  try {
    let q = SQL`
    SELECT 
      tp.* 
    FROM 
      fantasy_hockey_db.total_projections tp
    JOIN
      fantasy_hockey_db.drafted_players dp USING(total_projection_id)
    `;
    const results = await db.query(q);
    return results;
  } catch (error) {
    console.error(error);
  }
}

async function updateTakenPlayerList(players) {
  try {
    for await (player of players) {
      const insertDraftedPlayerQ = SQL`
      INSERT IGNORE INTO
        fantasy_hockey_db.drafted_players(total_projection_id,is_my_pick)
      SELECT 
        total_projection_id,
        ${player.myPick ? 1 : 0} AS is_my_pick
      FROM 
        fantasy_hockey_db.total_projections tp
      WHERE
        NAME = ${player.name}
      `;
      await db.query(insertDraftedPlayerQ);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMyPlayers,
  getSkaters,
  getGoalies,
  getTakenPlayerList,
  updateTakenPlayerList,
};
