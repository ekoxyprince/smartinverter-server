const { model, Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  location: String,
  fullname: String,
  image: String,
  sensorId: {
    type: Number,
    default: Math.floor(Math.random() * 900000 + 100000),
  },
  createdAt: {
    type: Date,
    required: true,
    default: mongoose.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: mongoose.now(),
  },
});
schema.pre("save", async function (next) {
  try {
    const password = this.password;
    if (this.isNew || this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
      this.updatedAt = mongoose.now();
    }
    if (this.isModified()) {
      this.updatedAt = mongoose.now();
    }
    next();
  } catch (error) {
    next(error);
  }
});
const userModel = model("User", schema);

module.exports = userModel;
