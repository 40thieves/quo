var Alm = require('nodealm')

,	BaseController = require('./base')
,	ReportModel = require('../models/report')

,	config = require('../config')().alm
;

var GenerateController = BaseController.extend({
	name: 'Generate',

	/**
	 * Handler for index route, renders appropriate view
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	index: function(req, res, next) {
		var self = this
		,	doi = req.body.doi
		;

		var alm = new Alm(doi, config);

		alm.on('success', function(result) {
			var report = new ReportModel();
			report.saveArticles(result);
			report.save();

			self.run(req, res, next);
		});

		alm.fetch();
	}
});

module.exports = GenerateController;
