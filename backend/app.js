const express = require("express");

const cors = require("cors");
require("dotenv").config();
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

var PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.io = io;
app.use("/", require("./routes/index"));
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
