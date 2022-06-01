module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.get("/", users.findAll);
    router.get("/tutoriales-de-usuario", users.getUsersTutorials)
    
    router.get("/:id", users.findOne);

    router.post("/", users.create);
    router.post("/set", users.addTutorial);
    
    router.put("/:id", users.update);
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
  };