var http = require('http');
var path = require('path');
var express = require('express');
var Resouce = require('express-resource');
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
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

['plants'].forEach(function (res) {
	app.resource(res, require('./routes/' + res));
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
