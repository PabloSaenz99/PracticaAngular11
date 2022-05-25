const express = require("express");     //Import express and cors modules
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200" //Changed portto 4200 to match de docker config (docker-compose.yml)
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

require("./app/routes/tutorial.routes")(app);
// set port, listen for requests

const PORT = process.env.PORT || 3000;  //Changed port from 8080 to 3000 to match de docker config (docker-compose.yml)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");
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