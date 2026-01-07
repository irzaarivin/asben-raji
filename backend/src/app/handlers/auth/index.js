// AUTH HANDLERS
const register = require('./register')
const login = require('./login')

// BIND ALL HANDLER BY USE CASE
const auth = async (repositories, helpers, emitSocketEvent) => {
    return {
        register: await register.bind(null, repositories, helpers, emitSocketEvent),
        login: await login.bind(null, repositories, helpers, emitSocketEvent),
    }
}

module.exports = auth