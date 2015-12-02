/**
 * scale.js
 */

JSGadget.Meter.prototype.drawScale = function() {
  var min = -this.opt.angle / 2, max = this.opt.angle / 2;
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.arc(0, 0, 50 - this.opt.gap, (min - 90) / 180 * Math.PI,
			(max - 90) / 180 * Math.PI);
	this.ctx.strokeStyle = this.opt.scale.c;
	this.ctx.lineWidth = this.opt.scale.w;
	this.ctx.stroke();
	this.ctx.restore();

	this.ctx.save();
	if (this.opt.scale.sm.s) {
		this.ctx.beginPath();
		var da = this.opt.scale.sm.s / (this.opt.max - this.opt.min) *
				this.opt.angle / 180 * Math.PI;
		this.ctx.rotate(min / 180 * Math.PI);
		for (var v = this.opt.min; v <= this.opt.max; v += this.opt.scale.sm.s) {
			this.ctx.moveTo(0, -50 + this.opt.gap);
			this.ctx.lineTo(0, -50 + this.opt.gap - this.opt.scale.sm.l);
			this.ctx.rotate(da);
		}
		this.ctx.strokeStyle = this.opt.scale.sm.c;
		this.ctx.lineWidth = this.opt.scale.sm.w;
		this.ctx.stroke();
	}
	this.ctx.restore();

	this.ctx.save();
	if (this.opt.scale.lm.s) {
		this.ctx.textBaseline = "bottom";
		this.ctx.textAlign = "center";
		this.ctx.font = "bold " + this.opt.scale.lm.f + "px " + this.opt.font.family;
		this.ctx.fillStyle = this.opt.scale.lm.fc;
		this.ctx.beginPath();
		var da = this.opt.scale.lm.s / (this.opt.max - this.opt.min) *
				this.opt.angle / 180 * Math.PI;
		this.ctx.rotate(min / 180 * Math.PI);
		for (var v = this.opt.min; v <= this.opt.max;	v += this.opt.scale.lm.s) {
			this.ctx.moveTo(0, -50 + this.opt.gap);
			this.ctx.lineTo(0, -50 + this.opt.gap - this.opt.scale.lm.l);
			this.ctx.fillText(+v.toFixed(3), 0, -50 + this.opt.gap - this.opt.scale.lm.l);
			this.ctx.rotate(da);
		}
		this.ctx.strokeStyle = this.opt.scale.lm.c;
		this.ctx.lineWidth = this.opt.scale.lm.w;
		this.ctx.stroke();
	}
	this.ctx.restore();
};
