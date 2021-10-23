const uuid = require("uuid").v4;
const { check, validationResult } = require("express-validator");

//Models
const HttpError = require("../models/http-error");

//Data
let DUMMY_PLACES = [
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

//Validations
const createPlaceValidator = [
  check("title").not().isEmpty(),
  check("address").not().isEmpty(),
  check("description").isLength({ min: 5 }),
];

const updatePlaceValidator = [
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
];

const validationHandler = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("🚀 --- createPlace --- errors", errors);
    const error = new HttpError("Enter valid inputs, please check your data");
    return next(error);
  }
};

//Controllers
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
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places) {
    // const error = new Error("No Results found for the user Id");
    // error.code = 404;
    return next(new HttpError("No Results found for the user Id", 404));
  }

  res.json({ message: "GET Success", places });
};

const createPlace = (req, res, next) => {
  //Validation Check
  validationHandler(req, next);

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

const updatePlace = (req, res, next) => {
  //Validation Check
  validationHandler(req, next);

  const placeId = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  updatedPlace.title = title;
  updatedPlace.description = description;

  const updatedPlaceIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  DUMMY_PLACES[updatedPlaceIndex] = updatedPlace;

  res.status(201).json({ message: "Update Success", updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(201).json({ message: "DELETE Success" });
};

//Module const exports
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
//Validations Exports
exports.createPlaceValidator = createPlaceValidator;
exports.updatePlaceValidator = updatePlaceValidator;
