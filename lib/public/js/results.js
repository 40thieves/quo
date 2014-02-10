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

/**
 * Util: Local Storage wrapper
 * 
 * Get, set, remove values from localStorage
 */
var Storage = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	set: function(key, value, force) {
		if (value || force) {
			localStorage.setItem(key, JSON.stringify(value));
		}
		else {
			localStorage.removeItem(key);
		}
	},
	add: function(key, value) {
		if (localStorage[key]) {
			var tmp = this.get(key);
			this.set(key, this.extendObj(tmp, value));
		}
		else {
			this.set(key, value);
		}
	},
	addToArray: function(key, value) {
		if (localStorage[key]) {
			var tmp = this.get(key);
			tmp.push(value);
			this.set(key, tmp);
		}
		else {
			this.set(key, [value]);
		}
	},
	remove: function(key) {
		localStorage.removeItem(key);
	},
	extendObj: function(orig, extra) {
		Object.keys(extra).forEach(function(key) {
			orig[key] = extra[key];
		});

		return orig;
	}
};