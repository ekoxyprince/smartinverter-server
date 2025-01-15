const analysisModel = require("../database/models/analysisModel");
const summaryModel = require("../database/models/summaryModel");
const notificationModel = require("../database/models/notificationModel");
const catchAsync = require("../utils/catchAsync");
const socket = require("../socket");

exports.getSensorSummary = catchAsync(async (req, res) => {
  const summary = await summaryModel.findOne({ user: req.user._id });
  if (!summary) throw new Error("Bad request received");
  res.status(200).json({
    success: true,
    message: "Sensory summary retrieved",
    data: summary,
  });
});

exports.getAnalysisData = catchAsync(async (req, res) => {
  const analysis = await analysisModel
    .find({ user: req.user.id })
    .limit(10)
    .sort("-createdAt");
  if (!analysis) throw new Error("Bad request received");
  const temperatures = analysis
    .map((a) => {
      return {
        name: new Date(a.createdAt).toUTCString(),
        temp: a.inverterTemp,
      };
    })
    .reverse();
  const batterySoc = analysis
    .map((a) => {
      return {
        name: new Date(a.createdAt).toUTCString(),
        soc: a.batterySoc,
      };
    })
    .reverse();
  const load = analysis
    .map((a) => {
      return { name: new Date(a.createdAt).toUTCString(), load: a.load };
    })
    .reverse();
  res.status(200).json({
    success: true,
    message: "Analysis retrieved",
    data: { temperatures, batterySoc, load },
  });
});
exports.postAnalysisData = catchAsync(async (req, res) => {
  await analysisModel.create({
    ...req.body,
    user: req.user._id,
    createdAt: Date.now(),
  });
  const summary = await summaryModel.findOne({ user: req.user.id });
  const bodyArr = Object.keys(req.body);
  for (let i = 0; i < bodyArr.length; i++) {
    summary[bodyArr[i]] = req.body[bodyArr[i]];
  }
  const dt = req.body;
  if (dt.inverterTemp > 37) {
    await notificationModel.create({
      user: req.user._id,
      title: `Inverter current temperature ${dt.inverterTemp}`,
      parameter: "Temperature",
    });
  }
  if (dt.batteryStatus && summary.batteryStatus !== dt.batteryStatus) {
    await notificationModel.create({
      user: req.user._id,
      title: `Your Battery status ${dt.batteryStatus}`,
      parameter: "Battery",
    });
  }
  const updatedSummary = await summary.save();
  const analysis = await analysisModel
    .find({ user: req.user.id })
    .limit(10)
    .sort("-createdAt");
  if (!summary) throw new Error("Bad request received");
  const temperatures = analysis
    .map((a) => {
      return {
        name: new Date(a.createdAt).toUTCString(),
        temp: a.inverterTemp,
      };
    })
    .reverse();
  const batterySoc = analysis
    .map((a) => {
      return {
        name: new Date(a.createdAt).toUTCString(),
        soc: a.batterySoc,
      };
    })
    .reverse();
  const load = analysis
    .map((a) => {
      return { name: new Date(a.createdAt).toUTCString(), load: a.load };
    })
    .reverse();
  const data = { temperatures, batterySoc, load };
  const getIo = socket.getIo();
  getIo.to(req.user.sensorId).emit("analysis-update", data);
  getIo.to(req.user.sensorId).emit("summary-update", updatedSummary);
  res.json({ success: true, message: "Event emitted" });
});
