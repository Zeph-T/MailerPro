const express = require("express");
const cors = require("cors");
const isAuthenticated = require("./AuthMiddleware");
const indexRouter = require("./src/routes/index");

const app = express();

global.__basedir = __dirname;

app.use(cors());
app.use(express.json());
app.use(isAuthenticated);
app.use(indexRouter);

module.exports = app;
