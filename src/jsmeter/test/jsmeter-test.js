/**
 *
 */

var meter = [];

$(function() {
	meter.push(new JSGadget.Meter("#meter1", {title: "title"}));
	meter.push(new JSGadget.Meter("#meter2", {
		title: "title",
		angle: 240,
		min: -1,
		max: 1,
		scale: {
			lm: {
				s: 0.2
			},
			sm: {
				s: 0.05
			}
		}
	}));
	meter.push(new JSGadget.Meter("#meter3", {
		title: "JSMeter",
		min: 0,
		max: 10,
		scale: {
			lm: {
				s: 2,
				fc: "red"
			},
			sm: {
				s: 0.5
			}
		},
		font: {
			color: "red"
		}
	}));

	var v = 0, f = false;
	setInterval(function() {
		if (v <= 0)
			f = true;
		else if (v >= 100)
			f = false;
		v += f ? 1 : -1;
		for (var i = 0, l = meter.length; i < l; ++i)
			meter[i].setVal(meter[i].opt.min +
					v * (meter[i].opt.max - meter[i].opt.min) / 100);
	}, 1000);
});

