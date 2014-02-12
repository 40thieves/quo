var ApiController = require('./api')

,	Report = require('../../models/report')
;

var ReportController = ApiController.extend({
	name: 'Report',

	/**
	 * Handler for index route, renders appropriate view
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	getSingle: function(req, res, next) {
		var self = this
		,	id = req.params.id
		;

		Report.findById(id)
			.populate('articles') // Include article sub documents
			.exec(function(err, result) {
				if (err)
					res.send(404, 'Report not found');

				// Populate the nested source structure - has to be performed on pre-populated article documents
				// i.e. - can't be done in a single populate command
				Report.populate(result, {
					path: 'articles.sources',
					model: 'Source'
				}, function(err, r) {
					self.data = r.articles;

					self.run(req, res, next);
				});
			});
	}
});

module.exports = ReportController;
