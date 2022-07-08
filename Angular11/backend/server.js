const express = require("express");     //Import express and cors modules
const cors = require("cors");
const handleErrors = require("./src/middlewares/handle.error");
const cookieParser = require('cookie-parser');
const app = express();
var corsOptions = {
  origin: true,//"http://localhost:4200" //Changed port to 4200 to match de docker config (docker-compose.yml)
  credentials:true
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());
app.use(require("./src/middlewares/login"));
app.use(require("./src/middlewares/parser"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/routes/routes"));
app.use(handleErrors);  //Middleware for handle errors

module.exports = app;