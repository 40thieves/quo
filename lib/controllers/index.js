var BaseController = require('./Base');

var IndexController = BaseController.extend({
	name: 'Index',

	/**
	 * Handler for index route, renders appropriate view
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
