const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Nama tidak boleh kosong!',
      'string.min': 'Nama minimal harus 3 karakter!',
      'any.required': 'Nama diperlukan!'
    }),

    nim: Joi.string().pattern(/^[0-9]+$/).min(5).required().messages({
      'string.empty': 'NIM tidak boleh kosong!',
      'string.pattern.base': 'NIM hanya boleh berisi angka!',
      'string.min': 'NIM minimal 5 digit!',
      'any.required': 'NIM diperlukan!'
    }),

    matkul: Joi.string().min(3).required().messages({
      'string.empty': 'Mata Kuliah tidak boleh kosong!',
      'string.min': 'Mata Kuliah minimal harus 3 karakter!',
      'any.required': 'Mata Kuliah diperlukan!'
    }),

    date: Joi.date().required().messages({
      'date.base': 'Format tanggal tidak valid!',
      'any.required': 'Tanggal update diperlukan!'
    }),

    status: Joi.string().valid('hadir', 'alpha', 'sakit', 'izin').default('hadir').messages({
      'any.only': 'Status tidak valid',
      'string.base': 'Status harus berupa string'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, params) => {
  const { response } = helpers
  const { updateAttendance, findAttendanceById } = repositories.attendanceRepositories
  const { id, data } = params
  const { name, nim, matkul, date, status } = data

  const validation = await validate(data)
  if (validation) return response.invalidData(validation.message)

  const existingAttendee = await findAttendanceById(id)
  if (!existingAttendee) return response.notFound("Mahasiswa tidak ditemukan")

  const updatePayload = { name, nim, matkul, updatedAt: date, status }
  const updatedAttendee = await updateAttendance(id, updatePayload)

  if (!updatedAttendee) return response.serverError(updatedAttendee)

  const { password: _, ...sanitizedUser } = updatedAttendee.toJSON
    ? updatedAttendee.toJSON()
    : updatedAttendee

  return response.success(sanitizedUser)
}
