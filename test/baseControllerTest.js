/* jshint expr: true */
var expect = require('chai').expect
,	Controller = require('../lib/controllers/Base')
;

describe('Creation', function() {
	it('should have a method which returns a child instance', function() {
		expect(Controller.extend).to.exist;

		var child = Controller.extend({ name: 'test child container' });

		expect(child.name).to.equal('test child container');
		expect(child.run).to.exist;
		expect(child.data).to.exist;
	});

	it('should be able to create different children', function() {
		var childA = Controller.extend({ name: 'child A', testProperty: 'foo' });
		var childB = Controller.extend({ name: 'child B' });

		expect(childA.name).to.not.equal(childB.name);
		expect(childB.testProperty).to.not.exist;
	});
});