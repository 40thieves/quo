var mongoose = require('mongoose')
,	_ = require('underscore')

,	Schema = mongoose.Schema

,	SourceSchema = require('./source')
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
	sources: [{ type: Schema.Types.ObjectId, ref: 'Source' }]
});

ArticleSchema.methods.saveSources = function(sources) {
	for (var key in sources) {
		var source = sources[key];

		var model = new SourceSchema(source);
		model.save();

		this.sources.push(model._id);
	}
};

module.exports = mongoose.model('Article', ArticleSchema);