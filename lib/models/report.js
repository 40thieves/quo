var mongoose = require('mongoose')
,	ArticleSchema = require('./article').Schema
;

var ReportSchema = mongoose.Schema({
	articles: [ArticleSchema],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = {
	Schema: ReportSchema,
	Model: mongoose.model('Report', ReportSchema)
};