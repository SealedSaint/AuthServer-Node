const jwt = require('jwt-simple')

const User = require('../models/user.model')
const config = require('../config')

function tokenFromUser(user) {
	return jwt.encode({
		sub: user.id,  // "sub" is for "subject" - jwt standard
		iat: new Date().getTime() // "iat" is for "issued at time" - jwt standard
	}, config.secret)
}

exports.signup = function(req, res, next) {
	const email = req.body.email
	const password = req.body.password

	// Make sure email is unique
	User.findOne({ email: email }, function(err, existingUser) {
		if(err) return next(err)

		// If not unique, error
		if(existingUser) {
			return res.status(422).json({ error: 'Email has already been used' })  // Unprocessable Entity
		}

		// If unique, create and save user
		const user = new User({
			email: email,
			password: password
		})
		user.save(function(err) {
			if(err) return next(err)

			res.json({ token: tokenFromUser(user) })
		})
	})
}