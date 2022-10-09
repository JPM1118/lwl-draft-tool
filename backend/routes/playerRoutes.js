const playerRouter = require("express").Router();
const myPicks = require("../utilities/myPicks");
const playerController = require("../../controllers/playerController");

playerRouter.post("/refreshplayerlist", async (req, res, next) => {
  playerController.refreshPlayerList(req, res);
});
playerRouter.get("/skaters", (req, res, next) => {
  playerController.getSkaters(req, res);
});
playerRouter.get("/goalies", (req, res, next) => {
  playerController.getGoalies(req, res);
});

module.exports = playerRouter;
