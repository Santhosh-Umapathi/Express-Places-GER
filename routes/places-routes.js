const express = require("express");
const placesRoutes = express.Router();

//Controllers
const {
  getPlacesById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
  createPlaceValidator,
  updatePlaceValidator,
} = require("../controllers/places-controller");

//Middlewares
const { fileUpload } = require("../middlewares");

placesRoutes.get("/:pid", getPlacesById);

placesRoutes.get("/users/:uid", getPlacesByUserId);

placesRoutes.post("/", fileUpload, createPlaceValidator, createPlace);

placesRoutes.patch("/:pid", updatePlaceValidator, updatePlace);

placesRoutes.delete("/:pid", deletePlace);

module.exports = placesRoutes;
