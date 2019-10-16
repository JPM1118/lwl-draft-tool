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


mongoose.connect(
  `mongodb+srv://${process.env.MONGO_UN}:${process.env.MONGO_PW}@cluster0-y5hkl.mongodb.net/lwl-draft-tool?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(console.log('MongoDB connected'))
  .catch(e => console.error(e))
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ credentials: true }));
} else {
  app.use(cors({ origin: ['https://lvh.me', 'http://localhost:3100', 'http://localhost:5000', 'chrome-extension://mcodgdbeipnacaefflopimhekfcpclbc'], credentials: true }));
}
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
app.use('/', require('./routes/index'))
server.listen(3000, () => console.log('connected to port 3000'))
