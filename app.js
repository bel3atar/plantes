require('mongoose').connect('mongodb://localhost/plants');
var path = require('path');
var express = require('express');
var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(
	'KtdXL6AU_/d1xQ42:>#^5!G-9T<#^+44nZ3g1CE0,0[p/ks(dXNz5w7|P2s<9V2'
));
app.use(express.session());
app.use(app.router);

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
