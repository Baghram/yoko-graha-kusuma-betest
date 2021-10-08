const userRoute = require("express").Router();
const UserController = require("../controller/userController");
const { authentication } = require("../middleware/index");

userRoute.get("/", (req, res) => {
  return res.status(200).json({
    message: "User Route Connected",
  });
});
userRoute.get("/get", authentication, UserController.getUser);
userRoute.post("/post", authentication, UserController.postUser);
userRoute.post("/login", UserController.login);
userRoute.put("/update/:id", authentication, UserController.updateUser);
userRoute.delete("/delete/:id", authentication, UserController.deleteUser);

module.exports = userRoute;
