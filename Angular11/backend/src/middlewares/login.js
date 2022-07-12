const err = require('../utils/errors')

const isLoggedIn = (req, res, next) => {
    if(process.env.TEST !== "test") {
        const cookie = req.cookies.token;
        if (!cookie) {
            console.log("You need to login");
            throw new err.BadRequest('You must be logged in');    //Uncomment when cookies works
        }
    }
    next();
}

module.exports = isLoggedIn;