var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name : String,
	desc : String,
	image: String,
	lots: [{
		_id   : {type: mongoose.Schema.Types.ObjectId, index: true},
		price : Number,
		date  : {type: Date, default: Date.now},
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
			date : {type: Date, default: Date.now},
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
