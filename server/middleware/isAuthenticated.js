require('dotenv').config() // Import the .env file so we have access to the SECRET key needed by verify method in jsonwebtoken
const jwt = require('jsonwebtoken') // Import jsonwebtoken dependency
const {SECRET} = process.env // Get SECRET from .env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') // I think this should get token from localStorage but we named that something different in AuthContext.js

        // Catch an error getting the headerToken.  I guess if nothing is in localStorage
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET) // Verify the token with jwc dependency
        } catch (err) {
            err.statusCode = 500 // Catch error verifying
            throw err
        }

        // If the token is not verified throw authentication error
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        // Move on to the next middleware
        next()
    }
}