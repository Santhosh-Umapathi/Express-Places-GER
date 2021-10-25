const { check, validationResult } = require("express-validator");

//Models
const { HttpError, User } = require("../models");

//Validations
const signUpValidator = [
  check("name").not().isEmpty(),
  check("email").not().isEmpty().normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
];

const loginUpValidator = [
  check("email").not().isEmpty().normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
];

const validationHandler = (req, next) => {
  const errors = validationResult(req);

  let error;
  if (!errors.isEmpty()) {
    error = new HttpError("Enter valid inputs, please check your data");
  }
  return error;
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
    if (!users || users.length === 0) {
      const error = new HttpError("No Users found", 422);
      return next(error);
    }

    users = users.map((user) => user.toObject({ getters: true }));
  } catch (err) {
    const error = new HttpError("Failed to fetch users", 422);
    return next(error);
  }

  res.json({ message: "GET Success", users });
};

const signUp = async (req, res, next) => {
  //Validation Check
  const error = validationHandler(req);
  error && next(error);

  const { name, email, password, places } = req.body;

  let newUser;
  try {
    newUser = await User.findOne({ email });

    if (newUser) {
      const error = new HttpError("User already signed Up", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Failed to fetch user", 401);
    return next(error);
  }

  try {
    newUser = new User({
      name,
      email,
      password,
      places,
      image:
        "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
    });

    await newUser.save();
    newUser = newUser.toObject({ getters: true });
  } catch (err) {
    const error = new HttpError("Signup failed", 401);
    return next(error);
  }

  res.status(201).json({ message: "Signup Success", newUser });
};

const login = async (req, res, next) => {
  //Validation Check
  const error = validationHandler(req);
  error && next(error);

  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });

    if (!user || user.password !== password) {
      const error = new HttpError("Invalid Credentials or User not found", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Failed to fetch user", 401);
    return next(error);
  }

  res.status(201).json({ message: "POST Success: Logged In" });
};

//Module const exports
module.exports = {
  getUsers,
  signUp,
  login,
  //Validations Exports
  signUpValidator,
  loginUpValidator,
};
