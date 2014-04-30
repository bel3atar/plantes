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
	//outs index
	app.get('/lots/:lot/outs', function (req, res, next) {
		Plant.findOne({'lots._id': req.params.lot}, {_id: 0, 'lots.$.outs': 1},
			function (err, data) {
				if (err) next(err);
				else if (!data) next();
				else res.json(data.lots[0]);
			}
		);
	});
	//outs create
	app.post('/lots/:lot/outs', function (req, res, next) {
		Plant.findOneAndUpdate({'lots._id': req.params.lot}, {$push: {'lots.$.outs': {
			date: req.body.date,
			raw: req.body.raw,
			net: req.body.net,
		}}}, function (err, item) {
			if (err)
				res.send(404);
			else
				res.send(200);
		});
	});
	//index
	app.get('/plants/:plant/lots', function (req, res, next) {
		console.log(req);
		Plant.findById(req.params.plant, 'name lots', function (err, plant) {
			if (err) next(err);
			else if (!plant) next();
			else {
				plant.lots.forEach(function (lot) {
					var sum = 0.0;
					for (var i = 0; i< lot.outs.length; ++i)
						sum += lot.outs[i].raw;
					lot.remaining = lot.quantity - sum;
				});
				if (req.xhr)
					res.json({
						id: plant._id,
						name: plant.name,
						lots: plant.lots
					});
				else
					res.render('plants/lots/index', {
						id: plant._id,
						title: plant.name + ' | Liste des lots',
						plant: plant.name,
						lots: plant.lots
					});
			}
		});
	});
	//create
	app.post('/plants/:plant/lots', function (req, res, next) {
		Plant.findByIdAndUpdate(req.params.plant, {$push: {lots: {
			date: req.body.date,
			quantity: req.body.quantity,
			price: req.body.price,
			seller: {
				name: req.body['seller.name'],
				tel: req.body['seller.tel']
			}
		}}}, function (err, item) {
			if (err) return next(err);
			console.log('item updated: ' + item);
			res.redirect('/plants/' + req.params.plant + '/lots');
		});
	});
};
