var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: String,
	image: String
});
module.exports = mongoose.model('Plant', schema);
