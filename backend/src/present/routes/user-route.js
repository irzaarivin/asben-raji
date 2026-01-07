const express = require('express')
const multer = require('multer')

const userRoutes = express.Router()
const upload = multer({ dest: 'uploads/imports/users/' })

module.exports = async (usersController, AuthChecker) => {
    userRoutes.use(AuthChecker)

    userRoutes.get('/', usersController.get)
    userRoutes.get('/stats', usersController.getStats)
    userRoutes.get('/find', usersController.getById)
    userRoutes.put('/:id', usersController.update)
    userRoutes.delete('/:id', usersController.ddelete)
    userRoutes.post('/import', upload.single('file'), usersController.imports)

    return userRoutes
};
