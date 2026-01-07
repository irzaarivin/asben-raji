const console = async (repositories, helpers, emitSocketEvent, data) => {
   await emitSocketEvent('user:login', data, data.userId)
}

module.exports = console