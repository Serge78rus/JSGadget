/**
 * axis.js
 */

//Axis declaration
JSGadget.Axis = function(chart, min, max) {
	if (chart instanceof JSGadget.Chart)
		this.chart = chart;
	else {
		max = min;
		min = chart;
	}
	this.setMinMax(min !== null && min !== undefined ? min : 0,
			max !== null && max !== undefined ? max : 1);
};
//Axis implementation
JSGadget.Axis.prototype.setMinMax = function(min, max) {
  if (min !== null && min !== undefined)
		this.min = min;
  if (max !== null && max !== undefined)
		this.max = max;
  this.zoom = null;
	this.calcGrid();
};
JSGadget.Axis.prototype.val2pix = function(v) {
	var c = this.val2coord(v), r = Math.round(c);
	return r < c ? r + 0.5 : r - 0.5;
};
JSGadget.Axis.prototype.val2pix2 = function(v) {
	return Math.round(this.val2coord(v));
};
