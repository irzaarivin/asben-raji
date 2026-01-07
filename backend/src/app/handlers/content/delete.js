const Joi = require('joi')

const validate = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'id harus berupa UUID.',
      'any.required': 'id diperlukan dan tidak boleh kosong.'
    })
  })

  const { error } = schema.validate(data)
  return error
}

module.exports = async (repositories, helpers, id) => {
  const { remove } = repositories.contentRepositories
  const { response } = helpers

  try {
    const validation = validate({ id })
    if(validation) return response.invalidData(validation.message)

    const deleted = await remove(id)
    if (!deleted) return response.notFound('Content tidak ditemukan')

    return response.successNoContent()
  } catch (err) {
    console.error('❌ Error deleting content:', err)
    return response.error(res, 'Gagal menghapus content')
  }
}
