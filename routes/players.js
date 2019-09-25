const playerRouter = require('express').Router()
const User = require('../models/User');

playerRouter.get('/getPlayerList', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
    // res.status(200).json({ "skaters": user.skaters, "goalies": user.goalies })
    res.status(200).json({ "skaters": 'skaters', "goalies": 'goalies' })
  } catch (e) {
    console.error(e)
    res.status(500).send('error.')
  }
})

playerRouter.post('/refreshPlayerList', async (req, res, next) => {
  try {
    const isAuthenticated = req.isAuthenticated();
    const { name } = req.body.data;
    const user = await User.findById(req.user.userId);
    const updateArray = (array) => {
      console.log(array)
      let newArray = [...array];
      if (!array.includes(name)) {
        newArray = [...newArray, name]
      }
      return newArray
    }
    if (req.body.data.isMine) {
      console.log('isMine', req.body.data)
    } else {
      console.log('isNotMine', req.body.data)
    }
    res.status(200).send()
  } catch (e) {
    console.error(e)
  }
})

module.exports = playerRouter