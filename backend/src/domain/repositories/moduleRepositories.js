const { Op } = require('sequelize')

module.exports = async ({ Module }) => {
    return {
        create: async (data) => {
            try {
                return await Module.create(data)
            } catch (error) {
                throw error
            }
        },
        bulkInsert: async (data) => {
            try {
                const inserted = await Module.bulkCreate(data, { returning: true })
                return inserted
            } catch (error) {
                throw error
            }
        },
        update: async (id, data) => {
            try {
                const instance = await Module.findByPk(id)
                await instance.update(data)

                return instance
            } catch (error) {
                throw error
            }
        },
        getAll: async (params) => {
            try {
                const where = {}

                if (params.title) where.title = { [Op.like]: `%${params.title}%` };

                return Module.findAll({ where })
            } catch (error) {
                throw error
            }
        },
        getOne: async (param) => {
            try {
                const moduleData = await Module.findOne({
                    where: param
                });
                return moduleData;
            } catch (error) {
                throw error;
            }
        },
        deleteOne: async (id) => {
            try {
                const instance = await Module.findByPk(id)
                await instance.destroy()

                return instance
            } catch (error) {
                throw error;
            }
        }
    }
}