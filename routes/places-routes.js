const express = require("express");
const placesRoutes = express.Router();

//Controllers
const {
  getPlacesById,
  getPlacesByUserId,
  createPlace,
} = require("../controllers/places-controller");

placesRoutes.get("/:pid", getPlacesById);

placesRoutes.get("/users/:uid", getPlacesByUserId);

placesRoutes.post("/", createPlace);

module.exports = placesRoutes;
