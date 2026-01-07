const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Nama tidak boleh kosong!',
      'string.min': 'Nama minimal harus 3 karakter!',
      'any.required': 'Nama diperlukan!'
    })
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, params) => {
  const { response } = helpers
  const { update, getOne } = repositories.moduleRepositories
  const { id, data } = params
  const { title } = data

  const validation = await validate(data)
  if (validation) return response.invalidData(validation.message)

  const existingModule = await getOne({ id })
  if (!existingModule) return response.notFound("Module tidak ditemukan")

  const duplicate = await getOne({ title })
  if (duplicate && duplicate.id !== id) return response.conflict("Module sudah digunakan")

  const updatedModule = await update(id, { title })
  if (!updatedModule) return response.serverError(updatedModule)

  return response.success(updatedModule)
}