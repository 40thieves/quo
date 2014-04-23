var Alm = require('nodealm')
,	_ = require('underscore')

,	BaseController = require('./base')
,	Report = require('../models/report').Model
,	InternalServerError = require('../errors/internalServer')
,	NotFoundError = require('../errors/notFound')

,	config = require('../config')().alm
;

var ReportController = BaseController.extend({
	name: 'Report',

	/**
	 * Handler for index route, retrieves data using unique id and renders report view
	 * @param  {Obj}   req  Request obj
	 * @param  {Obj}   res  Response obj
	 * @param  {Function} next Next callback
	 * @return void
	 */
	index: function(req, res, next) {
		var self = this
		,	id = req.param('id')
		;

		// Finds by id on Report models
		Report.findById(id, function(err, result) {
			if (err)
				return next(new InternalServerError('Server error'));

			if ( ! result)
				return next(new NotFoundError('Result not found'));

			self.data = result;

			// Renders response
			self.run(req, res, next);
		});
	},

	/**
	 * Creates new report
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	create: function(req, res, next) {
		var self = this
		,	doi = req.param('doi')
		;

		// Instantiates nodealm module
		var alm = new Alm(doi, config);

		alm.on('success', function(results) {
			var report = new Report({
				articles: results
			});

			report.create(function(succ) {
				// Defer necessary for save to complete before redirect
				_.defer(function() {
					res.redirect('report/' + succ._id);
				});
			});
		});

		alm.on('error', function(err) {
			console.log('ERR', err);

			return next(new InternalServerError('ALM error'));
		});

		alm.fetch();
	}
});

module.exports = ReportController;
