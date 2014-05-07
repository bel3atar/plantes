var User = require('../models/user')
	, allowedRoles = [
			'Client',
			'Administrateur',
			'Responsable de stock',
			'Responsable de production'
		];
module.exports = function (app) {
	function checkRole(req, res, next) {
		if (allowedRoles.indexOf(req.body.role) === -1)
			next(new Error('Invalid role ' + req.body.role));
		else
			next();
	};
	//new
	app.get('/users/new', function (req, res, next) {
		res.render('users/new', {title: 'Nouvel utilisateur'});
	});
	//index
	app.get('/users', function (req, res, next) {
		User.find().sort('name').exec(function (err, users) {
			if (err) next(err);
			res.render('users/index', {users: users, title: 'Liste des utilisateurs'});
		});
	});
	//create
	app.post('/users', checkRole, function (req, res, next) {
		new User({
			name: req.body.name,
			role: req.body.role,
			username: req.body.username,
			password: req.body.password
		}).save(function (err, user) {
			if (err) next(err);
			else {
				res.redirect('/users');
				console.log('added user to db: ');
				console.log(user);
			}
		});
	});
	//delete
	app.delete('/users/:user', function (req, res, next) {
		User.findByIdAndRemove(req.params.user, function (err, pl) { 
			if (err) {console.error(err);next(err);}
			else res.redirect('/users');
		});
	});
	//edit
	app.get('/users/:user/edit', function (req, res, next) {
		User.findById(req.params.user, '_id name username role', function (err, user) {
			if (err) next(err);
			else res.render('users/edit', {user: user, title: 'Modifier un utilisateur'});
		});
	});
	//update
	app.put('/users/:user', checkRole, function (req, res, next) {
		var user = {
			role: req.body.role,
			username: req.body.username,
			name: req.body.name	
		};
		if (req.body.password)
			user.password = req.body.password;
		
		User.findByIdAndUpdate(req.params.user, user, function (err) {
				if (err) next(err);
				else res.redirect('/users');
			}
		);
	});
};
