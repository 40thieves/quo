var resultsWrapper = document.querySelector('#result-list')
,	checkboxes = resultsWrapper.querySelectorAll('li input[type="checkbox"]')
;

for (var i = 0; i < checkboxes.length; ++i) {
	var cb = checkboxes[i];

	cb.addEventListener('change', changeHandler);
}

function changeHandler(e) {
	Storage.addToArray('dois', e.target.value);
}