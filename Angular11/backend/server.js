const express = require("express");     //Import express and cors modules
const cors = require("cors");
const handleErrors = require("./src/middlewares/handle.error");
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
app.use(handleErrors);  //Middleware for handle errors


module.exports = app;