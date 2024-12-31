const catchAsync = require("../utils/catchAsync");
const notificationModel = require("../database/models/notificationModel");

exports.getDetails = catchAsync(async (req, res) => {
  res.json({
    success: true,
    message: "Details retrieved",
    data: req.user,
  });
});

exports.updateDetails = catchAsync(async (req, res) => {
  const body = req.body;
  const bodyArr = Object.keys(body);
  for (let i = 0; i < bodyArr.length; i++) {
    req.user[bodyArr[i]] = body[bodyArr[i]];
  }
  await req.user.save();
  res.status(200).json({ success: true, message: "User details updated" });
});
exports.getNotifications = catchAsync(async (req, res) => {
  res.json({
    success: true,
    message: "Details Retrieved",
    data: await notificationModel.find({ user: req.user._id }),
  });
});
