/**
 *
 */

var display = [];

$(function() {
	display.push(new JSGadget.Display("#display1", {
		digits: 4,
		shadow: {
			color: "silver"
		}
	}, "012.8"));
	display.push(new JSGadget.Display("#display2", {digits: 4}, "-12.8"));
	display.push(new JSGadget.Display("#display3", {digits: 4, color: "lime"}, "012.8"));
	display.push(new JSGadget.Display("#display4", {digits: 4, color: "lime"}, "012.8"));

	clock.push(new JSGadget.Display("#clock1", {digits: 2, color: "lime"}, "00"));
	clock.push(new JSGadget.Display("#clock2", {digits: 2, color: "lime"}, "00"));
	clock.push(new JSGadget.Display("#clock3", {digits: 2, color: "lime"}, "00"));
	setInterval(function() {
		if (f = !f)
			showTime();
		$("#clock_s1").css("background", f ? "lime" : "black");
		$("#clock_s2").css("background", f ? "lime" : "black");
	}, 500);
	showTime();
});

var clock = [], clock_v = [], f = true;

function showTime() {
  var t = new Date(),
  		s = t.getSeconds(),
  		m = t.getMinutes(),
  		h = t.getHours();
  if (s !== clock_v[2]) {
  	clock_v[2] = s;
  	clock[2].setVal(int22dig(s));
  }
  if (m !== clock_v[1]) {
  	clock_v[1] = m;
  	clock[1].setVal(int22dig(m));
  }
  if (h !== clock_v[0]) {
  	clock_v[0] = h;
  	clock[0].setVal(int22dig(h));
  }
}
function int22dig(v) {
	return v < 10 ? "0" + v : "" + v;
};

