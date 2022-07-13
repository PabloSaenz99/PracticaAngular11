const tutorials = require("../controllers/tutorial.controller.js");
const router = require("express").Router();

const trycatch = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

router.post("/", trycatch(tutorials.create));
router.get("/", trycatch(tutorials.findAll));

router.get("/published/", trycatch(tutorials.findAllPublished));

router.get("/id/:id", trycatch(tutorials.findOne));
router.put("/id/:id", trycatch(tutorials.update));
router.delete("/id/:id", trycatch(tutorials.delete));

router.delete("/", trycatch(tutorials.deleteAll));

module.exports = router;