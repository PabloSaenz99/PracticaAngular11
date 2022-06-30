const tutorials = require("../controllers/tutorial.controller.js");
const router = require("express").Router();


router.post("/", tutorials.create);
router.get("/", tutorials.findAll);

router.get("/published/", tutorials.findAllPublished);

router.get("/id/:id", tutorials.findOne);
router.put("/id/:id", tutorials.update);
router.delete("/id/:id", tutorials.delete);

router.delete("/", tutorials.deleteAll);

module.exports = router;