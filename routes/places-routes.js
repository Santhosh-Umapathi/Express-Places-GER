const express = require("express");
const placesRoutes = express.Router();

//Controllers
const {
  getPlacesById,
  getPlacesByUserId,
} = require("../controllers/places-controller");

placesRoutes.get("/:pid", getPlacesById);

placesRoutes.get("/users/:uid", getPlacesByUserId);

module.exports = placesRoutes;
