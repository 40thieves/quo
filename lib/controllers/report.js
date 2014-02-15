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

	index: function(req, res, next) {
		var self = this
		,	id = req.params.id
		;

		Report.findById(id, function(err, result) {
			if (err)
				return next(new InternalServerError('Server error'));

			if ( ! result)
				return next(new NotFoundError('Result not found'));

			self.data = result;

			self.run(req, res, next);
		});
	},

	/**
	 * Handler for index route, renders appropriate view
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	create: function(req, res, next) {
		var self = this
		,	doi = req.body.doi
		;

		var alm = new Alm(doi, config);

		alm.on('success', function(results) {
			if ( ! _.isArray(results))
				results = [results];

			var report = new Report({
				articles: results
			});

			report.save(function(err) {
				if (err)
					return next(new InternalServerError('Save failed'));

				res.redirect('report/' + report._id);
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
