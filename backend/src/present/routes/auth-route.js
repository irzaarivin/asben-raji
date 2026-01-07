const express = require('express')
const authRoutes = express.Router()

module.exports = async (authController) => {
  const { registerUser, loginUser } = authController

  authRoutes.post('/register', registerUser)
  authRoutes.post('/login', loginUser)

  return authRoutes
}
