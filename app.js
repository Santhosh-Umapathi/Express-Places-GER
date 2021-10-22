const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;

const app = express();

// app.use(bodyParser.json());

app.listen(PORT);
console.log("Listening to PORT:", PORT);
