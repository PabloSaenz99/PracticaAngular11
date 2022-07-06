const users = require("../controllers/user.controller.js");
const router = require("express").Router();

//https://www.geeksforgeeks.org/auth-guards-in-angular-9-10-11/
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//https://levelup.gitconnected.com/angular-route-guards-for-authentication-d77fb01f04ae

router.get("/", users.findAll);
router.get("/tutoriales-de-usuario", users.getUsersTutorials);

router.get("/:id", users.findOne);

router.post("/", users.create);
router.post("/set", users.addTutorial);
router.post("/login", users.login);

router.put("/:id", users.update);

router.delete("/logout", users.logout);
router.delete("/:id", users.delete);

module.exports = router;