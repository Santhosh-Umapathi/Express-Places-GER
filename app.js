const express = require("express");
//Models
const HttpError = require("./models/http-error");

//Routes
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const app = express();
const jsonParser = express.json();
const PORT = 5000;

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

app.listen(PORT);
console.log("Listening to PORT:", PORT);
