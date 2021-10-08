const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS,
});
client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
