var _ = require('underscore');

module.exports = {
	// Name of the controller
	name: 'Api',

	data: {},

	/**
	 * Extends base controller with child's specific functionality
	 * @param  {Object} child Child object to extend with
	 * @return {Object}       Extended obj
	 */
	extend: function(child) {
		return _.extend({}, this, child);
	},

	/**
	 * Renders the response
	 * @param  {Obj}      req      Request obj
	 * @param  {Obj}      res      Response obj
	 * @param  {Function} next     Middleware callback to next
	 * @param  {String}   viewName Optional name of view, defaults to name of controller
	 * @return void
	 */
	run: function(req, res, next) {
		res.send(this.data);
	}
};