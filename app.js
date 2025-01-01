const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const sensorRoutes = require("./routes/sensor");
const { notFound, errorHandler } = require("./middlewares/error");
const auth = require("./middlewares/auth");
const logger = require("morgan");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "https://smartinverter-client.vercel.app" }));
app.use(compression());
app.use(logger("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", [auth], userRoutes);
app.use("/api/v1/sensor", sensorRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
