/**
 * Report page JS
 */

// Gets unique identifier of data from URL
var reportId = window.location.pathname.replace(/\/report\//, '');

// Instantiates AlmChart library
var chart = new AlmChart({
	el: document.querySelector('#chart'),
	url: '/api/report/' + reportId
});
chart.draw();

var xAxis = document.querySelector('#x-axis')
,	yAxis = document.querySelector('#y-axis')
;

// Handles change event on x-axis select box, and updates chart
xAxis.addEventListener('change', function(e) {
	var x = { text: this.options[e.target.selectedIndex].text, value: e.target.value };
	var y = { text: yAxis.options[yAxis.selectedIndex].text, value: yAxis.value };

	changeAxis(x, y);
});

yAxis.addEventListener('change', function(e) {
	var y = { text: this.options[e.target.selectedIndex].text, value: e.target.value };
	var x = { text: xAxis.options[xAxis.selectedIndex].text, value: xAxis.value };

	changeAxis(x, y);
});

// Updates AlmChart library with new data sources and redraws
function changeAxis(x, y) {
	chart.setConfig({
		dataSourceKeys: {
			x: x.value,
			y: y.value
		},
		dataSourceNames: {
			x: x.text,
			y: y.text
		}
	});

	chart.draw();
}