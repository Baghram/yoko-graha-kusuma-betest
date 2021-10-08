const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS,
});
client.sendCommand('AUTH', ["", process.env.REDISPASS])
client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
