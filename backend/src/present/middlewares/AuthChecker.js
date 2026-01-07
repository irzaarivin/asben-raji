const { verifyToken } = require('../../app/utils/jwt')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'failed',
        message: 'Missing or invalid Authorization header',
      })
    }

    const token = authHeader.split(' ')[1]

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid or expired token',
      })
    }

    req.user = decoded
    next()
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: 'Internal server error in AuthChecker',
      error: err.message,
    })
  }
}
