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
			name : String,
			tel  : String,
			loc    : {
				lon : Number,
				lat : Number,
				zoom: Number
			}
		},
		outs: [{
			date : Date,
			raw: Number,
			net: Number,
		}]
	}]
});
module.exports = mongoose.model('Plant', schema);
