const router = require("express").Router();
const UserController = require("../controller/userController");
const userRoute = require("./user");
const { client } = require("../helper/index");

router.get("/", (req, res) => {
  return res.status("200").json({
    message: "Orchestrator Domain Connected",
  });
});
router.get("/token/:token", UserController.generateToken);
router.use("/user", userRoute);

router.get("/test", async (req, res) => {
  let data = await client.get("test");
  return res.status(200).json({
    message: "TEST GET",
    data,
  });
});
router.post("/test", async (req, res) => {
  await client.set("test", "tralala");
  return res.status(200).json({
    message: "TEST POST",
  });
});

module.exports = router;
