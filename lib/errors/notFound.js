var NotFoundError = function(message) {
	this.name = 'NotFoundError';
	this.status = 404;
	this.message = message || 'Resource not found';

	this.view = '404';
};

NotFoundError.prototype = new Error();
NotFoundError.prototype.contructor = NotFoundError;

module.exports = NotFoundError;