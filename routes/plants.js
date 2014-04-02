var db = require('../db'), Plant = require('../models/plant');

exports.index = function (req, res) {
	Plant.find(function (err, plants) {
		if (err) return console.log(err);
		res.render('plants/index', {plants: plants});
	});
};

exports.new = function (req, res) {
	res.render('plants/new', {title: 'Nouvelle plante'});
};

exports.create = function (req, res) {
	var plant = new Plant({ name: req.body.name });
	plant.save(function (err, pl) {
		if (err) return console.log(err);
		console.log(pl + ' saved to db');
	});
	plant = null;
	res.redirect('/plants');
};

exports.destroy = function (req, res) {
	console.log('trynna remove plant with id=' + req.params.plant);
	Plant.findByIdAndRemove(req.params.plant, function (err) { 
		if (err) console.error('failed to remove ' + req.params.plant);
	});
	res.redirect('/plants');
};

exports.edit = function (req, res) {
	console.log('hadi edit: ' + req.params.plant);
	Plant.findById(req.params.plant, '_id name', function (err, plant) {
		if (err) return console.log(err);
		res.render('plants/edit', {plant:plant});
	});
};

exports.update = function (req, res) {
	Plant.findByIdAndUpdate(req.params.plant, {name: req.body.name}, 
		function (err, plant) {
			if (err) return console.error(err);
			console.log('update ok: ' + plant);
			res.redirect('/plants');
		}
	);
};
