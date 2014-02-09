var form = document.querySelector('form');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	var query = {};
	if (e.target.everything.value) query.everything = e.target.everything.value;
	if (e.target.author.value) query.author = e.target.author.value;
	if (e.target.journal.value) query.journal = e.target.journal.value;
	if (e.target.subject.value) query.subject = e.target.subject.value;
	if (e.target.publication_date.value) query.publication_date = e.target.publication_date.value;
	if (e.target.id.value) query.id = e.target.id.value;

	if (query) {
		var str = '?';
		for (var key in query) {
			var val = query[key];

			str += key + '=' + val + '&';
		}

		window.location.href = 'search' + str.slice(0, -1);
	}
});