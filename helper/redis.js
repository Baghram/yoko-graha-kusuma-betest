const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS,
  tls: {
    rejectUnauthorized: false,
  },
});
client["auth"] = null;
client.sendCommand('AUTH', ["", process.env.REDISPASS])
client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
