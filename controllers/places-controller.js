const uuid = require("uuid").v4;
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

const getPlacesById = (req, res, next) => {
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
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    // const error = new Error("No Results found for the user Id");
    // error.code = 404;
    return next(new HttpError("No Results found for the user Id", 404));
  }

  res.json({ message: "GET Success", place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const place = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(place);

  res.status(201).json({ message: "POST Success", place });
};

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
