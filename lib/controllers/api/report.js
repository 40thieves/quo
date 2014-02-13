var ApiController = require('./api')

,	Report = require('../../models/report').Model
,	InternalServerError = require('../../errors/internalServer')
,	NotFoundError = require('../../errors/notFound')
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

		Report.findById(id, function(err, result) {
			if (err)
				return next(new InternalServerError('Report fetch failed'));

			if ( ! result)
				return next(new NotFoundError('Report not found'));

			self.data = result.articles;
			self.run(req, res, next);
		});
	}
});

module.exports = ReportController;
