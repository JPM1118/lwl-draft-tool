const draftInfoRouter = require("express").Router();
const User = require("../models/User");

draftInfoRouter.post("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    user.draftInfo.myPick = req.body.myPick;
    user.draftInfo.totalTeams = req.body.teams;
    await user.save();
    res.status(200).end();
  } catch (error) {
    console.error(error);
  }
});
draftInfoRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.draftInfo.myPick) {
      res.status(200).json({ myPick: 0, totalTeams: 0 });
    } else {
      const myPick = user.draftInfo.myPick;
      const totalTeams = user.draftInfo.totalTeams;
      res.status(200).json({ myPick, totalTeams });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = draftInfoRouter;
