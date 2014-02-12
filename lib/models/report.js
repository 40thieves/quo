var mongoose = require('mongoose')
,	Schema = mongoose.Schema

,	ArticleModel = require('./article')
;

var ReportSchema = Schema({
	id: Number,
	createdAt: {
		type: Date,
		default: Date.now
	},
	articles: { type: Schema.ObjectId, ref: 'Article' }
});

module.exports = mongoose.model('Report', ReportSchema);