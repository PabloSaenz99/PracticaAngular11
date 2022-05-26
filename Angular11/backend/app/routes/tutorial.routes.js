module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", tutorials.create);
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
    app.use('/api/tutorials', router);

    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/", users.create);
    // Retrieve all user
    router.get("/", users.findAll);
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
    // Update a user with id
    router.put("/:id", users.update);
    // Delete a user with id
    router.delete("/:id", users.delete);
    app.use('/api/users', router);
  };