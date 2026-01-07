const Joi = require('joi')

const validate = (data) => {
  const schema = Joi.object({
    q: Joi.string().allow('', null).optional(),
    role: Joi.string().allow('', null).optional(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  return error;
}

const getUsers = async (repositories, helpers, params) => {
  const { response } = helpers
  const { getUsers } = repositories.userRepositories

  const validation = validate({ q: params.q, role: params.role });
  if (validation) return response.invalidData(validation.message);

  const filters = {}
  if (params.q) filters.name = params.q
  if (params.role) filters.role = params.role

  const data = await getUsers(filters)

  if (data) return response.success(data)
  return response.serverError('Gagal mengambil data user: ' + data)
}

module.exports = getUsers
