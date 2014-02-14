var reportId = window.location.pathname.replace(/\/report\//, '');

var chart = new AlmChart({
	el: document.querySelector('#chart'),
	url: '/api/report/' + reportId
});
chart.draw();

var xAxis = document.querySelector('#x-axis')
,	yAxis = document.querySelector('#y-axis')
;

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