require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'anjay-gacor-kang',
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  development: {
    // MySQL
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'template',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',

    // MongoDB
    mongo_host: process.env.MONGO_HOST || 'localhost',
    mongo_port: process.env.MONGO_PORT || 27017,
    mongo_database: process.env.MONGO_DB || 'mongodb',
    mongo_user: process.env.MONGO_USER || 'irzaarivin',
    mongo_pass: process.env.MONGO_PASS || 'irzaarivin',
    mongo_authSource: process.env.MONGO_AUTHSOURCE || 'admin',

    // Minio
    minio_region: process.env.MINIO_REGION || 'us-east-1',
    minio_endpoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
    minio_access_key: process.env.MINIO_ACCESS_KEY || 'minio',
    minio_secret_key: process.env.MINIO_SECRET_KEY || 'minio',
    minio_bucket: process.env.MINIO_BUCKET || 'minio_bucket',

    // Redis
    redis_port: process.env.REDIS_PORT || 6379,
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME_TEST || 'template_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME_PROD || 'template_prod',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
