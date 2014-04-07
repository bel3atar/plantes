var Plant = require('../models/plant');
module.exports = function (app) {
	app.get('/plants', function (req, res) {
		Plant.find(function (err, plants) {
			if (err) return console.log(err);
			res.render('plants/index', {plants: plants});
		});
	});

	app.get('/plants/new', function (req, res) {
		res.render('plants/new', {title: 'Nouvelle plante'});
	});

	app.post('/plants', function (req, res) {
		new Plant({ name: req.body.name }).save(function (err, pl) {
			if (err) return console.log(err);
			console.log(pl + ' saved to db');
		});
		res.redirect('/plants');
	});

	app.delete('/plants/:plant', function (req, res) {
		console.log('trynna remove plant with id=' + req.params.plant);
		Plant.findByIdAndRemove(req.params.plant, function (err) { 
			if (err) console.error('failed to remove ' + req.params.plant);
		});
		res.redirect('/plants');
	});

	app.get('/plants/:plant/edit', function (req, res, next) {
		Plant.findById(req.params.plant, '_id name', function (err, plant) {
			if (err) console.error(err);
			if (err) next(err, req, res, next);
			else res.render('plants/edit', {plant:plant});
		});
	});

	app.put('/plants/:plant', function (req, res) {
		Plant.findByIdAndUpdate(req.params.plant, {name: req.body.name}, 
			function (err, plant) {
				if (err) return console.error(err);
				console.log('update ok: ' + plant);
				res.redirect('/plants');
			}
		);
	});
}
