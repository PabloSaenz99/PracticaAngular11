const tutorials = require("../controllers/tutorial.controller.js");
const router = require("express").Router();

//var router = require("./routes");
// Create a new Tutorial
router.post("/", tutorials.create);
// Retrieve all Tutorials
router.get("/", tutorials.findAll);
// Retrieve all published Tutorials
router.get("/published/", tutorials.findAllPublished);
// Retrieve a single Tutorial with id
router.get("/id/:id", tutorials.findOne);
// Update a Tutorial with id
router.put("/id/:id", tutorials.update);
// Delete a Tutorial with id
router.delete("/id/:id", tutorials.delete);
// Create a new Tutorial
router.delete("/", tutorials.deleteAll);

module.exports = router;