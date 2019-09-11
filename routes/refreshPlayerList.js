const refreshRouter = require('express').Router();
const fs = require('fs');
const path = require('path')
const myPlayers = require('../data/myPlayers.json');
const takenPlayers = require('../data/takenPlayers.json');

refreshRouter.post('/', (req, res, next) => {
  const { nameArray } = req.body.data;
  console.log(path.normalize(`../${__dirname}`));
  let fileName;
  const updateArray = (array) => {
    let newArray = [...array];
    for (const name of nameArray) {
      if (!array.includes(name)) {
        newArray = [...newArray, name]
      }
    }
    return newArray
  }
  console.log(updateArray(takenPlayers))
  if (req.body.data.isMine) {
    fileName = './data/myPlayers.json';
    fs.writeFile(fileName, updateArray(myPlayers), err => console.error(err));
  } else {
    fileName = './data/takenPlayers.json';
    fs.writeFile(fileName, JSON.stringify(updateArray(takenPlayers), null, 2), err => console.error(err));
  }
  console.log('myPlayer: ', require('../data/myPlayers.json'), 'takenPlayers: ', require('../data/takenPlayers.json'))
  res.status(200).send()

})

module.exports = refreshRouter;