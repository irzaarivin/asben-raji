const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required().messages({
        'number.base': 'id harus berupa angka.',
        'any.required': 'id diperlukan dan tidak boleh kosong.'
    }),
    userId: Joi.string().required().messages({
        'string.empty': 'User ID tidak boleh kosong!',
        'any.required': 'User ID diperlukan!'
    }),
    name: Joi.string().min(3).messages({
        'string.empty': 'Nama tidak boleh kosong!',
        'string.min': 'Nama minimal harus 3 karakter!',
    }),
    isActive: Joi.boolean().default(true).messages({
        'boolean.base': 'Status aktif harus berupa true atau false'
    }),
  })

  const { error } = schema.validate(data);
  return error;
}

const socketUpdateUser = async (repositories, helpers, emitSocketEvent, { userId, id, data }) => {
    try {
        const { updateUser } = repositories.userRepositories

        const validation = await validate({ userId, id, ...data });
        if (validation) {
            const error = new Error(validation.message);
            error.details = validation;
            throw error;
        }

        const callback = await updateUser(id, data).then(result => {
            return result
        })

        await emitSocketEvent('user:update:response', callback, userId)
    } catch (error) {
        await emitSocketEvent('user:update:error', { error }, userId)
    }
}

module.exports = socketUpdateUser