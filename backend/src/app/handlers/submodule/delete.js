const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().required().messages({
            'number.base': 'id harus berupa angka.',
            'any.required': 'id diperlukan dan tidak boleh kosong.'
        })
    });

    const { error } = schema.validate(data);
    return error;
}

module.exports = async (repositories, helpers, id) => {
    const { response } = helpers
    const { deleteOne, getOne } = repositories.submoduleRepositories

    const validation = validate({ id });
    if(validation) return response.invalidData(validation.message);

    const moduleData = await getOne({ id })
    if (!moduleData) return response.notFound('Sub Module tidak ditemukan')

    const isDeleted = await deleteOne(id)
    if (!isDeleted) return response.serverError('Gagal menghapus Sub Module')

    return response.successNoContent()
}