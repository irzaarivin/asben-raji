const xlsx = require('xlsx')
const bcrypt = require('bcrypt')

module.exports = async (repositories, helpers, file) => {
  const { response } = helpers
  const { bulkInsert } = repositories.userRepositories

  if (!file) return response.invalidData("File tidak ditemukan")

  try {
    const workbook = xlsx.readFile(file.path)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = xlsx.utils.sheet_to_json(sheet)

    if (!jsonData.length) return response.invalidData("File kosong atau tidak sesuai format")

    const users = await Promise.all(
      jsonData.map(async (row, index) => {
        if (!row.name || !row.email || !row.username || !row.password) {
          throw new Error(`Baris ${index + 2}: Semua kolom wajib diisi`)
        }

        if (row.status && !['active', 'inactive'].includes(row.status.toLowerCase())) {
          throw new Error(`Baris ${index + 2}: Status hanya boleh 'active' atau 'inactive'`)
        }

        const hashedPassword = await bcrypt.hash(String(row.password), 10)

        return {
          name: row.name,
          email: row.email,
          username: row.username,
          password: hashedPassword,
          status: row.status ? row.status.toLowerCase() : 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
    )

    const inserted = await bulkInsert(users)

    return response.success(inserted.map(user => {
      const { password, ...sanitized } = user.toJSON ? user.toJSON() : user
      return sanitized
    }))
  } catch (error) {
    return response.invalidData(error.message)
  }
}
