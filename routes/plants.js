var Plant = require('../models/plant');
module.exports = function (app) {
	//show
	app.get('/plants/:plant', function (req, res, next) {
		Plant.findById(req.params.plant, function (err, plant) {
			if (err) next(err);
			else res.render('plants/show', {plant: plant, title: plant.name});
		});
	});
	//index
	app.get('/plants', function (req, res, next) {
		Plant.find(function (err, plants) {
			if (err) next(err);
			res.render('plants/index', {plants: plants, title: 'Liste des plantes'});
		});
	});
	//new
	app.get('/plants/new', function (req, res, next) {
		res.render('plants/new', {title: 'Nouvelle plante'});
	});
	//create
	app.post('/plants', function (req, res, next) {
		new Plant({ name: req.body.name }).save(function (err, pl) {
			if (err) next(err);
			console.log(pl + ' saved to db');
		});
		res.redirect('/plants');
	});
	//delete
	app.delete('/plants/:plant', function (req, res, next) {
		console.log('trynna remove plant with id=' + req.params.plant);
		Plant.findByIdAndRemove(req.params.plant, function (err) { 
			if (err) next(err);
		});
		res.redirect('/plants');
	});
	//edit
	app.get('/plants/:plant/edit', function (req, res, next) {
		Plant.findById(req.params.plant, '_id name desc', function (err, plant) {
			if (err) next(err);
			else res.render('plants/edit', {plant:plant, title: 'Modifier une plante'});
		});
	});
	//update
	app.put('/plants/:plant', function (req, res, next) {
		Plant.findByIdAndUpdate(req.params.plant, {
				name: req.body.name,
				desc: req.body.desc
			}, function (err, plant) {
				if (err) next(err);
				res.redirect('/plants');
			}
		);
	});
};
