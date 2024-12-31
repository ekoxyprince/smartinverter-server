const catchAsync = require("../utils/catchAsync");
const userModel = require("../database/models/userModel");
const summaryModel = require("../database/models/summaryModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env;

exports.signin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username: username });
  if (!user) {
    throw new Error("Incorrect username entered");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Incorrect password provided");
  }
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET);
  res.json({ success: true, message: "Authentication successful", token });
});
exports.signup = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw new Error("invalid field");
  const user = await userModel.findOne({ username: username });
  if (user) throw new Error("User exists with username");
  const createdUser = await userModel.create(req.body);
  await summaryModel.create({ user: createdUser._id });
  res.json({ success: true, message: "Signup successful" });
});
