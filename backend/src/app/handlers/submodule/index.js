// USER HANDLERS
const createSubmodule = require('./create')
const getSubmodules = require('./get')
const updateSubmodule = require('./update')
const deleteSubmodule = require('./delete')
const importSubmodules = require('./import')

// BIND ALL HANDLER BY USE CASE
const submodules = async (repositories, helpers, emitSocketEvent) => {
    return {
        createSubmodule: await createSubmodule.bind(null, repositories, helpers),
        getSubmodules: await getSubmodules.bind(null, repositories, helpers),
        updateSubmodule: await updateSubmodule.bind(null, repositories, helpers),
        deleteSubmodule: await deleteSubmodule.bind(null, repositories, helpers),
        importSubmodules: await importSubmodules.bind(null, repositories, helpers),
    }
}

module.exports = submodules