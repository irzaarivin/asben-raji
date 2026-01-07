const { verifyToken } = require('../../app/utils/jwt')

module.exports = (socket, next) => {
  try {
    const authHeader = socket.handshake.auth?.token || socket.handshake.headers?.token;
    if (!authHeader) return next(new Error("Token tidak ditemukan"));

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    socket.user = decoded
    next()
  } catch (err) {
    next(new Error("Token tidak valid"));
  }
}