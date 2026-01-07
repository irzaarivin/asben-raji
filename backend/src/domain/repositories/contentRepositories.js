module.exports = async ({ Content }) => {
  return {
    create: async (data) => {
      const content = new Content(data);
      return content.save();
    },
    
    findAll: async () => {
      return await Content.find().lean()
    },

    updateById: async ({ id, payload }) => {
      return await Content.findByIdAndUpdate(id, payload, { new: true })
    },

    getById: async (id) => {
      return await Content.findById(id)
    },

    remove: async (id) => {
      return await Content.findByIdAndDelete(id)
    }
  }
}
