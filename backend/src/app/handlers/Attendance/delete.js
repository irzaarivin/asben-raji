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
    const { deleteAttendance, findAttendanceById } = repositories.attendanceRepositories

    const validation = validate({ id });
    if(validation) return response.invalidData(validation.message);

    const attendee = await findAttendanceById(id)
    if (!attendee) return response.notFound('Mahasiswa tidak ditemukan')

    const isDeleted = await deleteAttendance(id)
    if (!isDeleted) return response.serverError('Gagal menghapus Mahasiswa')

    return response.successNoContent()
}