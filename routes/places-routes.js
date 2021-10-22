const express = require("express");
const placesRoutes = express.Router();
//Models
const HttpError = require("../models/http-error");
//Data
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the popular skyscrappers in the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th st New York, NY 10001",
    creator: "u1",
  },
];

placesRoutes.get("/:pid", (req, res, next) => {
  //:pid is dynamic param
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    const error = new HttpError("No Results found for the places id", 404);
    // error.code = 404;
    return next(error); //Sending to global error boundary

    // return res.status(404).json({ message: "No Results found" });
  }
  // console.log("[GET]: places-routes");
  res.json({ message: "GET Success", place });
});

placesRoutes.get("/users/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    // const error = new Error("No Results found for the user Id");
    // error.code = 404;
    return next(new HttpError("No Results found for the user Id", 404));
  }

  res.json({ message: "GET Success", place });
});

module.exports = placesRoutes;
