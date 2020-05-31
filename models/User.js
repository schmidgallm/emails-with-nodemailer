// Dependencies
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		match: [ /.+@.+\..+/, 'Please enter a valid-email address' ]
	},
	date_created: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
