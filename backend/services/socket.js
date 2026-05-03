const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });
  });
};

const sendNotification = (userId, notification) => {
  io.to(userId).emit("new_notification", notification);
};

module.exports = { initSocket, sendNotification };