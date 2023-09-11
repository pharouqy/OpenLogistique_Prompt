const express = require("express");
const router = express.Router();
const open = require("../controllers/index");

router.post("/open", open.prompt);

module.exports = router;
