const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const User = require('../models/user.model')
const config = require('../config')

const localOptions = {
    usernameField: 'email'
}
const localLoginStrat = new LocalStrategy(localOptions, function(email, password, done) {
    // See if we have a user with a matching email
    User.findOne({ email: email }, function(err, user) {
        if(err) return done(err)

        if(!user) return done(null, false)  // User was not found with the provided email

        // Compare the user-with-matching-email's password
        user.comparePassword(password, function(err, isMatch) {
            if(err) return done(err)

            if(!isMatch) return done(null, false)  // Provided password did not match user password

            return done(null, user)  // User will be passed on as req.user
        })
    })
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}
const jwtLoginStrat = new JwtStrategy(jwtOptions, function(payload, done) {  // payload = decoded jwt; done = successful auth callback
    User.findById(payload.sub, function(err, user) {
        if(err) return done(err, false)

        if(user) done(null, user)  // If we have matching user, return the user
        else done(null, false)  // If we don't have a matching user, return false
    })
})

passport.use(localLoginStrat)
passport.use(jwtLoginStrat)
