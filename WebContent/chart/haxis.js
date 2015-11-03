/**
 * haxis.js
 */

//HAxis declaration
JSGadget.HAxis = function(chart, min, max) {
	JSGadget.HAxis.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.HAxis, JSGadget.Axis);
//HAxis implementation
JSGadget.HAxis.prototype.calcGrid = function() {
	var t = this.zoom ? this.zoom.max - this.zoom.min : this.max - this.min;
	if (t < 10)	this.grid = this.sGrid = 0;
	else if (t < 20) {this.grid = 4; this.sGrid = 1;}
	else if (t < 30) {this.grid = 5; this.sGrid = 1;}
	else if (t < 60) {this.grid = 10;	this.sGrid = 2;}
	else if (t < 120) {this.grid = 20;	this.sGrid = 5;}
	else if (t < 240) {this.grid = 30;	this.sGrid = 5;}
	else if (t < 480) {this.grid = 60;	this.sGrid = 15;}
	else if (t < 960) {this.grid = 120; this.sGrid = 30;}
	else if (t < 1920) {this.grid = 300; this.sGrid = 60;}
	else if (t < 3600) {this.grid = 600;	this.sGrid = 120;}
	else if (t < 7200) {this.grid = 1200; this.sGrid = 300;}
	else if (t < 14400) {this.grid = 1800;	this.sGrid = 300;}
	else if (t < 28800) {this.grid = 3600;	this.sGrid = 900;}
	else if (t < 57600) {this.grid = 7200; this.sGrid = 1800;}
	else if (t < 86400) {this.grid = 14400; this.sGrid = 3600;}
	else if (t < 172800) {this.grid = 28800; this.sGrid = 7200;}
	else if (t < 345600) {this.grid = 43200;	this.sGrid = 10800;}
	else if (t < 691200) {this.grid = 86400; this.sGrid = 21600;}
	else if (t < 1382400) {this.grid = 172800; this.sGrid = 43200;}
	else if (t < 2764800) {this.grid = 345600; this.sGrid = 86400;}
	else if (t < 5529600) {this.grid = 691200; this.sGrid = 172800;}
	else if (t < 11059200) {this.grid = 1382400; this.sGrid = 345600;}
	else if (t < 22118400) {this.grid = 2764800; this.sGrid = 691200;}
	else if (t < 44236800) {this.grid = 5529600; this.sGrid = 1382400;}
	else this.grid = this.sGrid = 0;
	this.offset = this.grid > 0 ? (this.zoom ? this.zoom.min : this.min) % this.grid : 0;
};
JSGadget.HAxis.prototype.val2coord = function(v) {
  return this.chart.opt.gap.l + (v - (this.zoom ? this.zoom.min : this.min)) /
  		(this.zoom ? this.zoom.max - this.zoom.min : this.max - this.min) *
  		(this.chart.csize.w - 2) + 1;
};
JSGadget.HAxis.prototype.coord2val = function(x) {
  return (x - this.chart.opt.gap.l - 1) / (this.chart.csize.w - 2) *
  		(this.zoom ? this.zoom.max - this.zoom.min : this.max - this.min) +
  		(this.zoom ? this.zoom.min : this.min);
};
JSGadget.HAxis.prototype.lbltxt = function(v) {
  var d1 = new Date(v * 1000);
  var d2 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(),
	  	d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
	return [JSGadget.Utils.date2str(d2),	JSGadget.Utils.time2str(d2)];
};
