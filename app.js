const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const MongoStore = require('connect-mongo')(session);
require('./config/passport');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_UN}:${process.env.MONGO_PW}@cluster0-y5hkl.mongodb.net/lwl-draft-tool?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(console.log('MongoDB connected'))
  .catch(e => console.error(e))

app.use(cors({ origin: ['https://lvh.me', 'http://localhost:3100', 'http://localhost:5000'], credentials: true }));
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
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./routes')(app);

app.listen(3000, () => console.log('connected to port 3000'))
