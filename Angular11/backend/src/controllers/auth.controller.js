exports.getAuthCookie= async(req, res, next) => {
    res.send(JSON.stringify(req.cookies.token));
}