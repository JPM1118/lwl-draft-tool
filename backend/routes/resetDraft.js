const resetRouter = require("express").Router();
const User = require("../../models/User");

resetRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    user.takenPlayers.skaters = [];
    user.takenPlayers.goalies = [];
    user.myPlayers.skaters = [];
    user.myPlayers.goalies = [];
    await user.save();
    res.status(200).send("Reset.");
  } catch (e) {
    console.error(e);
  }
});

module.exports = resetRouter;
