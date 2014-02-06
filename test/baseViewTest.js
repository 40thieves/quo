/* jshint expr: true */
var expect = require('chai').expect
,	View = require('../lib/views/Base.js')
;

describe('Base View', function() {
	it('should create and render new view', function() {
		// Mock response object
		var responseMock = {
			render: function(template, data) {
				expect(data.testProperty).to.equal('foo');
				expect(template).to.equal('template-file');
			}
		};

		var instance = new View(responseMock, 'template-file');
		instance.render({ testProperty: 'foo' });
	});

	it('should be extendable', function() {
		var v = new View();

		var OtherView = v.extend({
			render: function(data) {
				expect(data.testProperty).to.equal('foo');
			}
		});

		var otherViewInstance = new OtherView();
		expect(otherViewInstance.render).to.exist;

		otherViewInstance.render({ testProperty: 'foo' });
	});
});