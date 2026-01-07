const getAttendances = async (repositories, helpers) => {
  const { response } = helpers
  const { getAttendances } = repositories.attendanceRepositories

  const data = await getAttendances()

  if (data) return response.success(data)
  return response.serverError('Gagal mengambil data Mahasiswa: ' + data)
}

module.exports = getAttendances