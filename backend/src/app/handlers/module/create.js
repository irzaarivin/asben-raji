const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Module tidak boleh kosong!',
      'string.min': 'Module minimal harus 3 karakter!',
      'any.required': 'Module diperlukan!'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, data) => {
  try {
    const { response } = helpers
    const { create, getOne } = repositories.moduleRepositories

    const validation = await validate(data)
    if (validation) return response.invalidData(validation)

    const sameModule = await getOne({ title: data.title })
    if (sameModule) return response.conflict("Module sudah digunakan")

    const createdModule = await create(data)

    if (createdModule) return response.success(createdModule)
    return response.serverError(createdModule)
  } catch(error) {
    throw Error(error)
  }
}
