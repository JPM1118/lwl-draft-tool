const apiHelpers = require("../helpers/apihelpers");
const playerService = require("../services/playerService");

async function getSkaters(req, res) {
  try {
    const results = await playerService.getSkaters();
    apiHelpers.success(res, "", results);
  } catch (error) {
    apiHelpers.error(res, {}, error);
    console.error(error);
  }
}
async function getGoalies(req, res) {
  try {
    const results = await playerService.getGoalies();
    apiHelpers.success(res, "", results);
  } catch (error) {
    apiHelpers.error(res, {}, error);
    console.error(error);
  }
}
async function refreshPlayerList(req, res) {
  try {
    req.app.io.emit("sendTakenPlayers", { data: req.body });
    //check if undone draft pick was user pick

    return res.status(200).json({ msg: "got it" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
    console.error(e);
  }
}

module.exports = {
  getSkaters,
  getGoalies,
  refreshPlayerList,
};
