var Search = require('plos-search')
,	BaseController = require('./Base')
;

var SearchController = BaseController.extend({
	name: 'Search',

	/**
	 * Handler for index route, renders appropriate view
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	index: function(req, res, next) {
		var self = this
		,	params = req.query;

		var search = new Search('altmetrics');

		search.on('success', function(data) {
			self.data = data;

			self.run(req, res, next);
		});

		search.fetch();
	}
});

module.exports = SearchController;
