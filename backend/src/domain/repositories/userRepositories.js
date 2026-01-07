const { Op } = require('sequelize')

module.exports = async ({ User }) => {
    return {
        getUsers: async (params) => {
            try {
                const where = {}

                if (params.name) where.name = { [Op.like]: `%${params.name}%` };
                if (params.role) where.role = params.role.toLowerCase();

                return User.findAll({ where, attributes: { exclude: ['password'] } })
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        getUserStats: async () => {
            try {
                const activeCount = await User.count({ where: { status: 'active' } })
                const inactiveCount = await User.count({ where: { status: 'inactive' } })
                const total = activeCount + inactiveCount

                return { activeCount, inactiveCount, total }
            } catch (error) {
                throw error
            }
        },

        getLatestUsers: async (limit) => {
            try {
                const users = await User.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: limit || 5,
                    attributes: { exclude: ['password'] }
                })

                return users
            } catch (error) {
                throw error
            }
        },

        getOneUser: async (param) => {
            try {
                const user = await User.findOne({
                    where: param
                });
                return user;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        findUserById: async (id) => {
            try {
                return await User.findByPk(id)
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        findUserByUsername: async (username) => {
            try {
                return await User.findOne({ where: { username } })
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        createUser: async (data) => {
            try {
                return await User.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        bulkInsert: async (data) => {
            try {
                const inserted = await User.bulkCreate(data, { returning: true })
                return inserted
            } catch (error) {
                throw error
            }
        },

        // ======= DEPRECATED =======
        updateUser__DEPRECATED: async (id, data) => {
            try {
                const [affectedCount, affectedRows] = await User.update(data, {
                    where: { id },
                    returning: true,
                })

                if (affectedCount === 0) return null
                return affectedRows[0]
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        // ==========================

        updateUser: async (id, data) => {
            try {
                const user = await User.findByPk(id)
                await user.update(data)

                return user
            } catch (error) {
                console.error(error);
                throw Error(error);
            }
        },

        deleteUser: async (id) => {
            try {
                const deletedCount = await User.destroy({ where: { id } })
                return deletedCount > 0
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}