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
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//require("./src/routes/tutorial.routes")(app);
app.use("/", require("./src/routes/routes"));
// set port, listen for requests

const PORT = process.env.PORT || 3000;  //Changed port from 8080 to 3000 to match de docker config (docker-compose.yml)
console.log(PORT)
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

if(process.env.TEST !== "test") {
  //Put here environment variable
  const db = require("./src/models");
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
}
module.exports = { app, server };