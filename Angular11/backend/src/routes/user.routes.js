const users = require("../controllers/user.controller.js");
const router = require("express").Router();

router.get("/", users.findAll);
router.get("/tutoriales-de-usuario", users.getUsersTutorials)

router.get("/:id", users.findOne);

router.post("/", users.create);
router.post("/set", users.addTutorial);
router.post("/login", users.login);

router.put("/:id", users.update);
router.delete("/:id", users.delete);

module.exports = router;