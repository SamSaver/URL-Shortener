// IMPORTS
const express = require('express') // NodeJS Framework for REST APIs
const User = require('./models/user') // User Model
const bcrypt = require('bcryptjs') // Bcrypt Cryptography algorithm to hash passwords
const jwt = require('jsonwebtoken') // Used to generate JSON web tokens

const rounds = 10 // Number of Salt Rounds for BCRYPT Algorithm
const router = express.Router() // Creating Router for our auth routes
const tokenSecret = "my-token-secret-by-Sam" // Token secret used by JWT module to generate a token

// SIGN UP ROUTE FOR SIGNING UP NEW USERS - RETURNS JWT TOKEN
router.post('/signup', (req, res) => {

    // Check whether this user credentials already exist for a user
    User.findOne({email: req.body.email}).
    then(user => {

        if(user){
            // User already exists then return the corresponding Error
            res.status(409).json({error: 'User Already exists'})
            return;
        }
    })

    // Using bcrypt to hash the password
    bcrypt.hash(req.body.password, rounds, (error, hash) => {

        // If error then return internal server error
        if (error) res.status(500).json(error)
        else {

            // Create the new user with email and hashed password and save it
            const newUser =  User({email: req.body.email, password: hash})
            newUser.save()
                .then(user => {
                    // After saving the user to our database then return the JWT token for the user
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    // In case of error return Internal Server error.
                    res.status(500).json(error)
                })
        }
    })
});

// LOGIN ROUTE FOR LOGGING IN OUR EXISTING USERS - RETURNS JWT TOKEN 
router.get('/login', (req, res) => {

    // Find the user with the provided credentials
    User.findOne({email: req.body.email})
    .then(user => {

        // If Wrong credentials then return the corresponding error statement
        if(!user) res.status(404).json({error: 'no user with that email found'})

        else {
            // Compare the password with the hashed password using bcrypt
            bcrypt.compare(req.body.password, user.password, (error, match) => {

                // If error, then return INTERNAL SERVER ERROR
                if (error) res.status(500).json(error) 

                // If password mathced with original password then return the token for the user
                else if (match) res.status(200).json({token: generateToken(user)})

                // If password do not match then return corresponding error message
                else res.status(403).json({error: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        // If error then return INTERNAL SERVER ERROR
        res.status(500).json(error)
    })
});

// UTILITY FUNCTION TO GENERATE JWT TOKEN - EXPIRES IN 30 Days
function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '30d'})
}

module.exports = router