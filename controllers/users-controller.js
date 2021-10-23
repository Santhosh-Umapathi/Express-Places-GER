const uuid = require("uuid").v4;
//Models
const HttpError = require("../models/http-error");

//Data
let DUMMY_USERS = [
  {
    id: "u1",
    name: "max",
    email: "test@test.com",
    password: "Test@123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ message: "GET Success", users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const foundUser = DUMMY_USERS.find((u) => u.email === email);

  if (foundUser) {
    const error = new HttpError("User already signed Up", 401);
    return next(error);
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ message: "POST Success", newUser });
};

const login = (req, res, next) => {
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

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
