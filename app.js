const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//Models
const { HttpError } = require("./models");

//Routes
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const app = express();

const jsonParser = express.json();
const PORT = 5000;
const url = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@playground-cluster.liar9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

//Parse all JSON
app.use(jsonParser);

//Places Routes
app.use("/api/places", placesRoutes);
//User Routes
app.use("/api/users", userRoutes);

//Unsupported Routes
app.use((req, res, next) => {
  const error = new HttpError("Route not found", 404);
  throw error;
});

//Error Boundary
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

//Initialize DB connection
mongoose
  .connect(url)
  .then(() => {
    console.log("[SUCCESS]: Connected to Database:", process.env.DATABASE_NAME);
    app.listen(PORT);
    console.log("[SUCCESS]: Listening to PORT:", PORT);
  })
  .catch((err) =>
    console.log(
      "[ERROR]: Connecting to Database:",
      process.env.DATABASE_NAME,
      err
    )
  );
