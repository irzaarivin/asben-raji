module.exports = async (submoduleHandler) => {
    const { createSubmodule, getSubmodules, updateSubmodule, deleteSubmodule, importSubmodules } = await submoduleHandler

    const create = async (req, res, next) => {
        try {
            const data = req.body
            const result = await createSubmodule(data)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const getAll = async (req, res, next) => {
        try {
            const params = req.query
            const result = await getSubmodules(params)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const update = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await updateSubmodule({ id, data })
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const deleteOne = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await deleteSubmodule(id)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const imports = async (req, res, next) => {
        try {
            const result = await importSubmodules(req.file)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err);
        }
    }

    return { create, getAll, update, deleteOne, imports }
}