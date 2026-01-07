const socketRoutes = require('./socket-route')
const userRoutes = require('./user-route')
const authRoutes = require('./auth-route')
const moduleRoutes = require('./module-route')
const submoduleRoutes = require('./submodule-route')
const contentRoutes = require('./content-route')
const attendanceRoutes = require('./attendance-route')

const routes = async (app, controllers, middlewares) => {
  const { usersController, authController, moduleController, submoduleController, contentController, attendanceController } = await controllers
  const { ErrorHandler, AuthChecker, RoleChecker } = middlewares

  app.use(ErrorHandler)

  // app.use('/auth', await authRoutes(authController))
  // app.use('/user', await userRoutes(usersController, AuthChecker))
  // app.use('/module', await moduleRoutes(moduleController, { AuthChecker, RoleChecker }))
  // app.use('/submodule', await submoduleRoutes(submoduleController, { AuthChecker, RoleChecker }))
  // app.use('/content', await contentRoutes(contentController, AuthChecker))
  app.use('/attendance', await attendanceRoutes(attendanceController))

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })

  return app
}

const socket = async (socket, io, controllers) => {
  const { socketController } = await controllers

  await socketRoutes(socket, io, socketController)
}

module.exports = { routes, socket }
