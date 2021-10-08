const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS,
  auth_pass: process.env.REDISPASS,
  no_ready_check: true,
});
client.auth(process.env.REDISPASS);
module.exports = client;
