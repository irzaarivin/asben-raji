module.exports = async (socket, io, socketController) => {
  const { show, updateUser } = socketController

  socket.on("user:login", async (payload) => await show(socket, io, payload));
  socket.on("user:update", async (payload) => await updateUser(socket, io, payload));

};