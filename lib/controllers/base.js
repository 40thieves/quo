/**
 * Base Controller
 *
 * Abstract controller - all (non-API) controllers inherit from this controller
 * Controls generation and sending of response from a view
 */

var _ = require('underscore')

,	BaseView = require('../views/base')
;

module.exports = {
	// Name of the controller
	name: 'Base',

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
	 * View name is found, then used to render and send response
	 * @param  {Obj}      req      Request obj
	 * @param  {Obj}      res      Response obj
	 * @param  {Function} next     Middleware callback to next
	 * @param  {String}   viewName Optional name of view, defaults to name of controller
	 * @return void
	 */
	run: function(req, res, next, viewName) {
		if ( ! viewName) viewName = this.name.toLowerCase();

		var view = new BaseView(res, viewName);

		view.render(this.data);
	}
};