/**
 * counter.js
 */

//Counter declaration
JSGadget.Counter = function(owner, options, val) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Counter.Style.OWNER);
	this.opt = {
		digits: 1,
		color: "black",
		aniMs: 500
	};
	JSGadget.setopt(this.opt, options);
	this.dd = [];
	this.ddt = [];
	this.ddb = [];
	this.dx = 100 / this.opt.digits;
	this.h = this.owner.height();
	for (var i = 0; i < this.opt.digits; ++i) {
		this.dd.push(this._add(i).css("top", 0));
		this.ddt.push(this._add(i).css("top", "-100%"));
		this.ddb.push(this._add(i).css("top", "100%"));
	}
	this.owner.append("<div></div>").
			children().last().
			css(JSGadget.Counter.Style.L);
	for (var i = 0, dx = 0.05 * this.dx, w = this.dx * 0.1 + "%"; i <= this.opt.digits; ++i)
		this.owner.append("<div></div>").
				children().last().
				css(JSGadget.Counter.Style.S).
				css({left: i * this.dx - dx + "%", width: w});
	this.preproc(val !== undefined ? val : 0);
	this.draw();
};
//Counter implementation
JSGadget.Counter.prototype.draw = function() {
	for (var i = 0; i < this.opt.digits; ++i)
		this.dd[i].text(this.data[i]);
};
JSGadget.Counter.prototype.setVal = function(val) {
	this.preproc(val);
	this.draw();
};
JSGadget.Counter.prototype._add = function(i) {
	return this.owner.append("<div></div>").
			children().last().
			css(JSGadget.Counter.Style.DD).
			css("color", this.opt.color).
			css("width", this.dx + "%").
			css("left", i * this.dx + "%").
			css("font-size", this.h + "px").
			css("transition", "top " + this.opt.aniMs + "ms").
			css("-o-transition", "top " + this.opt.aniMs + "ms").
			css("-moz-transition", "top " + this.opt.aniMs + "ms").
			css("-webkit-transition", "top " + this.opt.aniMs + "ms");
};
JSGadget.Counter.prototype.inc = function() {
	for (var i = this.opt.digits - 1; i >= 0; --i)
		if (!this._inc(i))
			break;
};
JSGadget.Counter.prototype.dec = function() {
	for (var i = this.opt.digits - 1; i >= 0; --i)
		if (!this._dec(i))
			break;
};
JSGadget.Counter.prototype._inc = function(i) {
	var e = this.ddt[i].text("").css("top", "100%"), v = +this.dd[i].text();
	this.ddt[i] = this.dd[i].css("top", "-100%");
	this.dd[i] = this.ddb[i].text(++v <= 9 ? v : 0).css("top", 0);
	this.ddb[i] = e;
	return v > 9;
};
JSGadget.Counter.prototype._dec = function(i) {
	var e = this.ddb[i].text("").css("top", "-100%"), v = +this.dd[i].text();
	this.ddb[i] = this.dd[i].css("top", "100%");
	this.dd[i] = this.ddt[i].text(--v >= 0 ? v : 9).css("top", 0);
	this.ddt[i] = e;
	return v < 0;
};
