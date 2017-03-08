const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Defaine our model
const userSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true }
})

// Before saving, ecrypt password
userSchema.pre('save', function(next) {
	const user = this
	bcrypt.genSalt(10, function(err, salt) {  // Generate a salt
		if(err) return next(err)

		bcrypt.hash(user.password, salt, null, function(err, hash) {  // Hash the password using the salt
			if(err) return next(err)

			user.password = hash  // Overwrite original with hashed password
			next()
		})
	})
})

// Create the model class
const model = mongoose.model('user', userSchema)

module.exports = model
