/**
 * dtrend.js
 */

//DTrend declaration
JSGadget.DTrend = function(chart, options) {
	JSGadget.DTrend.superclass.constructor.apply(this, arguments);
	if (!this.opt.color)
		this.opt.color = "blue";
	if (!this.opt.text0)
		this.opt.text0 = "false";
	if (!this.opt.text1)
		this.opt.text1 = "true";
};
JSGadget.Utils.extend(JSGadget.DTrend, JSGadget.Trend);
//DTrend implementation
JSGadget.DTrend.prototype.getMinMax = function(mm) {
	if (!mm)
		mm = {minX: null, maxX: null, minY: 0, maxY: 0};
  if (this.data) {
		for (var i = 0, l = this.data.length; i < l; ++i) {
		  if (mm.minX === null || this.data[i][this.opt.xFld] !== null &&
		  		this.data[i][this.opt.xFld] < mm.minX)
	  		mm.minX = this.data[i][this.opt.xFld];
		  if (mm.maxX === null || this.data[i][this.opt.xFld] !== null &&
		  		this.data[i][this.opt.xFld] > mm.maxX)
		  	mm.maxX = this.data[i][this.opt.xFld];
		}
	}
	return mm;
};
JSGadget.DTrend.prototype.draw = function(idx) {
  if (this.data) {
  	var l = this.data.length;
  	if (l) {
    	this.chart.ctx.save();
    	this.chart.ctx.strokeStyle = this.opt.color;
    	this.chart.ctx.lineWidth = this.opt.width;
    	this.chart.ctx.lineJoin = "round";
    	this.chart.ctx.beginPath();
  		for (var i = 0, bf = true, v = null; i < l; ++i)
   			if (this.data[i][this.opt.yFld] !== null) {
  				if (bf) {
  					this.chart.ctx.moveTo(this.chart.bAxis.val2coord(this.data[i][this.opt.xFld]),
  							JSGadget.Utils.round2pix(this.chart.lAxis.val2coord(this.data[i][this.opt.yFld], idx),
  									this.opt.width));
  					bf = false;
  				} else if (this.data[i][this.opt.yFld] != v) {
    				this.chart.ctx.lineTo(this.chart.bAxis.val2coord(this.data[i][this.opt.xFld]),
    						JSGadget.Utils.round2pix(this.chart.lAxis.val2coord(v, idx), this.opt.width));
  				}
  				this.chart.ctx.lineTo(this.chart.bAxis.val2coord(this.data[i][this.opt.xFld]),
  						JSGadget.Utils.round2pix(this.chart.lAxis.val2coord(this.data[i][this.opt.yFld], idx),
									this.opt.width));
  				v = this.data[i][this.opt.yFld];
  			} else
  				bf = true;
  		this.chart.ctx.stroke();
  		this.chart.ctx.restore();
  	}
  }
};
