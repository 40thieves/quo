var express = require('express')
,	http = require('http')
,	path = require('path')
,	hbs = require('express3-handlebars')

,	config = require('./lib/config')()
,	routes = require('./lib/router')
;

// Creates express instance
var app = express();

// General config
app.configure(function() {
	// Sets port
	app.set('port', config.port);

	// Sets location of views dir
	app.set('views', __dirname + '/lib/templates');

	// Sets Handlebars as view template engine
	app.engine('hbs', hbs({
		extname: '.hbs',
		layoutsDir: __dirname + '/lib/templates/layouts/',
		defaultLayout: 'main',
		helpers: require('./lib/templates/helpers')
	}));
	app.set('view engine', 'hbs');

	// Sets favicon
	app.use(express.favicon());

	// Sets up logging
	app.use(express.logger('dev'));

	// Sets up parsers for JSON & urlencoded
	app.use(express.json());
	app.use(express.urlencoded());

	// Sets up simulation for DELETE & PUT
	app.use(express.methodOverride());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// Dev only settings
app.configure('development', function() {
	// Better error handling + stack trace
	app.use(express.errorHandler());
});

routes.createRoutes(app);

// app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Quo running on port ' + app.get('port'));
});