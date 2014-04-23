/**
 * Router
 *
 * Defines which controller method will be used when given routes are requested
 */

var IndexController = require('./controllers/index')
,	SearchResultsController = require('./controllers/results')
,	ReportController = require('./controllers/report')
,	ApiReportController = require('./controllers/api/report')
;

exports.createRoutes = function(app) {
	app.get('/', function(req, res, next) {
		IndexController.index(req, res, next);
	});

	app.get('/search', function(req, res, next) {
		SearchResultsController.index(req, res, next);
	});

	app.get('/report/:id', function(req, res, next) {
		ReportController.index(req, res, next);
	});

	app.post('/generate', function(req, res, next) {
		ReportController.create(req, res, next);
	});

	app.get('/api/report/:id', function(req, res, next) {
		ApiReportController.getSingle(req, res, next);
	});

	app.post('/api/report', function(req, res, next) {
		ApiReportController.create(req, res, next);
	});
};