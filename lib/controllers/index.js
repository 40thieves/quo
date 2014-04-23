/**
 * Index Controller
 *
 * Controls response for home page with search form
 */

var BaseController = require('./base');

var IndexController = BaseController.extend({
	name: 'Index',

	/**
	 * Handler for index route, renders home view with search form
	 * @param  {Obj}      req  Request obj
	 * @param  {Obj}      res  Response obj
	 * @param  {Function} next Middleware callback to next in flow
	 * @return void
	 */
	index: function(req, res, next) {
		this.run(req, res, next);
	}
});

module.exports = IndexController;
