const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/imports/modules/' })

module.exports = async (moduleController, { AuthChecker, RoleChecker: AllowedRole }) => {
    const moduleRoutes = express.Router()
    const RoleProtectModuleRoutes = express.Router()

    moduleRoutes.use(AuthChecker)
    moduleRoutes.get('/', moduleController.getAll)

    RoleProtectModuleRoutes.use(AuthChecker, AllowedRole('administrator', 'instructor'))
    RoleProtectModuleRoutes.post('/', moduleController.create)
    RoleProtectModuleRoutes.put('/:id', moduleController.update)
    RoleProtectModuleRoutes.delete('/:id', moduleController.deleteOne)
    RoleProtectModuleRoutes.post('/import', upload.single('file'), moduleController.imports)

    moduleRoutes.use(RoleProtectModuleRoutes)

    return moduleRoutes
}
