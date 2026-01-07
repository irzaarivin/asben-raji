module.exports = async (attendanceHandler) => {

    const { getAttendances, updateAttendance, deleteAttendance, createAttendance } = await attendanceHandler

    const get = async (req, res, next) => {
        try {
            const result = await getAttendances()
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    const create = async (req, res, next) => {
        try {
            const result = await createAttendance(req.body)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    // const getById = async (req, res, next) => {
    //     try {
    //         const id = req.query.id
    //         const result = await getUserById(id)
    //         res.send(result)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    const update = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await updateAttendance({ id, data })
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    const ddelete = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await deleteAttendance(id)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        }
    }

    // const imports = async (req, res, next) => {
    //     try {
    //         const result = await importUsers(req.file)
    //         res.status(result.statusCode).json(result.data)
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    return { get, update, ddelete, create }

}