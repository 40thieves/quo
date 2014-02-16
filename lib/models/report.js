var mongoose = require('mongoose')

,	ArticleSchema = require('./article').Schema
,	InternalServerError = require('../errors/internalServer')
;

var ReportSchema = mongoose.Schema({
	articles: [ArticleSchema],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

ReportSchema.methods.create = function(callback) {
	this.save(function(err) {
		if (err)
			return next(new InternalServerError('Save failed'));
	});

	callback(this);
};

module.exports = {
	Schema: ReportSchema,
	Model: mongoose.model('Report', ReportSchema)
};