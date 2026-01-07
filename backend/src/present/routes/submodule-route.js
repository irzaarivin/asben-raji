const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/imports/modules/' })

module.exports = async (submoduleController, { AuthChecker, RoleChecker: AllowedRole }) => {
    const submoduleRoutes = express.Router()
    const RoleProtectSubmoduleRoutes = express.Router()

    submoduleRoutes.use(AuthChecker)
    submoduleRoutes.get('/', submoduleController.getAll)

    RoleProtectSubmoduleRoutes.use(AuthChecker, AllowedRole('administrator', 'instructor'))
    RoleProtectSubmoduleRoutes.post('/', submoduleController.create)
    RoleProtectSubmoduleRoutes.put('/:id', submoduleController.update)
    RoleProtectSubmoduleRoutes.delete('/:id', submoduleController.deleteOne)
    RoleProtectSubmoduleRoutes.post('/import', upload.single('file'), submoduleController.imports)

    submoduleRoutes.use(RoleProtectSubmoduleRoutes)

    return submoduleRoutes
}
