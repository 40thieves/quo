var parseJson = function(json) {
	try {
		return JSON.parse(json);
	}
	catch (e) {
		return false;
	}
};

/**
 * Util: Local Storage wrapper
 * 
 * Get, set, remove values from localStorage
 */
var Storage = {
	isSupported: function() {
		try {
			localStorage.setItem('supported-test', 'yes');
			localStorage.removeItem('supported-test');
			return true;
		}
		catch (e) {
			return false;
		}
	},
	get: function(key) {
		return parseJson(localStorage.getItem(key));
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
	removeFromArray: function(key, value, arrayKey) {
		if (localStorage[key]) {
			var tmp = this.get(key)
			,	index = tmp.indexOf(value)
			;

			// Handles arrays of objects
			if (index == -1 && tmp[0] instanceof Object) {
				tmp.forEach(function(t, i) {
					if (t[arrayKey] == value)
						index = i;
				});
			}

			if (index > -1)
				tmp.splice(index, 1);

			this.set(key, tmp);
		}
		else {
			this.remove(key);
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

var XhrUploader = function(data, config, callbacks) {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(e) {
		if (xhr.readyState == 1)
			callbacks.start(xhr);

		if (xhr.readyState !== 4) return;

		if (xhr.status === 200)
			callbacks.success(parseJson(xhr.response), xhr);
		else
			callbacks.error(parseJson(xhr.response), xhr);
	};

	xhr.open(config.method, config.url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(data));
};

var ShowerHider = {
	show: function(elem) {
		elem.classList.remove('hidden');
		elem.classList.add('show');
	},
	hide: function(elem) {
		elem.classList.remove('show');
		elem.classList.add('hidden');
	}
};