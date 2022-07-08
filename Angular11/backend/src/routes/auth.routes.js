const auth = require("../controllers/auth.controller");
const router = require("express").Router();

//https://www.geeksforgeeks.org/auth-guards-in-angular-9-10-11/
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//https://levelup.gitconnected.com/angular-route-guards-for-authentication-d77fb01f04ae

router.get("/login", auth.getAuthCookie);

module.exports = router;