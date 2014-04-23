var express = require('express')
,	http = require('http')
,	path = require('path')
,	hbs = require('express3-handlebars')
,	mongoose = require('mongoose')

,	config = require('./lib/config')()
,	routes = require('./lib/router')
;

// Database connection initialisation
var connect = function() {
	var options = {};
	mongoose.connect(config.db.host, options);
};
connect();

mongoose.connection.on('error', function(err) {
	console.log(err);
});

mongoose.connection.on('disconnect', function() {
	console.log('Mongoose: disconnected');
	connect();
});

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

	// Sets up router
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '/lib/public'))); // Defines static routes (JS/CSS assets)

	// Sets up error handing
	app.use(function(err, req, res, next) {
		console.error(err.name + ' Error: ' + err.message);

		// If status is given, render error page with this status
		if (err.status) {
			res.status(err.status);

			// If error has assigned view, use this view, otherwise render generic error view
			if (err.view)
				res.render(err.view, err);
			else
				res.render(err.status, err);
		}
		// Otherwise render generic error page
		else {
			res.status(500);

			res.render('500', {
				message: err.message,
				status: 500
			});
		}
	});
});

// Dev only settings
app.configure('development', function() {
	// Better error handling + stack trace
	app.use(express.errorHandler());
});

// Set up routes in router
routes.createRoutes(app);

// Start server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Quo running on port ' + app.get('port'));
});