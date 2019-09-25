module.exports = function (req, res, next) {
  res.sseSetup = function () {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })
  }

  res.sseSendMyTeam = function (data) {
    res.write("event: myTeamUpdate\n")
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }
  res.sseSendTaken = function (data) {
    res.write("event: takenUpdate\n")
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }
  res.sseSendTest = function (data) {
    res.write("event: test\n")
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  next()
}