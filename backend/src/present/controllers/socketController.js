module.exports = async (handlers) => {
    const { consoleReceived } = await handlers.socket
    const { socketUpdateUser } = await handlers.user

    return {
        show: async (socket, io, payload) => {
            try {
                const data = {
                    payload,
                    userId: socket.id
                }
                await consoleReceived(data);
            } catch (err) {
                socket.emit("user:login:error", { message: err.message });
            }
        },

        updateUser: async (socket, io, payload) => {
            try {
                payload.userId = socket.id
                await socketUpdateUser(payload)
            } catch (err) {
                socket.emit("user:update:error", { message: err.message });
            }
        }
    }
}