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

    // date: Joi.date().required().messages({
    //   'date.base': 'Format tanggal tidak valid!',
    //   'any.required': 'Tanggal update diperlukan!'
    // }),

    status: Joi.string().valid('hadir', 'alpha', 'sakit', 'izin').default('hadir').messages({
      'any.only': 'Status tidak valid',
      'string.base': 'Status harus berupa string'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, data) => {
  const { success, invalidData, conflict } = helpers.response
  const { createAttendance, getOneUser } = repositories.attendanceRepositories

  // const validData = {
  //   id: attendee.id,
  //   name: attendee.name,
  //   matkul: attendee.matkul,
  //   nim: attendee.nim,
  //   status: attendee.status,
  // }

  // return success({
  //   amba: "tukam"
  // })

  const validation = await validate(data)
  if (validation) return invalidData(validation)

  // const [usernameConflict, emailConflict] = await Promise.all([
  //   getOneUser({ username: data.username }),
  //   getOneUser({ email: data.email })
  // ]);

  // if (usernameConflict) return conflict("Username has been taken");
  // if (emailConflict) return conflict("Email has been taken");

  // data.password = await bcrypt.hash(data.password, 10)
  const attendee = await createAttendance(data)

  return success({
    id: attendee.id,
    name: attendee.name,
    matkul: attendee.matkul,
    nim: attendee.nim,
    status: attendee.status,
    // username: attendee.username,
    // email: attendee.email,
    // role: attendee.role,
    // createdAt: attendee.createdAt,
  })
}
