/**
 *
 */

var counter = [];

$(function() {
	for (var i = 1; i <= 6; ++i)
		counter.push(new JSGadget.Counter("#counter" + i, {
			digits: 4,
			color: i < 4 ? "black" : "white"
	}));
	$("#inc").click(function() {
		for (var i = 0, l = counter.length; i < l; ++i)
			counter[i].inc();
	});
	$("#dec").click(function() {
		for (var i = 0, l = counter.length; i < l; ++i)
			counter[i].dec();
	});
});

