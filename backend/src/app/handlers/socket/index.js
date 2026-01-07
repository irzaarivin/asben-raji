// SOCKET HANDLERS
const consoleReceived = require('./console')

// BIND ALL HANDLER BY USE CASE
const socket = async (repositories, helpers, emitSocketEvent) => {
    return {
        consoleReceived: await consoleReceived.bind(null, repositories, helpers, emitSocketEvent)
    }
}

module.exports = socket