const mongoose = require("mongoose");
const url = "mongodb://database:27017";

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = url;
db.tutorials = require("../models/tutorial.model")(mongoose);
db.users = require("../models/user.model.js")(mongoose);

if(process.env.TEST !== "test") {
  //Put here environment variable
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

module.exports = db;