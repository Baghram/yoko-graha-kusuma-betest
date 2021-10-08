const { createClient } = require("redis");

const client = createClient(process.env.REDIS, {
  tls: {
    rejectUnauthorized: false,
  },
});
client['auth'] = null;
client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
