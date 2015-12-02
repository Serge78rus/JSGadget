/**
 * meter.js
 */

//Meter declaration
JSGadget.Meter = function(owner, options, val) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Meter.Style.OWNER);
	this.opt = {
			title: "",
			gap: 14,
			angle: 120,
			min: 0,
			max: 100,
			scale: {
				c: "black",
				w: 2,
				lm: { //large mark
					s: 20, //step
					c: "black",
					w: 2,
					l: 3,
					f: 8,
					fc: "black"
				},
				sm: { //small mark
					s: 10, //step
					c: "black",
					w: 1,
					l: 2
				}
			},
			hand: {
				c: "red",
				w: 1,
				l: 33,
				l0: 0,
				cr: 3,
				f: "l" //form: l-line(default), t-triangle
			},
			font: {
				size: 12,
				family: "sans-serif",
				color: "black"
			}
	};
	JSGadget.setopt(this.opt, options);
	val = val !== undefined ? val : 0;
	if (val < this.opt.min)
		val = this.opt.min;
	if (val > this.opt.max)
		val = this.opt.max;
	this.val = val;
	this.resize();
};
//Meter implementation
JSGadget.Meter.prototype.resize = function() {
	this.owner.empty();
	this.size = {w: this.owner.width(), h: this.owner.height()};
	if (this.size.w > 0 && this.size.h > 0) {
		this.canv = this.owner.append("<canvas width='" +	this.size.w + "' height='" + this.size.h +
				"'/>").children().last().css({position: "absolute", left: 0, top: 0});
		this.ctx = this.canv[0].getContext("2d");
		this.ctx.lineCap = "round";
		this.draw();
	} else
		this.canv = this.ctx = null;
};
JSGadget.Meter.prototype.setVal = function(val) {
	if (val < this.opt.min)
		val = this.opt.min;
	if (val > this.opt.max)
		val = this.opt.max;
	this.val = val;
	this.draw();
};
JSGadget.Meter.prototype.clear = function() {
 	if (this.ctx)
 		this.ctx.clearRect(0, 0, this.size.w, this.size.h);
};
JSGadget.Meter.prototype.draw = function() {
  if (this.ctx) {
 		this.clear();
 		this.ctx.save();
 		if (this.opt.title) {
			this.ctx.textBaseline = "middle";
			this.ctx.textAlign = "center";
			this.ctx.font = this.opt.font.size + "px " + this.opt.font.family;
			this.ctx.fillStyle = this.opt.font.color;
			this.ctx.fillText(this.opt.title, this.size.w / 2, this.size.w *
					(this.opt.angle > 180 ? 2 / 3 : 1 / 3));
 		}
 	  this.ctx.translate(this.size.w / 2, this.size.w / 2);
 	  this.ctx.scale(this.size.w / 100, this.size.w / 100);
 	  this.drawScale();
 	  this.drawHand();
 		this.ctx.restore();
  }
};


