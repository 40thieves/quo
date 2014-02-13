var mongoose = require('mongoose')
,	_ = require('underscore')

,	Schema = mongoose.Schema

,	SourceSchema = require('./source').Schema
;

var ArticleSchema = Schema({
	doi: String,
	title: String,
	url: String,
	mendeley: String,
	pmid: String,
	pmcid: String,
	publication_date: Date,
	update_date: Date,
	views: Number,
	shares: Number,
	bookmarks: Number,
	citations: Number,
	sources: [SourceSchema]
});

module.exports = {
	Schema: ArticleSchema,
	Model: mongoose.model('Article', ArticleSchema)
};