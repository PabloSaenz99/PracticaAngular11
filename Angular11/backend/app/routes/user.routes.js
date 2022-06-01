module.exports = app => {
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
    // Add a tutorial to an existing user
    router.post("/set", users.addTutorial);
    
    app.use('/api/users', router);
  };