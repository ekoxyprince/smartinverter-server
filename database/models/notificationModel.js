const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const notificationSchema = new Schema({
  parameter: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: mongoose.now(),
  },
});

module.exports = model("Notification", notificationSchema);
