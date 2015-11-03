/**
 * Project: JSGadget
 * Gadget:  JSCounter
 */

/**
 *
 * Copyright (c) 2014 Serge L. Ryadkow http://jsgadget.ru
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 *
 * Versions history
 *
 * 1.1.1
 * First release
 *
 */

var JSGadget = JSGadget || {};

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
/**
 * style.js
 */

JSGadget.Counter.Style = {};

JSGadget.Counter.Style.OWNER = {
		overflow: "hidden"
	};
JSGadget.Counter.Style.DD = {
		overflow: "hidden",
		position: "absolute",
		height: "100%",
		marginTop: "-4%",
		textAlign: "center",
		fontWeight: "bold"
	};
JSGadget.Counter.Style.L = {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		background: "linear-gradient(rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.7) 40%, rgba(0,0,0,0.3) 100%)"
	};
JSGadget.Counter.Style.S = {
		position: "absolute",
		top: 0,
		height: "100%",
		backgroundColor: "black"
	};
/**
 * preproc.js
 */

JSGadget.Counter.prototype.preproc = function(v) {
	this.data = [];
	for (var i = 0, l = (v += "").length; i < l; ++i)
		this.data.push(v.charAt(i));
	var l = this.data.length - this.opt.digits;
	if (l > 0)
		while (l--)
			delete this.data.pop();
	else if (l < 0)
		while (l++)
			this.data.unshift(0);
};
/**
 * setopt.js
 */

JSGadget.setopt = function(def, opt) {
	if (opt)
		for (var key in opt)
			if (typeof(opt[key]) == "object")
				JSGadget.setopt(def[key], opt[key]);
			else
				def[key] = opt[key];
};
