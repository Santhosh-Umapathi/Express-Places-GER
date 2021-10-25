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
  if (!errors.isEmpty()) {
    const error = new HttpError("Enter valid inputs, please check your data");
    throw error;
  }
};

const getUsers = (req, res, next) => {
  res.json({ message: "GET Success", users: DUMMY_USERS });
};

const signUp = async (req, res, next) => {
  //Validation Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Enter valid inputs, please check your data");
    return next(error);
  }

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

const login = (req, res, next) => {
  //Validation Check
  validationHandler(req, next);

  const { email, password } = req.body;

  const foundUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    const error = new HttpError("User not found or incorrect credentials", 401);
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
