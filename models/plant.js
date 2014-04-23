var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name : String,
	desc : String,
	image: String,
	lots: [{
		_id     : {auto: true, type: mongoose.Schema.Types.ObjectId, index: true},
		price   : Number,
		quantity: Number,
		date    : Date,
		seller  : {
			name   : String,
			address: String,
			phone  : String,
			loc    : {
				lon: Number,
				lat: Number
			}
		},
		outs: [{
			date : Date,
			quantity: Number
		}]
	}]
});
module.exports = mongoose.model('Plant', schema);
