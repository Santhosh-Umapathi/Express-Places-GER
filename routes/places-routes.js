const express = require("express");
const placesRoutes = express.Router();

//Controllers
const {
  getPlacesById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

placesRoutes.get("/:pid", getPlacesById);

placesRoutes.get("/users/:uid", getPlacesByUserId);

placesRoutes.post("/", createPlace);

placesRoutes.patch("/:pid", updatePlace);

placesRoutes.delete("/:pid", deletePlace);

module.exports = placesRoutes;
