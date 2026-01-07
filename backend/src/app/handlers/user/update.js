const Joi = require('joi')
const bcrypt = require('bcrypt')

const validate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Nama tidak boleh kosong!',
      'string.min': 'Nama minimal harus 3 karakter!',
      'any.required': 'Nama diperlukan!'
    }),

    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.empty': 'Username tidak boleh kosong!',
      'string.alphanum': 'Username hanya boleh berisi huruf dan angka!',
      'string.min': 'Username minimal harus 3 karakter!',
      'string.max': 'Username maksimal 30 karakter!',
      'any.required': 'Username diperlukan!'
    }),

    password: Joi.string().min(6).optional().allow(null, '').messages({
      'string.min': 'Password minimal harus 6 karakter!'
    }),

    confirmPassword: Joi.any().when('password', {
      is: Joi.exist(),
      then: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Konfirmasi password tidak cocok!',
        'string.empty': 'Konfirmasi password tidak boleh kosong!',
        'any.required': 'Konfirmasi password diperlukan!'
      }),
      otherwise: Joi.forbidden()
    }),

    role: Joi.string().valid('administrator', 'instructor', 'trainee').default('trainee').messages({
      'any.only': 'Role harus salah satu dari Administrator, Instructor, atau Trainee',
      'string.base': 'Role harus berupa string'
    }),

    status: Joi.string().valid('active', 'inactive').default('active').messages({
      'any.only': 'Status harus salah satu dari Active atau InActive',
      'string.base': 'Status harus berupa string'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, params) => {
  const { response } = helpers
  const { updateUser, getOneUser } = repositories.userRepositories
  const { id, data } = params
  const { name, username, password, role, status } = data

  const validation = await validate(data)
  if (validation) return response.invalidData(validation.message)

  const existingUser = await getOneUser({ id })
  if (!existingUser) return response.notFound("User tidak ditemukan")

  if (username) {
    const duplicate = await getOneUser({ username })
    if (duplicate && duplicate.id != id) {
      return response.conflict("Username sudah digunakan user lain")
    }
  }

  const updatePayload = { name, username, role, status }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    updatePayload.password = hashedPassword
  }

  const updatedUser = await updateUser(id, updatePayload)

  if (!updatedUser) return response.serverError(updatedUser)

  const { password: _, ...sanitizedUser } = updatedUser.toJSON
    ? updatedUser.toJSON()
    : updatedUser

  return response.success(sanitizedUser)
}
