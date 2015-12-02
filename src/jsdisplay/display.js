/**
 * display.js
 */

//Display declaration
JSGadget.Display = function(owner, options, val) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Display.Style.OWNER);
	this.opt = {
		digits: 1,
		color: "black",
		shadow: {
			color: null,
			dx: 4,
			dy: 4
		}
	};
	JSGadget.setopt(this.opt, options);
	this.preproc(val !== undefined ? val : "");
	this.resize();
};
//Display implementation
JSGadget.Display.prototype.resize = function() {
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
JSGadget.Display.prototype.setVal = function(val) {
	this.preproc(val);
	this.draw();
};
JSGadget.Display.prototype.clear = function() {
 	if (this.ctx)
 		this.ctx.clearRect(0, 0, this.size.w, this.size.h);
};
JSGadget.Display.prototype.draw = function() {
  if (this.ctx) {
 		this.clear();
 		this.ctx.save();
 		this.ctx.scale(this.size.w / 100 / this.opt.digits, this.size.h / 100);
 		if (this.opt.shadow.color) {
 			this.ctx.save();
	 	  this.ctx.translate(this.opt.shadow.dx, this.opt.shadow.dy);
	  	this.ctx.fillStyle = this.opt.shadow.color;
	  	this.draw_();
 	  	this.ctx.restore();
 		}
  	this.ctx.fillStyle = this.opt.color;
  	this.draw_();
  	this.ctx.restore();
  }
};
JSGadget.Display.prototype.draw_ = function() {
	for (var i = 0; i < this.opt.digits; ++i) {
		if (i)
	 	  this.ctx.translate(100, 0);
		this.drawD(this.data[i], this.point === i);
	}
};

