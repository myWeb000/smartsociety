const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided.", success: false });

    try {
        const decoded = jwt.verify(token, process.env.MY_KEY);
        req.user = decoded; // { id, role, iat, exp }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token", success: false });
    }
};

exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access forbidden. Insufficient permissions.", success: false });
        }
        next();
    };
};