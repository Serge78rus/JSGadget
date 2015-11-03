/**
 * laxis.js
 */

//LAxis declaration
JSGadget.LAxis = function(chart, min, max) {
	JSGadget.LAxis.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.LAxis, JSGadget.VAxis);
//LAxis implementation
JSGadget.LAxis.prototype.draw = function() {
	if (this.chart.ctx) {
		this.chart.ctx.save();
		var x1 = this.chart.opt.gap.l + 1,
				x2 = this.chart.opt.gap.l + this.chart.csize.w - 1,
				min = this.zoom ? this.zoom.min : this.min,
				max = this.zoom ? this.zoom.max : this.max;
		if (this.grid != 0) {
			this.chart.ctx.lineWidth = 1;
			//sGrid
			this.chart.ctx.strokeStyle = "#d0d0d0";
			this.chart.ctx.beginPath();
			for (var v = min - this.offset; v < max; v += this.sGrid)
			  if (v > min) {
		  		var y = this.val2pix(v);
			  	this.chart.ctx.moveTo(x1, y);
			  	this.chart.ctx.lineTo(x2, y);
				}
			this.chart.ctx.stroke();
			//grid&lbl
			this.chart.ctx.strokeStyle = "#b0b0b0";
			this.chart.ctx.fillStyle = "black";
			this.chart.ctx.textBaseline = "middle";
			this.chart.ctx.textAlign = "right";
			this.chart.ctx.beginPath();
			var lx = this.chart.opt.gap.l - this.chart.opt.font.size * 0.2;
			for (var v = min - this.offset; v <= max; v += this.grid)
			  if (v >= min) {
		  		var y = this.val2pix(v);
				  if (v != min) {
				  	this.chart.ctx.moveTo(x1, y);
				  	this.chart.ctx.lineTo(x2, y);
					}
					this.chart.ctx.fillText(this.lbltxt(v), lx, y);
				}
			this.chart.ctx.stroke();
		}
		//ray
		this.chart.ctx.lineWidth = 2;
		this.chart.ctx.strokeStyle = "black";
		this.chart.ctx.beginPath();
  	this.chart.ctx.moveTo(x1, this.chart.opt.gap.t + this.chart.csize.h - 1);
  	this.chart.ctx.lineTo(x1, this.chart.opt.gap.t + 1);
		this.chart.ctx.stroke();
		if (this.lohi) {
			this.chart.ctx.lineWidth = 2;
			this.chart.ctx.strokeStyle = "yellow";
			if (this.inRange(this.lohi.lo, min, max))
				this.drawline(this.lohi.lo, x1, x2 - 2);
			if (this.inRange(this.lohi.hi, min, max))
				this.drawline(this.lohi.hi, x1, x2 - 2);
			this.chart.ctx.strokeStyle = "red";
			if (this.inRange(this.lohi.lolo, min, max))
				this.drawline(this.lohi.lolo, x1, x2 - 2);
			if (this.inRange(this.lohi.hihi, min, max))
				this.drawline(this.lohi.hihi, x1, x2 - 2);
		}
		this.chart.ctx.restore();
	}
};
JSGadget.LAxis.prototype.drawline = function(y, x1, x2) {
	y = this.val2pix2(y);
	this.chart.ctx.beginPath();
	for (var x = x1; x < x2; x += 10) {
		this.chart.ctx.moveTo(x, y);
		this.chart.ctx.lineTo(x + 1, y);
	}
	this.chart.ctx.stroke();
};
JSGadget.LAxis.prototype.inRange = function(v, min, max) {
	return v !== null && v !== undefined && v >= min && v <= max;
};
