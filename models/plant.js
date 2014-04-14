var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name : String,
	desc : String,
	image: String,
	lots: [{
		price : Number,
		date  : Date,
		seller: {
			name   : String,
			address: String,
			phone  : String,
			loc    : {
				lon: Number,
				lat: Number
			}
		},
		sales: [{
			date : Date,
			price: Number,
			buyer: {
				name   : String,
				address: String,
				phone  : String
			}
		}]
	}]
});
module.exports = mongoose.model('Plant', schema);
