var mongoose = require('mongoose')
,	SourceSchema = require('./source')
;

var ArticleSchema = mongoose.Schema({
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
	// sources: [SourceSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);