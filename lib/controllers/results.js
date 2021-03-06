/**
 * Search Results Controller
 *
 * Controls generation of search results from Search API wrapper (plos-search)
 */

var Search = require('plos-search')

,	BaseController = require('./base')
,	NotFoundError = require('../errors/notFound')
,	InternalServerError = require('../errors/internalServer')
;

var SearchResultsController = BaseController.extend({
	name: 'Results',

	/**
	 * Handler for index route, renders search form view
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	index: function(req, res, next) {
		var self = this
		,	params = req.query
		;

		// Clicked stored articles badge, just return empty search results template
		if (params.hasOwnProperty('storage')) {
			this.data = null;
			return this.run(req, res, next);
		}

		params = filterParams(params);

		var search = new Search(params);

		search.on('success', function(data) {
			self.data = { articles: data };

			return self.run(req, res, next);
		});

		search.on('error', function(err) {
			if (err.message == 'No results found')
				return next(new NotFoundError('No results found'));
			else
				return next(new InternalServerError('Search error'));
		});

		search.fetch();
	}
});

/**
 * Filters input parameters, removing empty values so that request url doesn't create errors
 * @param  {Obj} params Input parameters
 * @return {Obj}        Filters parameters
 */
function filterParams(params) {
	var ret = {};

	for (var key in params) {
		var p = params[key];

		if (p)
			ret[key] = p;
	}

	return ret;
}

module.exports = SearchResultsController;
