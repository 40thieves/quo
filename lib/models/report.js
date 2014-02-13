var mongoose = require('mongoose')
,	_ = require('underscore')

,	Schema = mongoose.Schema

,	ArticleSchema = require('./article').Schema
;

var ReportSchema = Schema({
	id: Number,
	createdAt: {
		type: Date,
		default: Date.now
	},
	articles: [ArticleSchema]
});

module.exports = {
	Schema: ReportSchema,
	Model: mongoose.model('Report', ReportSchema)
};