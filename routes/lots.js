var Plant = require('../models/plant');
module.exports = function (app) {
	//new
	app.get('/plants/:plant/lots/new', function (req, res, next) {
		Plant.findById(req.params.plant, 'name', function (err, plant) {
			res.render('plants/lots/new', {
				plant: plant._id,
				title: plant.name + ' | Nouveau lot'
			});
		});
	});
	//index
	app.get('/plants/:plant/lots', function (req, res, next) {
		Plant.findById(req.params.plant, 'name lots', function (err, plant) {
			console.log(plant);
			if (err) next(err);
			else res.render('plants/lots/index', {
				id: plant._id,
				title: plant.name + ' | Liste des lots',
				plant: plant.name,
				lots: plant.lots
			});
		});
	});
	app.post('/plants/:plant/lots', function (req, res, next) {
		Plant.findByIdAndUpdate(req.params.plant, function (err, plant) {

		});
	});
};
