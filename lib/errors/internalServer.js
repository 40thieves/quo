/**
 * Error created when an unknown error has occurred in the server
 */

var InternalServerError = function(message) {
	var stack = this.stack;

	this.name = 'InternalServerError';
	this.status = 500;
	this.message = message || 'Internal Server Error';
	this.view = '500';
	this.stackTrace = stack;
};

InternalServerError.prototype = new Error();
InternalServerError.prototype.contructor = InternalServerError;

module.exports = InternalServerError;