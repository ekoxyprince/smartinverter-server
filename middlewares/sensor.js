const userModel = require("../database/models/userModel");
module.exports = async (req, res, next) => {
  try {
    const sensorId = req.headers["sensorauth"] ?? null;
    if (!sensorId) throw new Error("Provide a sensor ID");
    const user = await userModel.findOne({ sensorId: sensorId });
    if (!user) throw new Error("Invalid sensor ID");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
