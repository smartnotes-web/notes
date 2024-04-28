const jwt = require('jsonwebtoken');
const secret = require('../config.js'); // Assuming you have a config file where the JWT secret is stored

console.log("yaa it reached here");
function isLogIn(req, res, next) {
    // Get the JWT token from the HTTP-only cookie
    const token = req.cookies.token;
    console.log("req.cookies = "+req.cookies);

    if (!token) {
        // Token not found, user is not logged in
        return res.status(401).json({ success: false, message: 'You are not logged in...' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        console.log(decoded);

        // Attach the decoded token payload to the request object for further processing
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // Token verification failed
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}

module.exports = isLogIn;
