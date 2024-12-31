const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.route("/signin").post(controller.signin);
router.route("/signup").post(controller.signup);
module.exports = router;
