/**
 *
 */

var clock = [];

$(function() {
	clock.push(new JSGadget.Clock("#clock1"));
	clock.push(new JSGadget.Clock("#clock2", {utc: true, title: "UTC"}));
	clock.push(new JSGadget.Clock("#clock2_1", {gap: 8, title: "Local"}));
	clock.push(new JSGadget.Clock("#clock3"));
	clock.push(new JSGadget.Clock("#clock4", {
		gap: 10,
		dh: {c: "yellow", l: 4},
		dm: {c: "yellow", l: 2},
		hh: {c: "lime"},
		mh: {c: "lime"}
	}));
	clock.push(new JSGadget.Clock("#clock5", {
		dh: {f: "t", w: 5, c: "red"},
		dm: {f: "c", w: 2},
		hh: {f: "t", w: 6, l: 30},
		mh: {f: "t", w: 4, l: 35, cr: 5},
		sh: {l: 38, cr: 4}
	}));

	$(window).resize(function() {doResize();});
});

function doResize() {
	for (var i = 0, l = clock.length; i < l; ++i)
		clock[i].resize();
}