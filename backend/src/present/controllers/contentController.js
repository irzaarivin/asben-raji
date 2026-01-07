module.exports = async ({ createContent, getContent, updateContent, deleteContent }) => {
  const create = async (req, res, next) => {
    try {
      const result = await createContent(req.body)
      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  const get = async (req, res, next) => {
    try {
      const result = await getContent(req.body)
      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  const update = async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      const result = await updateContent({ id, data })

      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  const remove = async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await deleteContent(id)

      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  return { create, get, update, remove }
}
