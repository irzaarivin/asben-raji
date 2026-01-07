// USER HANDLERS
const getUsers = require('./get')
const getUsersStats = require('./statistics')
const getUserById = require('./get-by-id')
const updateUser = require('./update')
const socketUpdateUser = require('./update-from-socket')
const deleteUser = require('./delete')
const importUsers = require('./import')

// BIND ALL HANDLER BY USE CASE
const users = async (repositories, helpers, emitSocketEvent) => {
    return {
        getUsers: await getUsers.bind(null, repositories, helpers),
        getUsersStats: await getUsersStats.bind(null, repositories, helpers),
        getUserById: await getUserById.bind(null, repositories, helpers),
        updateUser: await updateUser.bind(null, repositories, helpers),
        socketUpdateUser: await socketUpdateUser.bind(null, repositories, helpers, emitSocketEvent),
        deleteUser: await deleteUser.bind(null, repositories, helpers),
        importUsers: await importUsers.bind(null, repositories, helpers),
    }
}

module.exports = users