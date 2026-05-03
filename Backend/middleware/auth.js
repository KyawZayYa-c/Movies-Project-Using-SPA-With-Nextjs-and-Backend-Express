const jwt = require("jsonwebtoken");
const { config } = require('../config/Config');

async function verifyToken(req, res, next) {

    const authorization = req.headers.authorization;

    // 1️⃣ header check
    if (!authorization) {
        return res.status(401).json({
            error: 'Authorization header missing'
        });
    }

    // 2️⃣ Bearer format check
    const parts = authorization.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            error: 'Invalid token format'
        });
    }

    const token = parts[1];

    try {
        // 3️⃣ verify token
        const verifiedUser =
            jwt.verify(token, config.TOKEN_SECRET);

        // 4️⃣ attach user to request
        req.authUser = verifiedUser;

        next();

    } catch (err) {

        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
}

module.exports = {
    verifyToken,
};