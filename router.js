const passport = require('passport')

const Auth = require('./controllers/auth.controller')
const passportService = require('./services/passport.service')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })

module.exports = function (app) {
    app.post('/signin', requireSignIn, Auth.signin)
    app.post('/signup', Auth.signup)
}