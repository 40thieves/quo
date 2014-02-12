var IndexController = require('./controllers/index')
,	SearchController = require('./controllers/search')
,	GenerateController = require('./controllers/generate')
;

exports.createRoutes = function(app) {
	app.get('/', function(req, res, next) {
		IndexController.index(req, res, next);
	});

	app.get('/search', function(req, res, next) {
		SearchController.index(req, res, next);
	});

	app.post('/generate', function(req, res, next) {
		GenerateController.index(req, res, next);
	});
};