const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const notificationModel = require("../database/models/notificationModel");

router
  .route("/details")
  .get(controller.getDetails)
  .patch(controller.updateDetails);
router.route("/notification").get(controller.getNotifications);

module.exports = router;
