const express = require("express");
const router = express.Router();
const limiter = require("../midellwares/limiter");
const contrlrUser = require("../controllers/user");
const auth = require("../midellwares/auth");

router.post("/login", limiter, contrlrUser.login);
router.post("/register", limiter, contrlrUser.register);
router.get("/logout", auth, contrlrUser.logout);

module.exports = router;
