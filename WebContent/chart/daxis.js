/**
 * daxis.js
 */

//DAxis declaration
JSGadget.DAxis = function(chart, min, max) {
	JSGadget.DAxis.superclass.constructor.apply(this, arguments);
};
JSGadget.Utils.extend(JSGadget.DAxis, JSGadget.Axis);
//DAxis implementation
JSGadget.DAxis.prototype.calcGrid = function() {
	/////////////////
};
JSGadget.DAxis.prototype.val2coord = function(v, idx) {
	var n = this.chart.trends.length;
	if (!n)
		n = 1;
	if (n > 1 || this.chart.trends[0].opt.title) {
		var d = this.chart.csize.h / (n + 0.2);
		return this.chart.opt.gap.t + d * (idx + 0.3) + d * (v ? 0.2 : 0.7);
	} else
		return this.chart.opt.gap.t + this.chart.csize.h * (v ? 0.2 : 0.8);
};
JSGadget.DAxis.prototype.draw = function() {
	if (this.chart.ctx) {
		this.chart.ctx.save();
		var n = this.chart.trends.length,
				x1 = this.chart.opt.gap.l + 1,
				x2 = this.chart.opt.gap.l + this.chart.csize.w - 1;
		if (n) {
			//grid&lbl
			this.chart.ctx.lineWidth = 1;
			this.chart.ctx.strokeStyle = "#b0b0b0";
			this.chart.ctx.textBaseline = "middle";
			this.chart.ctx.beginPath();
			var lx = this.chart.opt.gap.l - this.chart.opt.font.size * 0.2,
					d = this.chart.csize.h / (n + 0.2),
					x0 = (x1 + x2) / 2;
			for (var i = 0; i < n; ++i) {
				var y;
				if (n > 1 || this.chart.trends[0].opt.title) {
					y = JSGadget.Utils.round2pix(this.chart.opt.gap.t + d * (i + 0.3));
					if (this.chart.trends[i] && this.chart.trends[i].opt.title) {
						this.chart.ctx.fillStyle = this.chart.trends[i].opt.titlecolor ||
								this.chart.trends[i].opt.color;
						this.chart.ctx.textAlign = "center";
						this.chart.ctx.fillText(this.chart.trends[i].opt.title, x0, y);
					}
					y = JSGadget.Utils.round2pix(y + d * 0.2);
				} else
					y = JSGadget.Utils.round2pix(this.chart.opt.gap.t + this.chart.csize.h * 0.2);
		  	this.chart.ctx.moveTo(x1, y);
		  	this.chart.ctx.lineTo(x2, y);
		  	if (this.chart.trends[i]) {
					this.chart.ctx.fillStyle = "black";
					this.chart.ctx.textAlign = "right";
		  		this.chart.ctx.fillText(this.chart.trends[i].opt.text1, lx, y);
		  	}
		  	y = JSGadget.Utils.round2pix(y + (n > 1 || this.chart.trends[0].opt.title ? d * 0.5 :
		  			this.chart.csize.h * 0.6));
		  	this.chart.ctx.moveTo(x1, y);
		  	this.chart.ctx.lineTo(x2, y);
		  	if (this.chart.trends[i])
		  		this.chart.ctx.fillText(this.chart.trends[i].opt.text0, lx, y);
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
		this.chart.ctx.restore();
	}
};