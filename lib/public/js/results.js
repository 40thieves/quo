/**
 * Search results JS
 */

var form = document.querySelector('#search-results')
,	resultsWrapper = document.querySelector('#result-list')
,	counter = document.querySelector('#article-counter')
,	selectors = document.querySelector('#selectors')
;

// Checks article storage
var storedArticles = Storage.get('articles');
if (storedArticles) {
	// If there are articles, and append them
	storedArticles.forEach(function(article) {
		// Find articles in existing results with same DOI and check them
		var match = article.doi.match(/[0-9]+$/)[0]; // Uses last digits of DOI as identifier - full DOI unnecessary
		var el = document.querySelector('#article-' + match);

		// If existing article is in results, check, otherwise append to list
		if (el)
			el.checked = true;
		else
			appendArticle(article);
	});
}

// Progressive enhancement for select/deselect all - hidden until JS is enabled
selectors.classList.remove('hidden');
var	selectAll = selectors.querySelector('#select-all')
,	deselectAll = selectors.querySelector('#deselect-all')
;


/* EVENTS */

form.addEventListener('submit', submitHandler);

// Loop through all checkboxes and attach listeners
var checkboxes = resultsWrapper.querySelectorAll('li input[type="checkbox"]');
for (var i = 0; i < checkboxes.length; ++i) {
	var cb = checkboxes[i];

	cb.addEventListener('change', changeHandler);
}

selectAll.addEventListener('click', selectAllHandler);
deselectAll.addEventListener('click', deselectAllHandler);

/* HANDLERS */

/**
 * Captures form submission, sends XHR instead
 * Returns with data's unique id, so redirect to report page with this id
 */
function submitHandler(e) {
	e.preventDefault();

	var query = {
		doi: []
	};

	// Get selected articles
	for (var i = 0; i < checkboxes.length; ++i) {
		var cb = checkboxes[i];

		if (cb.checked)
			query.doi.push(cb.value);
	}

	// Empty storage
	Storage.remove('articles');

	// Create and send new XHR with selected articles
	new XhrUploader(query, {
		method: 'POST',
		url: 'api/report'
	}, {
		start: function(response) {
			// Shows friendly loading page
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

/**
 * Handles checking/unchecking articles
 */
function changeHandler(e) {
	if (e.target.checked) {
		addArticle(e.target);
	}
	else {
		removeArticle(e.target);
	}
}

/**
 * Selects all checkboxes
 */
function selectAllHandler(e) {
	e.preventDefault();
	for (var j = 0; j < checkboxes.length; ++j) {
		var checkAdd = checkboxes[j];
		checkAdd.checked = true;

		addArticle(checkAdd);
	}
}

/**
 * Deselects all checkboxes
 */
function deselectAllHandler(e) {
	e.preventDefault();
	for (var k = 0; k < checkboxes.length; ++k) {
		var checkRemove = checkboxes[k];
		checkRemove.checked = false;

		removeArticle(checkRemove);
	}
}

/**
 * Creates template for stored article and appends to DOM
 * @param  {Obj} article Article metadata
 */
function appendArticle(article) {
	var li = document.createElement('li');
	li.classList.add('checkbox');

	// Uses last digits of DOI as identifier
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

/**
 * Adds article to localStorage, using checked box
 * @param {DOM Element} el Selected checkbox elem
 */
function addArticle(el) {
	var parent = el.parentNode
	,	label = parent.querySelector('label')
	;

	// Navigate in DOM to get necessary data
	var data = {
		doi: el.value,
		title: parent.querySelector('h4 a').innerHTML,
		authors: label.querySelector('.authors').innerHTML,
		journal: label.querySelector('.journal').innerHTML,
		publication_date: label.querySelector('.publication_date').innerHTML
	};

	Storage.addToArray('articles', data);
	updateCounter(+counter.innerHTML + 1); // Cast badge val to num and increment
}

/**
 * Removes articles from localStorage, using unchecked box
 * @param  {DOM Element} el Deselected checkbox elem
 */
function removeArticle(el) {
	Storage.removeFromArray('articles', el.value, 'doi');
	updateCounter(+counter.innerHTML - 1); // Cast badge val to num and increment
}

/**
 * Shows loading screen by emptying DOM and replacing with loading template
 */
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
