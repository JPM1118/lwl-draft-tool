const routes = require("express").Router();

routes.use("/players", require("./playerRoutes"));

module.exports = routes;
