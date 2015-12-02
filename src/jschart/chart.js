/**
 * chart.js
 */

//Chart declaration
JSGadget.Chart = function(owner, options) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Chart.Style.OWNER).attr("ondragstart", "return false;").
			attr("oncontextmenu", "return false;").disableTextSelect().
			bind("contextmenu", function(e) {return false;});
	this.opt = {
			gap: {
				t: 8,
				r: 5,
				b: 32,
				l: 40
			},
			interactive: true,
			font: {
				size: 12,
				family: "sans-serif"
			},
			mouseSens: 10,
			digital: false,
			background: JSGadget.Chart.BACKGROUND
	};
	if (options)
		for (var key in options)
			switch (key) {
				case "bAxis":
				case "lAxis":
				case "trends":
					this[key] = options[key];
					break;
				default:
					if (typeof(options[key]) == "object")
						JSGadget.setopt(this.opt[key], options[key]);
					else
						this.opt[key] = options[key];
			}
	this.owner.css("background-color", this.opt.background);
	if (this.opt.interactive)
		this.mouse = new JSGadget.Mouse(this);
	if (!this.bAxis)
		this.bAxis = new JSGadget.BAxis(this);
	else
		this.bAxis.chart = this;
	if (!this.lAxis)
		this.lAxis = this.opt.digital ? new JSGadget.DAxis(this) : new JSGadget.LAxis(this);
	else
		this.lAxis.chart = this;
	if (!this.trends)
		this.trends = [];
	else
		for (var i = 0, l = this.trends.length; i < l; ++i)
			this.trends[i].chart = this;
	this.resize();
};
//Chart implementation
JSGadget.Chart.prototype.resize = function() {
	this.owner.empty();
	this.size = {w: this.owner.width(), h: this.owner.height()};
	this.csize = {
			w: this.size.w - this.opt.gap.l - this.opt.gap.r,
			h: this.size.h - this.opt.gap.t - this.opt.gap.b
	};
	if (this.size.w > 0 && this.size.h > 0) {
		this.canv = this.owner.append("<canvas width='" +	this.size.w + "' height='" + this.size.h +
				"'/>").children().last().css({position: "absolute", left: 0, top: 0});
		this.cpos = this.canv.position();
		this.ctx = this.canv[0].getContext("2d");
		this.ctx.lineCap = "round";
		this.ctx.font = this.opt.font.size + "px " + this.opt.font.family;
		this.draw();
	} else
		this.canv = this.ctx = null;
};
JSGadget.Chart.prototype.clear = function() {
 	if (this.ctx)
 		this.ctx.clearRect(0, 0, this.size.w, this.size.h);
};
JSGadget.Chart.prototype.draw = function() {
 	if (this.ctx) {
 		this.clear();
 		if (this.bAxis.zoom || this.lAxis.zoom)
 			this.drawZoom();
 		this.bAxis.draw();
 		this.lAxis.draw();
 		this.ctx.save();
 		this.ctx.beginPath();
 		this.ctx.moveTo(this.opt.gap.l, this.opt.gap.t);
 		this.ctx.lineTo(this.opt.gap.l + this.csize.w, this.opt.gap.t);
 		this.ctx.lineTo(this.opt.gap.l + this.csize.w, this.opt.gap.t + this.csize.h);
 		this.ctx.lineTo(this.opt.gap.l, this.opt.gap.t + this.csize.h);
 		this.ctx.closePath();
 		this.ctx.clip();
 		for (var i = 0, l = this.trends.length; i < l; ++i)
 			if (this.trends[i]) {
 				if (!this.trends[i].opt.color)
 					this.trends[i].opt.color = JSGadget.Chart.COLORS[i % JSGadget.Chart.COLORS.length];
 				this.trends[i].draw(i);
 			}
 		this.ctx.restore();
 	}
};
JSGadget.Chart.prototype.drawZoom = function() {
	if (this.ctx) {
		this.ctx.save();
		var g = this.ctx.createLinearGradient(this.csize.w / 2 - this.csize.h / 6 - this.csize.h / 30,
				this.csize.h / 3 + this.csize.h / 30,
				this.csize.w / 2 - this.csize.h / 6 + this.csize.h / 30,
				this.csize.h / 3 - this.csize.h / 30);
		g.addColorStop(0, "silver");
		g.addColorStop(0.5, "white");
		g.addColorStop(1, "silver");
		this.ctx.strokeStyle = g;
		this.ctx.lineWidth = this.csize.h / 10;
		this.ctx.beginPath();
		this.ctx.moveTo(this.opt.gap.l + this.csize.w / 2 - this.csize.h / 6,
				this.opt.gap.t + this.csize.h / 3);
		this.ctx.lineTo(this.opt.gap.l + this.csize.w / 2 + this.csize.h / 3,
				this.opt.gap.t + this.csize.h * 5 / 6);
		this.ctx.stroke();
		this.ctx.strokeStyle = "#d0d0d0";
		g = this.ctx.createRadialGradient(this.csize.w / 2 - this.csize.h / 4, this.csize.h / 5,
				this.csize.h / 40, this.csize.w / 2 - this.csize.h / 6, this.csize.h / 3, this.csize.h / 4);
		g.addColorStop(0, "white");
		g.addColorStop(0.4, "#d0d0d0");
		g.addColorStop(1, "silver");
		this.ctx.fillStyle = g;
		this.ctx.lineWidth = this.csize.h / 15;
		this.ctx.beginPath();
		this.ctx.arc(this.opt.gap.l + this.csize.w / 2 - this.csize.h / 6,
				this.opt.gap.t + this.csize.h / 3, this.csize.h / 4, 0, Math.PI*2, true);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
	}
};
JSGadget.Chart.prototype.loading = function(show) {
	if (this.ctx) {
		if (show) {
			this.loadSts = 0;
			if (!this.timer) {
				var self = this,
						x = this.csize.w / 2 - this.cpos.left,
						y = this.csize.h / 2 - this.cpos.top;
				this.timer = setInterval(function() {self.drawLoading(x, y);}, 100);
			}
		} else {
			if (this.timer)
				clearInterval(this.timer);
			this.timer = null;
			this.draw();
		}
	}
};
JSGadget.Chart.prototype.drawLoading = function(x, y) {
	if (this.ctx) {
		this.ctx.save();
		this.ctx.lineWidth = this.csize.h / 40;
		this.ctx.translate(x, y);
		this.ctx.rotate(this.loadSts * Math.PI / 6);
		for (var i = 0; i < 12; ++i) {
			var c = 220 - i * 5;
			this.ctx.strokeStyle = "rgb(" + c + "," + c + "," + c + ")";
			this.ctx.beginPath();
			this.ctx.rotate(Math.PI / 6);
			this.ctx.moveTo(this.csize.h / 10, 0);
			this.ctx.lineTo(this.csize.h / 5, 0);
			this.ctx.stroke();
		}
		this.ctx.restore();
		if (++this.loadSts >= 12)
			this.loadSts = 0;
	}
};


