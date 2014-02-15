var resultsWrapper = document.querySelector('#result-list')
,	checkboxes = resultsWrapper.querySelectorAll('li input[type="checkbox"]')
,	counter = document.querySelector('#article-counter')
;

for (var i = 0; i < checkboxes.length; ++i) {
	var cb = checkboxes[i];

	cb.addEventListener('change', changeHandler);
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

