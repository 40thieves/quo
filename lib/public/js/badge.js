var badge = document.querySelector('.article-counter-wrapper')
,	counter = document.querySelector('#article-counter');

if (Storage.isSupported()) {
	var storedArticles = Storage.get('articles');
	if (storedArticles.length) {
		ShowerHider.show(badge);
		updateCounter(storedArticles.length);
	}
}

function updateCounter(num) {
	counter.innerHTML = num;
}