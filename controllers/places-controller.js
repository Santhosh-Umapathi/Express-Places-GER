const uuid = require("uuid").v4;
const { check, validationResult } = require("express-validator");

//Models
const { HttpError, Place } = require("../models");

//Utils
const { getCoordsForAddress } = require("../utils/location");

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

const validationHandler = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("🚀 --- createPlace --- errors", errors);
    const error = new HttpError("Enter valid inputs, please check your data");
    throw error;
  }
};

//Controllers
const getPlacesById = async (req, res, next) => {
  //:pid is dynamic param
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
    place = place.toObject({ getters: true }); //Convery mongoose object to js object and add "id" to it

    if (!place) {
      const error = new HttpError("No Results found for the places id", 404);
      return next(error); //Sending to global error boundary
      // return res.status(404).json({ message: "No Results found" });
    }
  } catch (err) {
    console.log("🚀 --- getPlacesById --- err", err);
    const error = new HttpError(
      "Something went wrong while fetching places",
      422
    );
    return next(error);
  }

  res.json({
    message: "GET Success",
    place,
  });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
    places = places.map((place) => place.toObject({ getters: true }));

    if (!places || places.length === 0) {
      return next(new HttpError("No Results found for the user Id", 404));
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching places for the user",
      422
    );
    return next(error);
  }

  res.json({ message: "GET Success", places });
};

const createPlace = async (req, res, next) => {
  //Validation Check
  validationHandler(req);

  const { title, description, address, creator } = req.body;

  let coordinates = {};
  try {
    const results = await getCoordsForAddress(address);

    coordinates.lng = results.features[0].geometry.coordinates[0];
    coordinates.lat = results.features[0].geometry.coordinates[1];
  } catch (error) {
    // console.log("🚀 --- createPlace --- error", error);
    return next(new HttpError("Address not found", 422));
  }

  let createdPlace;
  try {
    createdPlace = new Place({
      title,
      description,
      location: coordinates,
      address,
      image: "https://miro.medium.com/max/900/1*b0TtGI6gWFLltL1QkRxVdg.png",
      creator,
    });

    await createdPlace.save();
  } catch (err) {
    console.log("🚀 --- createPlace --- err", err);
    const error = new HttpError("Error creating a new place, try again", 422);
    return next(error);
  }

  res.status(201).json({ message: "POST Success", place: createdPlace });
};

const updatePlace = (req, res, next) => {
  //Validation Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Enter valid inputs, please check your data");
    return next(error);
  }

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
