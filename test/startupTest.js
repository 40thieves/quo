var expect = require('chai').expect;

describe('Configuration setup', function() {
	it('should load dev config', function() {
		var config = require('../lib/config')();

		expect(config.mode).to.equal('dev');
	});

	it('should load production config', function() {
		var config = require('../lib/config')('production');

		expect(config.mode).to.equal('production');
	});
});