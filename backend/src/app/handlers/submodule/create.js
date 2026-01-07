const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    module_id: Joi.number().required().messages({
      'number.base': 'Module ID harus angka!',
      'any.required': 'Module ID diperlukan!'
    }),
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
    const { create, getOne } = repositories.submoduleRepositories
    const { getOne: getOneModule } = repositories.moduleRepositories

    const validation = await validate(data)
    if (validation) return response.invalidData(validation)

    const moduleExist = await getOneModule({ id: data.module_id })
    if (!moduleExist) return response.notFound("Module tidak ditemukan")

    const sameSubmodule = await getOne({ title: data.title })
    if (sameSubmodule) return response.conflict("Sub Module sudah digunakan")

    const createdSubmodule = await create(data)

    if (createdSubmodule) return response.success(createdSubmodule)
    return response.serverError(createdSubmodule)
  } catch(error) {
    throw Error(error)
  }
}
