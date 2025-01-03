const { Server } = require("socket.io");

let io;
const socket = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "https://smartinverter-client.vercel.app",
        creditials: true,
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Error initializing socket");
    }
    return io;
  },
};
module.exports = socket;
