var Alm = require('nodealm')

,	BaseController = require('./base')
,	Report = require('../models/report')

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
				res.send(404, 'Report not found');

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

		alm.on('success', function(result) {
			var report = new Report();
			report.saveArticles(result);

			report.save(function(err) {
				if (err)
					return next(new Error('Save failed'));
			});

			res.redirect('report/' + report._id);
			// self.run(req, res, next);
		});

		alm.fetch();
	}
});

module.exports = ReportController;
