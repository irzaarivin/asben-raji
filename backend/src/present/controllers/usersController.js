module.exports = async (userHandler) => {

    const { getUsers, getUsersStats, getUserById, updateUser, deleteUser, importUsers } = await userHandler

    const get = async (req, res, next) => {
        try {
            const params = req.query
            const result = await getUsers(params)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    const getStats = async (req, res, next) => {
        try {
            const result = await getUsersStats()
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    const getById = async (req, res, next) => {
        try {
            const id = req.query.id
            const result = await getUserById(id)
            res.send(result)
        } catch (err) {
            next(err)
        }
    }

    const update = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await updateUser({ id, data })
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const ddelete = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await deleteUser(id)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    const imports = async (req, res, next) => {
        try {
            const result = await importUsers(req.file)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err);
        }
    }

    return { get, getStats, getById, update, ddelete, imports }

}