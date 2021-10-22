const express = require("express");

const userRoutes = express.Router();

userRoutes.get("/user", (req, res, next) => {
  console.log("[GET]: users");
  res.json({ message: "GET Success" });
});

module.exports = userRoutes;
