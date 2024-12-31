const { Schema, model } = require("mongoose");

const schema = new Schema({
  batterySoc: {
    type: Number,
    default: 0,
  },
  inverterTemp: {
    type: Number,
    default: 0,
  },
  load: {
    type: Number,
    default: 0,
  },
  outputVoltage: {
    type: Number,
    default: 0,
  },
  outputCurrent: {
    type: Number,
    default: 0,
  },
  inverterOutputVoltage: {
    type: Number,
    default: 0,
  },
  batteryStatus: {
    type: String,
    enum: ["charging", "not charging"],
    default: "not charging",
  },
  frequency: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
module.exports = model("Summary", schema);
