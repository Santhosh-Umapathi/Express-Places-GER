const express = require("express");
const userRoutes = express.Router();

//Controllers
const {
  getUsers,
  login,
  signUp,
  loginUpValidator,
  signUpValidator,
} = require("../controllers/users-controller");

userRoutes.get("/", getUsers);

userRoutes.post("/signup", signUpValidator, signUp);

userRoutes.post("/login", loginUpValidator, login);

module.exports = userRoutes;
