const express = require("express");
const bodyParser = require("body-parser");
//Routes
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const app = express();
const PORT = 5000;

//Places Routes
app.use("/api/places", placesRoutes);
//User Routes
app.use("/api/users", userRoutes);

//Error Boundary
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

app.listen(PORT);
console.log("Listening to PORT:", PORT);
