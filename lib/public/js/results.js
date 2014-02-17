var form = document.querySelector('#search-results')
,	resultsWrapper = document.querySelector('#result-list')
,	counter = document.querySelector('#article-counter')
;

var storedArticles = Storage.get('articles');
if (storedArticles) {
	storedArticles.forEach(function(article) {
		var match = article.doi.match(/[0-9]+$/)[0];
		var el = document.querySelector('#article-' + match);

		if (el)
			el.checked = true;
		else
			appendArticle(article);
	});
}

/* EVENTS */
form.addEventListener('submit', submitHandler);

var checkboxes = resultsWrapper.querySelectorAll('li input[type="checkbox"]');
for (var i = 0; i < checkboxes.length; ++i) {
	var cb = checkboxes[i];

	cb.addEventListener('change', changeHandler);
}

/* HANDLERS */

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

	Storage.remove('articles');

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

		var parent = e.target.parentNode
		,	label = parent.querySelector('label')
		;

		var data = {
			doi: e.target.value,
			title: parent.querySelector('h4 a').innerHTML,
			authors: label.querySelector('.authors').innerHTML,
			journal: label.querySelector('.journal').innerHTML,
			publication_date: label.querySelector('.publication_date').innerHTML
		};

		Storage.addToArray('articles', data);
		updateCounter(+counter.innerHTML + 1); // Cast badge val to num and increment
	}
	else {
		Storage.removeFromArray('articles', e.target.value, 'doi');
		updateCounter(+counter.innerHTML - 1); // Cast badge val to num and increment
	}
}

function appendArticle(article) {
	var li = document.createElement('li');
	li.classList.add('checkbox');

	var id = article.doi.match(/[0-9]+$/)[0];

	var html = '<input type="checkbox" name="doi" value="' + article.doi + '" id="article-' + id + '" checked>';
	html += '<h4><a href="http://dx.doi.org/' + article.doi + '">' + article.title + '</a></h4>';
	html += '<label for="article-' + id + '">';
	html += '<p class="authors">' + article.authors + '</p>';
	html += '<p class="journal">' + article.journal + '</p>';
	html += '<p class="publication_date">Published on '+ article.publication_date + '</p>';
	html += '</label>';

	li.innerHTML = html;
	resultsWrapper.appendChild(li);
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
