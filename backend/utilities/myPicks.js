module.exports = async (userId) => {
  const User = require("../models/User");
  const user = await User.findById(userId);
  const NumberOfTeams = user.draftInfo.totalTeams;
  const draftPosition = user.draftInfo.myPick;
  const picks = [];

  for (let round = 1; round <= 22; round++) {
    let draftPick;
    if (round % 2 === 0) {
      draftPick = round * NumberOfTeams - draftPosition + 1;
    } else {
      draftPick = (round - 1) * NumberOfTeams + draftPosition;
    }
    picks.push(draftPick);
  }
  return picks;
};
