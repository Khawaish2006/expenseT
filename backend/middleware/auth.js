const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization"); // Get token from headers

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " and get actual token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded.userId; // Attach userId to request object
        next(); // Proceed to next middleware
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
