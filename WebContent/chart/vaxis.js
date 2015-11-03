/**
 * vaxis.js
 */

//VAxis declaration
JSGadget.VAxis = function(chart, min, max) {
	JSGadget.VAxis.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.VAxis, JSGadget.Axis);
//VAxis implementation
JSGadget.VAxis.prototype.calcGrid = function() {
	function order(v) {
	  var ord = 0;
	  for (; v > 1; ++ord) v /= 10;
	  for (; v < 0.1; --ord) v *= 10;
	  return ord;
	}
	function scale(v, ord) {
	  for (; ord > 0; --ord) v /= 10;
	  for (; ord < 0; ++ord) v *= 10;
	  return v;
	}
	var d = this.zoom ? this.zoom.max - this.zoom.min : this.max - this.min, o = order(d);
	d = scale(d, o);
	if (d < 0.2) {
		this.grid = 0.05;
		this.sGrid = 0.01;
	}	else if (d < 0.5) {
		this.grid = 0.1;
		this.sGrid = 0.02;
	}	else {
		this.grid = 0.2;
		this.sGrid = 0.05;
	}
	this.grid = scale(this.grid, -o);
	this.sGrid = scale(this.sGrid, -o);
	this.offset = this.grid > 0 ? (this.zoom ? this.zoom.min : this.min) % this.grid : 0;
	if (this.offset < 0)
		this.offset += this.grid;
};
JSGadget.VAxis.prototype.val2coord = function(v) {
  return this.chart.opt.gap.t + this.chart.csize.h - 1 -
  		(this.zoom ? (v - this.zoom.min) / (this.zoom.max - this.zoom.min) :
  				(v - this.min) / (this.max - this.min)) *
  		(this.chart.csize.h - 2);
};
JSGadget.VAxis.prototype.coord2val = function(y) {
  return (1 - (y - this.chart.opt.gap.t - 1) / (this.chart.csize.h - 2)) *
  		(this.zoom ? this.zoom.max - this.zoom.min : this.max - this.min) +
  		(this.zoom ? this.zoom.min : this.min);
};
JSGadget.VAxis.prototype.lbltxt = function(v) {
	return v > 100 ? v.toFixed(0) : v.toPrecision(3);
};
