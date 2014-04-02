var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/plants');
var db = exports = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('connected to mongodb');
});
