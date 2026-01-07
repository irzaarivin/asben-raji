module.exports = async (repositories, helpers) => {
  const { response } = helpers
  const { getUserStats, getLatestUsers } = repositories.userRepositories
  const limit = 10

  try {
    const { activeCount, inactiveCount, total } = await getUserStats()
    const latestUsers = await getLatestUsers(limit)

    const activePercentage = total > 0 ? ((activeCount / total) * 100).toFixed(2) + '%' : '0%'
    const inactivePercentage = total > 0 ? ((inactiveCount / total) * 100).toFixed(2) + '%' : '0%'

    return response.success({
      activeUser: activeCount,
      activeUserPresentate: activePercentage,
      inActiveUser: inactiveCount,
      inActiveUserPresentate: inactivePercentage,
      users: latestUsers
    })
  } catch (error) {
    return response.serverError(error.message)
  }
}
