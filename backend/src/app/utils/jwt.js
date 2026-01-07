const jwt = require('jsonwebtoken')
const SECRET = require('../../infrastructure/config/config').secret

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '5h' })
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = { generateToken, verifyToken }
