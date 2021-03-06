/**
 * clock.js
 */

//Clock declaration
JSGadget.Clock = function(owner, options, onDateChange) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Clock.Style.OWNER);
	this.opt = {
			utc: false,
			title: "",
			gap: 5,
			dd: { //dial digits
///////////////////////////for future versions
			},
			dh: { //dial hour
				c: "black",
				w: 2,
				l: 10,
				f: "l" //form: l-line(default), t-triangle, c-cycle, n-none
			},
			dm: { //dial min
				c: "black",
				w: 1,
				l: 4,
				f: "l" //form: l-line(default), t-triangle, c-cycle, n-none
			},
			hh: { //hour hand
				c: "black",
				w: 3,
				l: 25,
				l0: 5,
				f: "l" //form: l-line(default), t-triangle
			},
			mh: { //min hand
				c: "black",
				w: 2,
				l: 30,
				l0: 8,
				cr: 3,
				f: "l" //form: l-line(default), t-triangle
			},
			sh: { //sec hand
				c: "red",
				w: 1,
				l: 35,
				l0: 10,
				cr: 2,
				f: "l" //form: l-line(default), t-triangle
			},
			font: {
				size: 12,
				family: "sans-serif"
			}
	};
	JSGadget.setopt(this.opt, options);
	this.onDateChange = onDateChange;
	this.resize();
};
//Clock implementation
JSGadget.Clock.prototype.resize = function() {
	if (this.timer)
		clearInterval(this.timer);
	this.owner.empty();
	this.size = {w: this.owner.width(), h: this.owner.height()};
	if (this.size.w > 0 && this.size.h > 0) {
		this.canv = this.owner.append("<canvas width='" +	this.size.w + "' height='" + this.size.h +
				"'/>").children().last().css({position: "absolute", left: 0, top: 0});
		this.ctx = this.canv[0].getContext("2d");
		this.ctx.lineCap = "round";
		this.ctx.font = this.opt.font.size + "px " + this.opt.font.family;
		this.draw();
		var self = this;
		this.timer = setInterval(function() {self.draw();}, this.opt.sh ? 1000 : 60000);
	} else
		this.canv = this.ctx = null;
};
JSGadget.Clock.prototype.clear = function() {
 	if (this.ctx)
 		this.ctx.clearRect(0, 0, this.size.w, this.size.h);
};
JSGadget.Clock.prototype.draw = function() {
  var now = new Date(),
  		sec = this.opt.sh ? (this.opt.utc ? now.getUTCSeconds() : now.getSeconds()) : 0,
  		min = this.opt.utc ? now.getUTCMinutes() : now.getMinutes(),
  		hr = this.opt.utc ? now.getUTCHours() : now.getHours();
  if (this.ctx) {
 		this.clear();
 		this.ctx.save();
 		if (this.opt.title) {
			this.ctx.textBaseline = "middle";
			this.ctx.textAlign = "center";
 			this.ctx.fillText(this.opt.title, this.size.w / 2, this.size.h * 2 / 3);
 		}
 	  this.ctx.translate(this.size.w / 2, this.size.h / 2);
 	  this.ctx.scale(this.size.w / 100, this.size.h / 100);
 	  this.ctx.rotate(-Math.PI/2);
 		if (this.opt.dd)
 			this.drawDD();
		this.drawDH();
 		if (this.opt.dm)
 			this.drawDM();
 		this.drawHH(hr, min, sec);
 		this.drawMH(min, sec);
 		if (this.opt.sh)
 			this.drawSH(sec);
 		this.ctx.restore();
 	}
	if (this.onDateChange) {
		var d = now.getDate();
		if (d !== this.date) {
			this,date = d;
			this.onDateChange();
		}
	}
};

JSGadget.Clock.prototype.drawDD = function() {
///////////////////////////for future versions
};
JSGadget.Clock.prototype.drawDH = function() {
	if (this.opt.dh.f != "n") {
	  this.ctx.save();
	  this.ctx.beginPath();
	  for(var i = 0; i < 12; ++i) {
	  	if (i)
	  		this.ctx.rotate(Math.PI / 6);
	  	switch (this.opt.dh.f) {
	  		case "c":
	  	  	this.ctx.moveTo(50 - this.opt.gap - this.opt.dh.w / 2, 0);
	  	  	this.ctx.arc(50 - this.opt.gap - this.opt.dh.w / 2, 0, this.opt.dh.w / 2, 0,
	  	  			2 * Math.PI, false);
	  			break;
	  		case "t":
	  	  	this.ctx.moveTo(50 - this.opt.gap, -this.opt.dh.w / 2);
	  	  	this.ctx.lineTo(50 - this.opt.gap, this.opt.dh.w / 2);
	  			this.ctx.lineTo(50 - this.opt.gap - this.opt.dh.l, 0);
	  			this.ctx.closePath();
	  			break;
	  		case "l":
	  		default:
	  	  	this.ctx.moveTo(50 - this.opt.gap, 0);
	  			this.ctx.lineTo(50 - this.opt.gap - this.opt.dh.l, 0);
	  	}
	  }
		switch (this.opt.dh.f) {
			case "c":
			case "t":
			  this.ctx.fillStyle = this.opt.dh.c;
				this.ctx.lineWidth = 0;
			  this.ctx.fill();
			  break;
			case "l":
			default:
			  this.ctx.strokeStyle = this.opt.dh.c;
				this.ctx.lineWidth = this.opt.dh.w;
				this.ctx.stroke();
		}
	  this.ctx.restore();
	}
};
JSGadget.Clock.prototype.drawDM = function() {
	if (this.opt.dm.f != "n") {
	  this.ctx.save();
	  this.ctx.beginPath();
	  for (var i = 0; i < 60; ++i) {
	  	if (i)
	  		this.ctx.rotate(Math.PI / 30);
	  	if (i % 5) {
	    	switch (this.opt.dm.f) {
	    		case "c":
	    	  	this.ctx.moveTo(50 - this.opt.gap - this.opt.dm.w / 2, 0);
	    	  	this.ctx.arc(50 - this.opt.gap - this.opt.dm.w / 2, 0, this.opt.dm.w / 2, 0,
	    	  			2 * Math.PI, false);
	    			break;
	    		case "t":
	    	  	this.ctx.moveTo(50 - this.opt.gap, -this.opt.dm.w / 2);
	    	  	this.ctx.lineTo(50 - this.opt.gap, this.opt.dm.w / 2);
	    			this.ctx.lineTo(50 - this.opt.gap - this.opt.dm.l, 0);
	    			this.ctx.closePath();
	    			break;
	    		case "l":
	    		default:
	    	  	this.ctx.moveTo(50 - this.opt.gap, 0);
	    			this.ctx.lineTo(50 - this.opt.gap - this.opt.dm.l, 0);
	    	}
	  	}
	  }
		switch (this.opt.dm.f) {
			case "c":
			case "t":
			  this.ctx.fillStyle = this.opt.dm.c;
				this.ctx.lineWidth = 0;
			  this.ctx.fill();
			  break;
			case "l":
			default:
			  this.ctx.strokeStyle = this.opt.dm.c;
				this.ctx.lineWidth = this.opt.dm.w;
				this.ctx.stroke();
		}
	  this.ctx.restore();
	}
};
JSGadget.Clock.prototype.drawHH = function(hr, min, sec) {
  this.ctx.save();
  this.ctx.rotate(Math.PI / 6 * hr + Math.PI / 360 * min + Math.PI / 21600 * sec);
  this.ctx.beginPath();
	switch (this.opt.hh.f) {
		case "t":
			this.ctx.moveTo(-this.opt.hh.l0, -this.opt.hh.w / 2);
			this.ctx.lineTo(-this.opt.hh.l0, this.opt.hh.w / 2);
			this.ctx.lineTo(this.opt.hh.l, 0);
			this.ctx.closePath();
		  this.ctx.fillStyle = this.opt.hh.c;
			this.ctx.lineWidth = 0;
		  this.ctx.fill();
			break;
		case "l":
		default:
			this.ctx.moveTo(-this.opt.hh.l0, 0);
			this.ctx.lineTo(this.opt.hh.l, 0);
			this.ctx.strokeStyle = this.opt.hh.c;
			this.ctx.lineWidth = this.opt.hh.w;
			this.ctx.stroke();
	}
  this.ctx.restore();
};
JSGadget.Clock.prototype.drawMH = function(min, sec) {
  this.ctx.save();
  this.ctx.rotate(Math.PI / 30 * min + Math.PI / 1800 * sec);
  this.ctx.beginPath();
	switch (this.opt.mh.f) {
		case "t":
			this.ctx.moveTo(-this.opt.mh.l0, -this.opt.mh.w / 2);
			this.ctx.lineTo(-this.opt.mh.l0, this.opt.mh.w / 2);
			this.ctx.lineTo(this.opt.mh.l, 0);
			this.ctx.closePath();
		  this.ctx.fillStyle = this.opt.mh.c;
			this.ctx.lineWidth = 0;
		  this.ctx.fill();
			break;
		case "l":
		default:
		  this.ctx.moveTo(-this.opt.mh.l0, 0);
			this.ctx.lineTo(this.opt.mh.l, 0);
			this.ctx.strokeStyle = this.opt.mh.c;
			this.ctx.lineWidth = this.opt.mh.w;
			this.ctx.stroke();
	}
  if (this.opt.mh.cr) {
  	this.ctx.beginPath();
  	this.ctx.arc(0, 0, this.opt.mh.cr, 0, 2 * Math.PI, false);
  	this.ctx.fillStyle = this.opt.mh.c;
		this.ctx.lineWidth = 0;
  	this.ctx.fill();
  }
  this.ctx.restore();
};
JSGadget.Clock.prototype.drawSH = function(sec) {
  this.ctx.save();
  this.ctx.rotate(Math.PI / 30 * sec);
  this.ctx.beginPath();
	switch (this.opt.sh.f) {
		case "t":
			this.ctx.moveTo(-this.opt.sh.l0, -this.opt.sh.w / 2);
			this.ctx.lineTo(-this.opt.sh.l0, this.opt.sh.w / 2);
			this.ctx.lineTo(this.opt.sh.l, 0);
			this.ctx.closePath();
		  this.ctx.fillStyle = this.opt.sh.c;
			this.ctx.lineWidth = 0;
		  this.ctx.fill();
			break;
		case "l":
		default:
			this.ctx.moveTo(-this.opt.sh.l0, 0);
			this.ctx.lineTo(this.opt.sh.l, 0);
			this.ctx.strokeStyle = this.opt.sh.c;
			this.ctx.lineWidth = this.opt.sh.w;
			this.ctx.stroke();
	}
  if (this.opt.sh.cr) {
  	this.ctx.beginPath();
  	this.ctx.arc(0, 0, this.opt.sh.cr, 0, 2 * Math.PI, false);
  	this.ctx.fillStyle = this.opt.sh.c;
		this.ctx.lineWidth = 0;
  	this.ctx.fill();
  }
  this.ctx.restore();
};
