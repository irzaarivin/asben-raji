const Joi = require('joi')

const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().allow(''),
    pdf: Joi.string(),
    assetBundle: Joi.string(),
    subModule: Joi.number().messages({
      'number.base': 'SubModule harus angka!',
      'any.required': 'SubModule wajib diisi!'
    }),
    scenario: Joi.object().messages({
      'object.base': 'Scenario harus berupa object!',
      'any.required': 'Scenario wajib diisi!'
    })
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, { id, data }) => {
  const { response } = helpers
  const { updateById, getById } = repositories.contentRepositories

  try {
    const validation = validate(data)
    if (validation) return response.invalidData(validation)

    const existing = await getById(id)
    if (!existing) return response.notFound('Content tidak ditemukan')

    const updatableFields = ['title', 'description', 'pdf', 'assetBundle', 'subModule', 'scenario']
    updatableFields.forEach(field => {
        if (data[field] !== undefined && data[field] !== null && data[field] !== '') existing[field] = data[field]
    })

    const updated = await updateById({ id, existing })
    if (!updated) return response.serverError('Gagal update content')

    return response.success(updated)
  } catch (err) {
    console.error(err)
    return response.serverError('Terjadi kesalahan server')
  }
}
