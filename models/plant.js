var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: String,
	lots: [{
		weight: Number,
		seller: {
			name: String,
			tel: String
		},
		date: Date
	}],
	sales: [{
		lot: Number,
		weight: Number,
		buyer: {
			name: String,
			tel: String
		}
	}]
});
module.exports = mongoose.model('Plant', schema);
