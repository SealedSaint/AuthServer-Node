const Auth = require('./controllers/auth.controller')

module.exports = function(app) {
	app.post('/signup', Auth.signup)
}