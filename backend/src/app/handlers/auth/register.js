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

    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.email': 'Format email tidak valid!',
      'any.required': 'Email diperlukan!'
    }),

    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.min': 'Password minimal harus 6 karakter!',
      'any.required': 'Password diperlukan!'
    }),

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Konfirmasi password tidak cocok!',
      'string.empty': 'Konfirmasi password tidak boleh kosong!',
      'any.required': 'Konfirmasi password diperlukan!'
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

module.exports = async (repositories, helpers, emitSocketEvent, data) => {
  const { success, invalidData, conflict } = helpers.response
  const { createUser, getOneUser } = repositories.userRepositories

  const validation = await validate(data)
  if (validation) return invalidData(validation)

  const [usernameConflict, emailConflict] = await Promise.all([
    getOneUser({ username: data.username }),
    getOneUser({ email: data.email })
  ]);

  if (usernameConflict) return conflict("Username has been taken");
  if (emailConflict) return conflict("Email has been taken");

  data.password = await bcrypt.hash(data.password, 10)
  const user = await createUser(data)

  return success({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  })
}
