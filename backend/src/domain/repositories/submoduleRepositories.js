const { Op } = require('sequelize')

module.exports = async ({ Submodule, Module }) => {
    return {
        create: async (data) => {
            try {
                return await Submodule.create(data)
            } catch (error) {
                throw error
            }
        },
        bulkInsert: async (data) => {
            try {
                const inserted = await Submodule.bulkCreate(data, { returning: true })
                return inserted
            } catch (error) {
                throw error
            }
        },
        update: async (id, data) => {
            try {
                const instance = await Submodule.findByPk(id)
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

                return Submodule.findAll({
                    where,
                    // include: [{
                    //     model: Module,
                    //     as: 'Module'
                    // }]
                })
            } catch (error) {
                throw error
            }
        },
        getOne: async (param) => {
            try {
                const submoduleData = await Submodule.findOne({
                    where: param
                });
                return submoduleData;
            } catch (error) {
                throw error;
            }
        },
        deleteOne: async (id) => {
            try {
                const instance = await Submodule.findByPk(id)
                await instance.destroy()

                return instance
            } catch (error) {
                throw error;
            }
        }
    }
}