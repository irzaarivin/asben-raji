// USER HANDLERS
const createModule = require('./create')
const getModules = require('./get')
const updateModule = require('./update')
const deleteModule = require('./delete')
const importModules = require('./import')

// BIND ALL HANDLER BY USE CASE
const modules = async (repositories, helpers, emitSocketEvent) => {
    return {
        createModule: await createModule.bind(null, repositories, helpers),
        getModules: await getModules.bind(null, repositories, helpers),
        updateModule: await updateModule.bind(null, repositories, helpers),
        deleteModule: await deleteModule.bind(null, repositories, helpers),
        importModules: await importModules.bind(null, repositories, helpers),
    }
}

module.exports = modules