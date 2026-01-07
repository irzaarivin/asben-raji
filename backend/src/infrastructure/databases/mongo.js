const mongoose = require('mongoose')

module.exports = async (config) => {
  const {
    host,
    mongo_port,
    mongo_database,
    mongo_user,
    mongo_pass,
    mongo_authSource
  } = config.development

  const authString = mongo_user && mongo_pass ? `${mongo_user}:${mongo_pass}@` : ''
  const authQuery = mongo_user && mongo_pass ? `?authSource=${mongo_authSource || mongo_database}` : ''

  const uri = `mongodb://${authString}${host}:${mongo_port}/${mongo_database}${authQuery}`

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (config.environment === 'development') {
      mongoose.set('debug', true)
    }

    console.log(`✅ MongoDB connected to ${uri}`)
    return mongoose
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}
