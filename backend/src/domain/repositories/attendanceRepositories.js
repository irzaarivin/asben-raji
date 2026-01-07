const { Op } = require('sequelize')

module.exports = async ({ Attendance }) => {
    return {
        getAttendances: async () => {
            try {
                return Attendance.findAll()
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        findAttendanceById: async (id) => {
            try {
                return await Attendance.findByPk(id)
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        createAttendance: async (data) => {
            try {
                return await Attendance.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        updateAttendance: async (id, data) => {
            try {
                const attendance = await Attendance.findByPk(id)
                await attendance.update(data)

                return attendance
            } catch (error) {
                console.error(error);
                throw Error(error);
            }
        },

        deleteAttendance: async (id) => {
            try {
                const deletedCount = await Attendance.destroy({ where: { id } })
                return deletedCount > 0
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}