const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET|| "e24a7e342be9ef60b84f73f4698f4227d5ae4dfc5e452d7f012bf5fe02f58e4c8f73a2c5baf980927f1e9e2e645d8473f1df9ad7f4c53ae7c5ef4fdc7f1c2e0b";

// Middleware to authenticate the user's token
const authenticateToken = (req, res, next) => {
    // Retrieve the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting 'Bearer <token>'

    if (!token) {
        // Return a 401 Unauthorized error if no token is provided
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    // Verify the token using JWT
    jwt.verify(token,ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // Return a 403 Forbidden error if the token is invalid
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach the user info to the request object for further use in route handlers
        req.user = user;
        next();
    });
};

// Uncomment and use the authorizeAdmin middleware if admin-only routes are needed

/* 
// Middleware to authorize only admin users
const authorizeAdmin = (req, res, next) => {
    // Ensure that the user is authenticated and is an admin
    if (req.user && req.user.role === 'admin') {
        next(); // If the user is an admin, proceed to the next middleware or route handler
    } else {
        return res.status(403).json({ message: 'Admin access required' });
    }
};
*/

module.exports = { authenticateToken /*, authorizeAdmin */ };
