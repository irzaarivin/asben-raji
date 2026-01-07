const Joi = require('joi')

const validate = (data) => {
  const schema = Joi.object({
    q: Joi.string().allow('', null).optional(),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

const getSubmodules = async (repositories, helpers, params) => {
  const { response } = helpers
  const { getAll } = repositories.submoduleRepositories

  const validation = validate({ q: params.q })
  if (validation) return response.invalidData(validation.message)

  const filters = {}
  if (params.q) filters.title = params.q

  const data = await getAll(filters)

  if (data) return response.success(data)
  return response.serverError('Gagal mengambil data Module: ' + data)
}

module.exports = getSubmodules
