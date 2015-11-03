/**
 * atrend.js
 */

//ATrend declaration
JSGadget.ATrend = function(chart, options) {
	JSGadget.ATrend.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.ATrend, JSGadget.Trend);
//ATrend implementation
JSGadget.ATrend.prototype.getMinMax = function(mm) {
	if (!mm)
		mm = {minX: null, maxX: null, minY: null, maxY: null};
  if (this.data) {
		for (var i = 0, l = this.data.length; i < l; ++i) {
		  if (mm.minX === null || this.data[i][this.opt.xFld] !== null &&
		  		this.data[i][this.opt.xFld] < mm.minX)
	  		mm.minX = this.data[i][this.opt.xFld];
		  if (mm.maxX === null || this.data[i][this.opt.xFld] !== null &&
		  		this.data[i][this.opt.xFld] > mm.maxX)
		  	mm.maxX = this.data[i][this.opt.xFld];
	  	if (mm.minY === null || this.data[i][this.opt.yFld] !== null &&
	  			this.data[i][this.opt.yFld] < mm.minY)
	  		mm.minY = this.data[i][this.opt.yFld];
		  if (mm.maxY === null || this.data[i][this.opt.yFld] !== null &&
		  		this.data[i][this.opt.yFld] > mm.maxY)
		  	mm.maxY = this.data[i][this.opt.yFld];
		}
	}
	return mm;
};
JSGadget.ATrend.prototype.draw = function() {
  if (this.data) {
  	var l = this.data.length;
  	if (l) {
    	this.chart.ctx.save();
    	this.chart.ctx.strokeStyle = this.opt.color;
    	this.chart.ctx.lineWidth = this.opt.width;
    	this.chart.ctx.lineJoin = "round";
    	this.chart.ctx.beginPath();
  		for (var i = 0, bf = true; i < l; ++i)
   			if (this.data[i][this.opt.yFld] !== null) {
  				if (bf) {
  					this.chart.ctx.moveTo(this.chart.bAxis.val2coord(this.data[i][this.opt.xFld]),
  							this.chart.lAxis.val2coord(this.data[i][this.opt.yFld]));
  					bf = false;
  				}
  				this.chart.ctx.lineTo(this.chart.bAxis.val2coord(this.data[i][this.opt.xFld]),
  						this.chart.lAxis.val2coord(this.data[i][this.opt.yFld]));
  			} else
  				bf = true;
  		this.chart.ctx.stroke();
  		this.chart.ctx.restore();
  	}
  }
};
