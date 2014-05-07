var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: String,
	role: String,
	username: String,
	password: String
});
module.exports = mongoose.model('User', schema);
