var IndexController = require('./controllers/index')
;

exports.createRoutes = function(app) {
	app.get('/', function(req, res, next) {
		IndexController.index(req, res, next);
	});

	app.get('/search', function(req, res, next) {
		SearchController.index(req, res, next);
	});
};