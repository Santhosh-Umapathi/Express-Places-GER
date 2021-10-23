const express = require("express");
const userRoutes = express.Router();

//Controllers
const { getUsers, login, signUp } = require("../controllers/users-controller");

userRoutes.get("/", getUsers);

userRoutes.post("/signup", signUp);

userRoutes.post("/login", login);

module.exports = userRoutes;
