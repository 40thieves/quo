var form = document.querySelector('#search-results')
,	resultsWrapper = document.querySelector('#result-list')
,	checkboxes = resultsWrapper.querySelectorAll('li input[type="checkbox"]')
,	counter = document.querySelector('#article-counter')
;

form.addEventListener('submit', submitHandler);

for (var i = 0; i < checkboxes.length; ++i) {
	var cb = checkboxes[i];

	cb.addEventListener('change', changeHandler);
}

function submitHandler(e) {
	e.preventDefault();

	var query = {
		doi: []
	};

	for (var i = 0; i < checkboxes.length; ++i) {
		var cb = checkboxes[i];

		if (cb.checked)
			query.doi.push(cb.value);
	}

	new XhrUploader(query, {
		method: 'POST',
		url: 'api/report'
	}, {
		start: function(response) {
			showLoading();
		},
		success: function(succ, response) {
			window.location.href = window.location.origin + '/report/' + succ._id;
		},
		error: function(err, response) {
			console.log('err', err);
		}
	});
}

function changeHandler(e) {
	if (e.target.checked) {
		Storage.addToArray('doi', e.target.value);
		counter.innerHTML = +counter.innerHTML + 1; // Cast badge val to num and increment
	}
	else {
		Storage.removeFromArray('doi', e.target.value);
		counter.innerHTML = +counter.innerHTML - 1; // Cast badge val to num and increment
	}
}

function showLoading() {
	var container = document.querySelector('.container');

	var html = '<div class="loading-animation">';

	html += 'Loading';
	html += '<span class="dot1">.</span>';
	html += '<span class="dot2">.</span>';
	html += '<span class="dot3">.</span>';
	html += '</div>';

	container.innerHTML = html;
}
