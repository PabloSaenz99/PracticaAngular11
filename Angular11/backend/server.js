const express = require("express");     //Import express and cors modules
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: true//"http://localhost:4200" //Changed port to 4200 to match de docker config (docker-compose.yml)
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/routes/routes"));

module.exports = app;