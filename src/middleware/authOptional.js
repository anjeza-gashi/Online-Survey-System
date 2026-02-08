const jwt = require('jsonwebtoken');

const authOptional = (req, res, next) => {
    const token = req.header('x-auth-header');
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        req.user = null;
    }
    next();
};

module.exports = { authOptional };
