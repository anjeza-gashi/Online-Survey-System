const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-header');
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Token is invalid" });
    }
}

module.exports = {
    auth
}