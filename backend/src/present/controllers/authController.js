module.exports = async ({ register, login }) => {
  const registerUser = async (req, res, next) => {
    try {
      const result = await register(req.body)
      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  const loginUser = async (req, res, next) => {
    try {
      const result = await login(req.body)
      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  return { registerUser, loginUser }
}
