/**
 * JS for badge showing stored articles
 */

var badge = document.querySelector('.article-counter-wrapper')
,	counter = document.querySelector('#article-counter');

// Progressive check for localStorage support
if (Storage.isSupported()) {
	var storedArticles = Storage.get('articles');
	if (storedArticles && storedArticles.length) {
		ShowerHider.show(badge);
		updateCounter(storedArticles.length);
	}
}

/**
 * Updates counter HTML with new number
 * @param  {Int} num New number
 */
function updateCounter(num) {
	counter.innerHTML = num;
}