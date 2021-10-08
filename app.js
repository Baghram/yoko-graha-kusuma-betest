const express = require("express");
const app = express();
const cors = require("cors");
const { client } = require("./helper/index");
const router = require("./router/index");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
client.connect();
client.on("connect", async () => {
  const ping = await client.ping();
  console.log(`redis connected : ${ping}`);
});
app.use("/", router);
module.exports = app;
