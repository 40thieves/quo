var _ = require('underscore');

/**
 * Constructor for base view
 * @param  {Object} response Response object
 * @param  {String} template Template name
 * @return void
 */
module.exports = function(response, template) {
	this.response = response;
	this.template = template;
};

module.exports.prototype = {
	/**
	 * Extends existing view with new properties
	 * @param  {Object} properties Properties to extend base with
	 * @return {Object}            Extended object
	 */
	extend: function(properties) {
		var Child = module.exports;
		Child.prototype = module.exports.prototype;

		for (var key in properties) {
			Child.prototype[key] = properties[key];
		}

		return Child;
	},

	/**
	 * Calls render function on view's template
	 * @param  {Object} data Data to pass into view when rendering
	 * @return void
	 */
	render: function(data) {
		if (this.response && this.template) {
			this.response.render(this.template, data);
		}
	}
};