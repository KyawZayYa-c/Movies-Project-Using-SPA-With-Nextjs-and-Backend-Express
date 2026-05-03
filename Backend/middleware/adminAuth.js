function adminAuth(req, res, next) {
    if(req.url.startsWith('/admin')) {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ) {
            next();
        }else {
            res.status(403).send('Not authorized');
        }
    }else {
        next();
    }
}

module.exports = adminAuth;