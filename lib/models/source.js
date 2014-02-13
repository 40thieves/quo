var mongoose = require('mongoose');

var SourceSchema = mongoose.Schema({
	name: String,
	display_name: String,
	events_url: String,
	metrics: Object,
	update_date: Date,
	by_day: Array,
	by_month: Array,
	by_year: Array,
	histories: Array
});

module.exports = {
	Schema: SourceSchema,
	Model: mongoose.model('Source', SourceSchema)
};