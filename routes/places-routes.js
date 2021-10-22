const express = require("express");

const placesRoutes = express.Router();

placesRoutes.get("/", (req, res, next) => {
  console.log("[GET]: places-routes");
  res.json({ message: "GET Success" });
});

module.exports = placesRoutes;
