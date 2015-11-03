/**
 * baxis.js
 */

//BAxis declaration
JSGadget.BAxis = function(chart, min, max) {
	JSGadget.BAxis.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.BAxis, JSGadget.HAxis);
//BAxis implementation
JSGadget.BAxis.prototype.draw = function() {
	this.chart.ctx.save();
	var y1 = this.chart.opt.gap.t + 1,
			y2 = this.chart.opt.gap.t + this.chart.csize.h - 1;
	if (this.grid != 0) {
		var min = this.zoom ? this.zoom.min : this.min,
				max = this.zoom ? this.zoom.max : this.max;
		this.chart.ctx.lineWidth = 1;
		//sGrid
		this.chart.ctx.strokeStyle = "#d0d0d0";
		this.chart.ctx.beginPath();
		for (var v = min - this.offset; v < max; v += this.sGrid)
		  if (v > min) {
		  	var x = this.val2pix(v);
		  	this.chart.ctx.moveTo(x, y1);
		  	this.chart.ctx.lineTo(x, y2);
			}
		this.chart.ctx.stroke();
		//grid&lbl
		this.chart.ctx.strokeStyle = "#b0b0b0";
		this.chart.ctx.fillStyle = "black";
		this.chart.ctx.textBaseline = "top";
		this.chart.ctx.textAlign = "center";
		this.chart.ctx.beginPath();
		var ly1 = this.chart.size.h - this.chart.opt.gap.b + this.chart.opt.font.size * 0.2,
				ly2 = ly1 + this.chart.opt.font.size * 1.2;
		for (var v = min - this.offset; v <= max; v += this.grid)
		  if (v >= min) {
		  	var x = this.val2pix(v);
		    if (v != min) {
		    	this.chart.ctx.moveTo(x, y1);
		    	this.chart.ctx.lineTo(x, y2);
				}
		    var la = this.lbltxt(v);
				this.chart.ctx.fillText(la[0], x, ly1);
				this.chart.ctx.fillText(la[1], x, ly2);
		    /*
				owner.append("<div class='chart_lbl chart_blbl'>" + lbltxt(v) +
						"</div>").children().last().css("left", x + "px").
						attr("unselectable", "on").
						select(function() {return false;});
						*/
			}
		this.chart.ctx.stroke();
	}
	//ray
	this.chart.ctx.lineWidth = 2;
	this.chart.ctx.strokeStyle = "black";
	this.chart.ctx.beginPath();
	this.chart.ctx.moveTo(this.chart.opt.gap.l + 1, y2);
	this.chart.ctx.lineTo(this.chart.opt.gap.l + this.chart.csize.w - 1, y2);
	this.chart.ctx.stroke();
	this.chart.ctx.restore();
};
