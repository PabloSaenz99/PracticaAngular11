
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

const router = require("express").Router();
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const tutorialRouter = require("./tutorial.routes");

router.use('/api/auth/', authRouter);
router.use('/api/users/', userRouter);
router.use('/api/tutorials/', tutorialRouter);

module.exports = router;