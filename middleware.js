// IMPORTS
const jwt = require('jsonwebtoken') // Used for creating JSON Web Token

const tokenSecret = "my-token-secret-by-Sam" // Token Secret used for verifying token

// Verify function: Middleware to verify the token
exports.verify = (req, res, next) => {
    // Take the token from the authorization field from the headers
    const token = req.headers.authorization

    // If no TOKEN, then return 403 error
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        // If token was there, then verify the token by using jwt module
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {

            // If error then return authentication error
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            
            // SUCCESSFULLY VERIFIED: go to the next function
            req.user = value.data
            next()
        })
    }
}