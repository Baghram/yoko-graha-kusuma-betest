const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS,
  password: process.env.REDISPASS,
});

module.exports = client;
