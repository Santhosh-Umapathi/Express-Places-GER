const express = require("express");
const bodyParser = require("body-parser");
//Routes
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const app = express();
const PORT = 5000;

//Places Routes
app.use(placesRoutes);
//User Routes
app.use(userRoutes);

app.listen(PORT);
console.log("Listening to PORT:", PORT);
