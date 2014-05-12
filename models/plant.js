var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	pmup : Number,
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
		outs: [{ //sortie vers production du lot
			date : Date,
			raw: Number,
			net: Number,
			_id: {auto: true, type: mongoose.Schema.Types.ObjectId, index: true},
			finals: [{
				package: String,
				weight: Number,
				retail: Number,
				cost: Number,
				date: Date,
				buyer: {type: mongoose.Schema.Types.ObjectId}
			}]
		}]
	}]
});
module.exports = mongoose.model('Plant', schema);
