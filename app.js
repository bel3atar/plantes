require('mongoose').connect('mongodb://localhost/plants');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')({format: 'dev'}));
app.use(require('body-parser')());
app.use(require('multer')({dest: './public/images/'}));
app.use(require('method-override')());

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/plants')(app);

app.get('/', function (req, res, next) { res.redirect('/plants') });
if ('development' == app.get('env')) {
	app.locals.pretty = true;
  //app.use(express.errorHandler());
}
app.use(function (req, res, next) {
	res.status(404);
	res.render('error', {title: 'Erreur 404', error: req.path});
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('error', {title: 'Erreur 500', error: req.path});
});


app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
