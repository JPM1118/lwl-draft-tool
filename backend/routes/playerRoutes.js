const playerRouter = require("express").Router();
const myPicks = require("../utilities/myPicks");
const playerController = require("../controllers/playerController");

playerRouter.get("/takenplayers", async (req, res, next) => {
  playerController.getTakenPlayerList(req, res);
});
playerRouter.post("/takenplayerlist", async (req, res, next) => {
  playerController.updateTakenPlayerList(req, res);
});
playerRouter.get("/myplayers", (req, res, next) => {
  playerController.getMyPlayers(req, res);
});
playerRouter.get("/skaters", (req, res, next) => {
  playerController.getSkaters(req, res);
});
playerRouter.get("/goalies", (req, res, next) => {
  playerController.getGoalies(req, res);
});

module.exports = playerRouter;
