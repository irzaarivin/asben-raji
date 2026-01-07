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
    const { deleteUser, getOneUser } = repositories.userRepositories

    const validation = validate({ id });
    if(validation) return response.invalidData(validation.message);

    const user = await getOneUser({ id })
    if (!user) return response.notFound('User tidak ditemukan')

    const isDeleted = await deleteUser(id)
    if (!isDeleted) return response.serverError('Gagal menghapus user')

    return response.successNoContent()
}