const { createClient } = require('redis');

module.exports = async (config) => {
  const redisClient = createClient({
    url: `redis://${config.development.host}:${config.development.redis_port}`
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  await redisClient.connect();

  if (config.environment === 'development') {
    console.log('Redis connected');
  }

  return redisClient;
};
