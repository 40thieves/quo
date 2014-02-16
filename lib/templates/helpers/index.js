module.exports = {
	debug: function(arg) {
		console.log(arg);
	},
	type: function(arg) {
		console.log(typeof arg);
	},

	authors: function(authors) {
		if (authors.length <= 3) {
			return authors.join(', ');
		}
		else {
			authors = authors.slice(0, 3);
			return authors.join(', ') + ' et al.';
		}
	},

	date_format: function(date) {
		date = new Date(date);

		var day = date.getDate()
		,	month = date.getMonth() + 1
		,	year = date.getFullYear()
		;

		return day + '/' + month + '/' + year;
	},

	convert_doi_to_id: function(doi) {
		var match = doi.match(/[0-9]+$/);
		return match[0];
	}
};