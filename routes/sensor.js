const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensor");
const auth = require("../middlewares/auth");
const sensorAuth = require("../middlewares/sensor");

router.route("/analysis").get([auth], controller.getAnalysisData);
router.route("/summary").get([auth], controller.getSensorSummary);
router.route("/record").post([sensorAuth], controller.postAnalysisData);

module.exports = router;
