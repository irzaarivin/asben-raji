const xlsx = require('xlsx')
const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Module tidak boleh kosong!',
      'string.min': 'Module minimal harus 3 karakter!',
      'any.required': 'Module diperlukan!'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, file) => {
  const { response } = helpers
  const { bulkInsert } = repositories.moduleRepositories

  if (!file) return response.invalidData("File tidak ditemukan")

  try {
    const workbook = xlsx.readFile(file.path)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = xlsx.utils.sheet_to_json(sheet)

    if (!jsonData.length) return response.invalidData("File kosong atau tidak sesuai format")

    const modules = jsonData.map(row => ({
      title: row.module,
    }))

    const errorUnique = await Promise.all(modules.map(async (mod) => {
      const existing = await repositories.moduleRepositories.getOne({ title: mod.title })
      if (existing) {
        const error = new Error(mod.title)
        return error
      }
    }))

    const uniqueErrors = errorUnique.filter(err => err !== undefined).map(err => ({
      status: "failed",
      module: err.message,
      message: "This module already exists",
    }))

    if (uniqueErrors.length) {
      return response.invalidData(uniqueErrors)
    }

    // const uniqueErrors = errorUnique.filter(err => err !== undefined)
    // if (uniqueErrors.length) {
    //   const errorUniqueMessages = uniqueErrors.map(err => err.message).join(', ')
    //   return response.invalidData(uniqueErrors)
    // }

    const validationResults = await Promise.all(modules.map(mod => validate(mod)))
    const errors = validationResults.filter(result => result !== undefined)

    if (errors.length) {
      const errorMessages = errors.map(err => err.message).join(', ')
      return response.invalidData(`Validasi gagal: ${errorMessages}`)
    }

    const inserted = await bulkInsert(modules)

    return response.success(inserted)
  } catch (error) {
    return response.serverError(error)
  }
}
