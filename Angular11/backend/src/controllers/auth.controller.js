exports.getAuthCookie= async(req, res, next) => {
    try {
        res.send(JSON.stringify(req.cookies.token));
    } catch (err) {
        next(err);
    }
}