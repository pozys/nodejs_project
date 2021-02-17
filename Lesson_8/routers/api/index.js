const express = require("express");
const cors = require("cors");
const router = express.Router();

const config = require('../../config')
const task = require("./task");
const auth = require("./auth");

router.options("/v1/task", cors(config.cors.corsOptions));
router.use("/v1/task", cors(config.cors.corsOptions), task);
router.use("/v1/auth", cors(config.cors.corsOptions), auth);

module.exports = router;
