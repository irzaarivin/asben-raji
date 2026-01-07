// USER HANDLERS
const getAttendances = require('./get')
const updateAttendance = require('./update')
const deleteAttendance = require('./delete')
const createAttendance = require('./create')

// BIND ALL HANDLER BY USE CASE
const attendances = async (repositories, helpers, emitSocketEvent) => {
    return {
        getAttendances: await getAttendances.bind(null, repositories, helpers),
        updateAttendance: await updateAttendance.bind(null, repositories, helpers),
        deleteAttendance: await deleteAttendance.bind(null, repositories, helpers),
        createAttendance: await createAttendance.bind(null, repositories, helpers),
    }
}

module.exports = attendances