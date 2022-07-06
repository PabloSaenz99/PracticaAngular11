const isLoggedIn = (req, res, next) => {
    console.log("Login middleware:");
    const cookie = req.cookies.token;
    console.log('Cookies: ', cookie);
    if (!cookie) {
        console.log("You need to login");
    }
    console.log("Fin login middleware");
    next();
}

module.exports = isLoggedIn;