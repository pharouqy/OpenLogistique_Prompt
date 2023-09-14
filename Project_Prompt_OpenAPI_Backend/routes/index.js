const express = require("express");
const router = express.Router();
const open = require("../controllers/index");
const limiter = require("../midellwares/limiter");

router.post("/open", limiter, open.prompt);

module.exports = router;
