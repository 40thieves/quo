var counter = document.querySelector('#article-counter');

var storedArticles = Storage.get('articles');
if (storedArticles)
	updateCounter(storedArticles.length);

function updateCounter(num) {
	counter.innerHTML = num;
}
