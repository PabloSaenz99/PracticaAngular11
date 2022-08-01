const tutorials = require("../controllers/tutorial.controller.js");
const router = require("express").Router();

const trycatch = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

router.post("/", trycatch(tutorials.create));

router.get("/id/", trycatch(tutorials.findById));
router.get("/published/", trycatch(tutorials.findAllPublished));

router.put("/id/:id", trycatch(tutorials.update));
router.delete("/id/:id", trycatch(tutorials.delete));

router.delete("/", trycatch(tutorials.deleteAll));

module.exports = router;