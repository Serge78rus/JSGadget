/**
 * hand.js
 */

JSGadget.Meter.prototype.drawHand = function() {
  this.ctx.save();
  var a = -this.opt.angle / 2 + (this.val - this.opt.min) /
  		(this.opt.max - this.opt.min) *	this.opt.angle;
  this.ctx.rotate((a - 90) / 180 * Math.PI);
  this.ctx.beginPath();
	switch (this.opt.hand.f) {
		case "t":
			this.ctx.moveTo(-this.opt.hand.l0, -this.opt.hand.w / 2);
			this.ctx.lineTo(-this.opt.hand.l0, this.opt.hand.w / 2);
			this.ctx.lineTo(this.opt.hand.l, 0);
			this.ctx.closePath();
		  this.ctx.fillStyle = this.opt.hand.c;
			this.ctx.lineWidth = 0;
		  this.ctx.fill();
			break;
		case "l":
		default:
			this.ctx.moveTo(-this.opt.hand.l0, 0);
			this.ctx.lineTo(this.opt.hand.l, 0);
			this.ctx.strokeStyle = this.opt.hand.c;
			this.ctx.lineWidth = this.opt.hand.w;
			this.ctx.stroke();
	}
  if (this.opt.hand.cr) {
  	this.ctx.beginPath();
  	this.ctx.arc(0, 0, this.opt.hand.cr, 0, 2 * Math.PI, false);
  	this.ctx.fillStyle = this.opt.hand.c;
		this.ctx.lineWidth = 0;
  	this.ctx.fill();
  }
  this.ctx.restore();
};
