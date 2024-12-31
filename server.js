const app = require("./app");
const httpServer = require("node:http").createServer(app);
const socket = require("./socket");
const userModel = require("./database/models/userModel");
require("dotenv").config();
const connectToDb = require("./database");
const jwt = require("jsonwebtoken");

const io = socket.init(httpServer);
connectToDb().then((connected) => {
  console.log("connected to database");
  httpServer.listen(3000);
});
httpServer.on("listening", () => {
  console.log("listening on port 3000");
});
io.on("connection", async (socket) => {
  try {
    const { token } = socket.handshake.auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded?.id);
    if (!user) return null;
    socket.join(user.sensorId);
    console.log("Connnected on socket ", socket.id);
  } catch (error) {
    console.log(error);
  }
});
