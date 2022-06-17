
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

const router = require("express").Router();
const userRouter = require("./user.routes");
const tutorialRouter = require("./tutorial.routes");

router.use('/api/users', userRouter);
router.use('/api/tutorials/', tutorialRouter);

module.exports = router;