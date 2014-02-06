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
	}
};