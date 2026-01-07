const express = require('express')
const attendanceRoutes = express.Router()

module.exports = async (attendanceController) => {
    attendanceRoutes.get('/', attendanceController.get)
    attendanceRoutes.post('/', attendanceController.create)
    // attendanceRoutes.get('/stats', usersController.getStats)
    // attendanceRoutes.get('/find', usersController.getById)
    attendanceRoutes.put('/:id', attendanceController.update)
    attendanceRoutes.delete('/:id', attendanceController.ddelete)
    // attendanceRoutes.post('/import', upload.single('file'), usersController.imports)

    return attendanceRoutes
};
