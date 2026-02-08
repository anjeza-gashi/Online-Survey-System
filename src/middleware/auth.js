const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-header');
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Token is invalid" });
    }
}

const authOptional = (req, res, next) => {
    const token = req.header('x-auth-header');
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        req.user = null;
    }
    next();
};

module.exports = { auth, authOptional };