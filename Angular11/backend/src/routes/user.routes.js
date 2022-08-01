const users = require("../controllers/user.controller.js");
const router = require("express").Router();

//https://www.geeksforgeeks.org/auth-guards-in-angular-9-10-11/
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//https://levelup.gitconnected.com/angular-route-guards-for-authentication-d77fb01f04ae

const trycatch = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

router.get("/", trycatch(users.findAll));
router.get("/user-tutorials", trycatch(users.getUsersTutorials));

router.get("/email/:email", trycatch(users.findOne));

router.post("/", trycatch(users.create));
router.post("/set", trycatch(users.addTutorial));
router.post("/login", trycatch(users.login));

router.put("/:id", trycatch(users.update));

router.delete("/logout", trycatch(users.logout));
router.delete("/:id", trycatch(users.delete));

module.exports = router;