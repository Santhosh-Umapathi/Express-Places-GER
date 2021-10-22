const express = require("express");

const userRoutes = express.Router();

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Jack",
    email: "jack@jack.com",
  },
];

userRoutes.get("/:uid", (req, res, next) => {
  //:pid is dynamic param
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => u.id === userId);

  // console.log("[GET]: places-routes");
  res.json({ message: "GET Success", user });
});

module.exports = userRoutes;
