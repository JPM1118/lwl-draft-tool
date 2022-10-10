const apiHelpers = require("../helpers/apihelpers");
const playerService = require("../services/playerService");

async function getMyPlayers(req, res) {
  try {
    const results = await playerService.getMyPlayers();
    apiHelpers.success(res, "", results);
  } catch (error) {
    apiHelpers.error(res, {}, error);
    console.error(error);
  }
}
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
async function getTakenPlayerList(req, res) {
  try {
    const results = await playerService.getTakenPlayerList();
    apiHelpers.success(res, "", results);
  } catch (error) {
    apiHelpers.error(res, {}, error);
    console.error(error);
  }
}
async function updateTakenPlayerList(req, res) {
  try {
    const data = req.body;
    await playerService.updateTakenPlayerList(data);
    const [takenPlayerList, availableGoalies, availableSkaters, myPlayers] =
      await Promise.all([
        playerService.getTakenPlayerList(),
        playerService.getGoalies(),
        playerService.getSkaters(),
        playerService.getMyPlayers(),
      ]);

    req.app.io.emit("sendTakenPlayers", { data: takenPlayerList });
    req.app.io.emit("sendAvailableSkaters", { data: availableSkaters });
    req.app.io.emit("sendAvailableGoalies", { data: availableGoalies });
    req.app.io.emit("sendMyPlayers", { data: myPlayers });
    //check if undone draft pick was user pick

    return res.status(200).json({ msg: "got it" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
    console.error(e);
  }
}

module.exports = {
  getMyPlayers,
  getSkaters,
  getGoalies,
  getTakenPlayerList,
  updateTakenPlayerList,
};
