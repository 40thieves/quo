var mongoose = require('mongoose')
,	_ = require('underscore')

,	Schema = mongoose.Schema

,	ArticleModel = require('./article')
;

var ReportSchema = Schema({
	id: Number,
	createdAt: {
		type: Date,
		default: Date.now
	},
	articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

ReportSchema.methods.saveArticles = function(articles) {
	var self = this;

	if (_.isArray(articles)) {
		articles.forEach(function(article) {
			var model = new ArticleModel(article);
			model.saveSources(article.sources);
			model.save();

			self.articles.push(model._id);
		});
	}
	else {
		var model = new ArticleModel(articles);
		model.saveSources(articles.sources);
		model.save();

		this.articles.push(model._id);
	}
};

module.exports = mongoose.model('Report', ReportSchema);