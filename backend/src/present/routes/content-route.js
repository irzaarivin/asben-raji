const express = require('express')
const contentRoutes = express.Router()

module.exports = async (contentController, AuthChecker) => {
    contentRoutes.use(AuthChecker)

    contentRoutes.post('/', contentController.create)
    contentRoutes.get('/', contentController.get)
    contentRoutes.put('/:id', contentController.update)
    contentRoutes.delete('/:id', contentController.remove)

    return contentRoutes
};
