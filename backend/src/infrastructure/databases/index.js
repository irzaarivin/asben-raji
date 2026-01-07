// Require All Database Driver File
const config = require('../config/config')
const sql = require('./sql')
const mongo = require('./mongo')
const redisClient = require('./redis')

// Set Up The Database & Export All Of Them 
const { sequelize, Sequelize, Model, DataTypes } = sql(config)
const mongoose = mongo(config)
// const redis = redisClient(config)

module.exports = { sequelize, Sequelize, Model, DataTypes, mongoose }