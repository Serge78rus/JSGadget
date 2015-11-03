/**
 *
 */

var calendar = [];

$(function() {
	calendar.push(new JSGadget.Calendar("#calendar1"));
});

function doResize() {
	for (var i = 0, l = calendar.length; i < l; ++i)
		calendar[i].resize();
}