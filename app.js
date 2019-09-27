const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const MongoStore = require('connect-mongo')(session);
require('./config/passport');

//custom middleware

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_UN}:${process.env.MONGO_PW}@cluster0-y5hkl.mongodb.net/lwl-draft-tool?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(console.log('MongoDB connected'))
  .catch(e => console.error(e))

app.use(cors({ origin: ['https://lvh.me', 'http://localhost:3100', 'http://localhost:5000', 'chrome-extension://mcodgdbeipnacaefflopimhekfcpclbc'], credentials: true }));
app.use(
  session({
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52, // 1 year
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'imasecret',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }),
);
app.use(express.json({ limit: '50mb' }))
app.use(passport.initialize());
app.use(passport.session());
app.io = io;
require('./routes')(app);
// io.on('connection', function (socket) {
//   let count = 0;
//   const Update = require('./utilities/UpdateNotifier');
//   Update.on('sendTakenPlayers', function (players) {
//     socket.emit('sendTakenPlayers', players)
//     count = count++
//   })
//   Update.on('sendMyPlayers', function (players) {
//     socket.emit('sendMyPlayers', players)
//     count = count++
//   })
// })

server.listen(3000, () => console.log('connected to port 3000'))
