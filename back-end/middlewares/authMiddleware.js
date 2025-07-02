const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            const jwtToken = token.split(" ")[1];
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

            // Find user by ID
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        else {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Not authorized, token failed", error: error.message });
    }
};

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = {
    protect,
    adminOnly
};