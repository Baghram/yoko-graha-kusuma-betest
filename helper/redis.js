const { createClient } = require("redis");

const client = createClient({ url: process.env.REDIS });


module.exports = client;
