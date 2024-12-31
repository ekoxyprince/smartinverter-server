const { model, Schema, now } = require("mongoose");

const analysisSchema = new Schema({
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
  frequency: {
    type: Number,
    default: 0,
  },
  batteryStatus: {
    type: String,
    enum: ["charging", "not charging"],
    default: "not charging",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
analysisSchema.pre("save", async function (next) {
  try {
    if (this.isModified()) {
      this.updatedAt = now();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("Analysis", analysisSchema);
