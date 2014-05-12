var Plant = require('../models/plant');
module.exports = function (app) {
	app.get('/outs/:out', function (req, res, next) {
		var id = req.params.out;
		Plant.aggregate(
			{$project: {'lots.outs': 1, _id: 0}},
			{$unwind: '$lots'},
			{$unwind: '$lots.outs'},
			{$match: {'lots.outs._id': id}},
			function (err, item) {
				if (err) next(err);
				else if (!item) next();
				else res.json(item);
			}
		);
	});
};
