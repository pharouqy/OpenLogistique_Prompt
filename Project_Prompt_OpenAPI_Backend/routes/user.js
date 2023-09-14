const express = require("express");
const router = express.Router();
const limiter = require("../midellwares/limiter");
const contrlrUser = require("../controllers/user");

router.post("/login", limiter, contrlrUser.login);
router.post("/register", limiter, contrlrUser.register);

module.exports = router;
