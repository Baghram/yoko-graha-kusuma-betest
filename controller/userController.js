const jwt = require("jsonwebtoken");
const { client } = require("../helper/index");
const axios = require("axios");
const userServerUrl = process.env.USERSERVERURL;
class UserController {
  static async getUser(req, res) {
    try {
      const { query, url, authenticated } = req;
      if (authenticated.validRoute !== "userRoute")
        throw new Error("Invalid Authentication");
      if (Object.keys(query).length === 0) {
        let userList = await client.get("userList");
        userList = JSON.parse(userList);
        if (!userList) {
          const result = await axios({
            url: `${userServerUrl}/user${url}`,
            method: "GET",
            headers: {
              token: req.headers.token,
            },
          });
          await client.set("UserList", JSON.stringify(result.data.data));
          return res.status(200).json({
            message: "Get User Success",
            data: result.data.data,
          });
        }
        return res.status(200).json({
          message: "Get User Success",
          data: userList,
        });
      } else {
        let user = await axios({
          url: `${userServerUrl}/user${url}`,
          method: "GET",
          headers: {
            token: req.headers.token,
          },
        });
        return res.status(200).json({
          message: "Get User Success",
          data: user.data.data,
        });
      }
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Get User Failed",
              error: error.response.data.error,
            });
        }
      } else {
        switch (error.message) {
          case "User Not Found":
            break;

          default:
            return res.status(400).json({
              message: "Get User Failed",
              error: error.message,
            });
        }
      }
    }
  }
  static async generateToken(req, res) {
    try {
      const { params } = req;
      let data = {
        validRoute: null,
      };
      let token;
      switch (params.token) {
        case "user":
          data.validRoute = "userRoute";
          token = await jwt.sign(data, process.env.SECRET, {
            expiresIn: "2h",
          });
          return res.status(200).json({
            message: "Generate Token Success",
            token,
          });
          break;

        default:
          throw new Error("Invalid token Params");
          break;
      }
    } catch (error) {
      return res.status(400).json({
        message: "Generate Token Failed",
        error: error.message,
      });
    }
  }
  static async login(req, res) {
    try {
      const { body, url } = req;
      const login = await axios({
        url: `${userServerUrl}/user${url}`,
        method: "POST",
        data: body,
      });
      return res.status(200).json({
        message: "Login Success",
        userToken: login.data.userToken,
      });
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Update User Failed",
              error: error.response.data.error,
            });
        }
      } else {
        switch (error.message) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Update User Failed",
              error: error.message,
            });
        }
      }
    }
  }
  static async postUser(req, res) {
    try {
      const { body, authenticated, url } = req;
      if (authenticated.validRoute !== "userRoute")
        throw new Error("Invalid Authentication");
      const createUser = await axios({
        url: `${userServerUrl}/user${url}`,
        method: "POST",
        data: body,
        headers: {
          token: req.headers.token,
        },
      });
      await client.set("userList", JSON.stringify(createUser.data.user));
      return res.status(201).json({
        message: "Post User Success",
        data: createUser.data.data,
      });
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Post User Failed",
              error: error.response.data.error,
            });
        }
      } else {
        switch (error.message) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Post User Failed",
              error: error.message,
            });
        }
      }
    }
  }
  static async updateUser(req, res) {
    try {
      const { body, url, authenticated } = req;
      if (authenticated.validRoute !== "userRoute")
        throw new Error("Invalid Authentication");
      const updateUser = await axios({
        url: `${userServerUrl}/user${url}`,
        method: "PUT",
        data: body,
        headers: {
          token: req.headers.token,
        },
      });
      await client.set("userList", JSON.stringify(updateUser.data.user));
      return res.status(200).json({
        message: "Update User Success",
        data: updateUser.data.data,
      });
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Update User Failed",
              error: error.response.data.error,
            });
        }
      } else {
        switch (error.message) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Update User Failed",
              error: error.message,
            });
        }
      }
    }
  }
  static async deleteUser(req, res) {
    try {
      const { url } = req;
      const deleteUser = await axios({
        url: `${userServerUrl}/user${url}`,
        method: "DELETE",
        headers: {
          token: req.headers.token,
        },
      });
      await client.set("userList", JSON.stringify(deleteUser.data.user));
      return res.status(200).json({
        message: "Delete User Success",
        data: deleteUser.data.data,
      });
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Delete User Failed",
              error: error.response.data.error,
            });
        }
      } else {
        switch (error.message) {
          case "":
            break;

          default:
            return res.status(400).json({
              message: "Delete User Failed",
              error: error.message,
            });
        }
      }
    }
  }
}
module.exports = UserController;
