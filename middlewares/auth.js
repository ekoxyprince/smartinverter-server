const jwt = require("jsonwebtoken");
const env = process.env;
const userModel = require("../database/models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      throw new Error("Invalid auth token");
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const id = decoded.id;
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Invalid auth token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
