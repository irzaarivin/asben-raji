const { Server } = require("socket.io");

let ioInstance = null;

const initSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  console.log("✅ Socket.IO initialized");
}

const getIO = () => {
  if (!ioInstance) throw new Error("Socket.IO belum diinisialisasi");
  return ioInstance;
}

const listenToSocketEvents = (routes, controllers, middlewares) => {
  const { SocketChecker } = middlewares

  if (!ioInstance) throw new Error("Socket.IO belum diinisialisasi");

  ioInstance.use(SocketChecker);
  
  ioInstance.on("connection", async (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

    await routes(socket, ioInstance, controllers);

    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });
}

const emitSocketEvent = (eventName, payload, to = null) => {
  const io = getIO();
  if (to) {
    console.log("sending to " + to)
    io.to(to).emit(eventName, payload);
  } else {
    io.emit(eventName, payload);
  }
}

module.exports = {
  initSocket,
  getIO,
  listenToSocketEvents,
  emitSocketEvent
};
