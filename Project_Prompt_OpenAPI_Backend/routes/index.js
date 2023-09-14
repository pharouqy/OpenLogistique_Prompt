const express = require("express");
const router = express.Router();
const auth = require("../midellwares/auth");
const limiter = require("../midellwares/limiter");
const open = require("../controllers/index");

router.post("/open", auth, limiter, open.prompt);

module.exports = router;
