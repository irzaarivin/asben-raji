module.exports = async (moduleHandler) => {
    const { createModule, getModules, updateModule, deleteModule, importModules } = await moduleHandler

    const create = async (req, res, next) => {
        try {
            const data = req.body
            const result = await createModule(data)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const getAll = async (req, res, next) => {
        try {
            const params = req.query
            const result = await getModules(params)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const update = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await updateModule({ id, data })
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const deleteOne = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await deleteModule(id)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const imports = async (req, res, next) => {
        try {
            const result = await importModules(req.file)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err);
        }
    }

    return { create, getAll, update, deleteOne, imports }
}