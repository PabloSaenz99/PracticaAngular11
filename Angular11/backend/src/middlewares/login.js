const err = require('../utils/errors')

const isLoggedIn = (req, res, next) => {
    const cookie = req.cookies.token;
    console.log('Cookies: ', cookie);
    if (!cookie) {
        console.log("You need to login");
        //throw new err.BadRequest('You must be logged in');    //Uncomment when cookies works
    }
    next();
}

module.exports = isLoggedIn;