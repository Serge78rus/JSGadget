/**
 * mouse.js
 */

//Mouse declaration
JSGadget.Mouse = function(chart) {
	this.chart = chart;
  var self = this;
  this.chart.owner.mousedown(function(e) {self.onDown(e);});
};
//Mouse implementation
JSGadget.Mouse.prototype.onDown = function(e) {
	if (this.chart.ctx) {
		var o = this.chart.owner.offset(), x = e.pageX - o.left, y = e.pageY - o.top;
		if (x >= this.chart.cpos.left && x <= this.chart.cpos.left + this.chart.size.w &&
				y >= this.chart.cpos.top && y <= this.chart.cpos.top + this.chart.size.h) {
			if (e.which == 1) {
				this.chart.owner.css({cursor: JSGadget.Chart.Style.CURSORS.ZOOM});
				this.zoomdiv = this.chart.owner.append("<div/>").children().last().
						css(JSGadget.Chart.Style.ZOOM);
				if (this.chart.opt.digital)
					this.zoomdiv.css({left: x + "px", top: this.chart.opt.gap.t + "px",
							height: this.chart.csize.h + "px"});
				else
					this.zoomdiv.css({left: x + "px", top: y + "px"});
				this.zoom = {x: e.pageX, y: e.pageY};
				this.bind();
			} else if (e.which == 3) {
				this.chart.owner.css({cursor: JSGadget.Chart.Style.CURSORS.DRAG});
				this.drag = {x: e.pageX, y: e.pageY};
				this.bind();
			}
		}
	}
};
JSGadget.Mouse.prototype.onUp = function(e) {
	if (this.chart.ctx) {
		this.chart.owner.css({cursor: JSGadget.Chart.Style.CURSORS.DEFAULT});
		if (this.zoom) {
			if (e.pageX - this.zoom.x > this.chart.opt.mouseSens &&
					(e.pageY - this.zoom.y > this.chart.opt.mouseSens || this.chart.opt.digital)) {
				var x1 = this.zoomdiv.position().left - this.chart.cpos.left,
				    x2 = x1 + this.zoomdiv.width();
				this.chart.bAxis.zoom = {min: this.chart.bAxis.coord2val(x1),
						max: this.chart.bAxis.coord2val(x2)};
				if (!this.chart.opt.digital) {
					var y2 = this.zoomdiv.position().top - this.chart.cpos.top,
							y1 = y2 + this.zoomdiv.height();
					this.chart.lAxis.zoom = {min: this.chart.lAxis.coord2val(y1),
							max: this.chart.lAxis.coord2val(y2)};
				}
			} else if (e.pageX - this.zoom.x < -this.chart.opt.mouseSens ||
					e.pageY - this.zoom.y < -this.chart.opt.mouseSens)
				this.chart.bAxis.zoom = this.chart.lAxis.zoom = null;
			this.zoomdiv.remove();
			this.zoom = null;
			this.unbind();
			this.chart.bAxis.calcGrid();
			this.chart.lAxis.calcGrid();
			this.chart.draw();
		} else if (this.drag) {
			this.drag = null;
			this.unbind();
		}
	}
};
JSGadget.Mouse.prototype.onLeave = function(e) {
	if (this.chart.ctx) {
		this.chart.owner.css({cursor: JSGadget.Chart.Style.CURSORS.DEFAULT});
		if (this.zoom) {
			this.zoomdiv.remove();
			this.zoom = null;
			this.unbind();
		} else if (this.drag) {
			this.drag = null;
			this.unbind();
		}
	}
};
JSGadget.Mouse.prototype.onMove = function(e) {
	if (this.chart.ctx) {
		if (this.zoom) {
			var o = this.chart.owner.offset();
			if (!this.chart.opt.digital) {
				if (e.pageX > this.zoom.x && e.pageY > this.zoom.y)
					this.zoomdiv.width(e.pageX - this.zoom.x).height(e.pageY - this.zoom.y).
							css({left: this.zoom.x - o.left + "px", top: this.zoom.y - o.top + "px"});
				else if (e.pageX > this.zoom.x && e.pageY < this.zoom.y)
					this.zoomdiv.width(e.pageX - this.zoom.x).height(this.zoom.y - e.pageY).
							css({left: this.zoom.x - o.left + "px", top: e.pageY - o.top + "px"});
				else if (e.pageX < this.zoom.x && e.pageY > this.zoom.y)
					this.zoomdiv.width(this.zoom.x - e.pageX).height(e.pageY - this.zoom.y).
							css({left: e.pageX - o.left + "px", top: this.zoom.y - o.top + "px"});
				else
					this.zoomdiv.width(this.zoom.x - e.pageX).height(this.zoom.y - e.pageY).
							css({left: e.pageX - o.left + "px", top: e.pageY - o.top + "px"});
			} else {
				if (e.pageX > this.zoom.x)
					this.zoomdiv.width(e.pageX - this.zoom.x).css({left: this.zoom.x - o.left + "px"});
				else
					this.zoomdiv.width(this.zoom.x - e.pageX).css({left: e.pageX - o.left + "px"});
			}
		} else if (this.drag) {
			var dx = this.chart.bAxis.coord2val(this.drag.x) - this.chart.bAxis.coord2val(e.pageX),
					dy = this.chart.opt.digital ? 0 :
							this.chart.lAxis.coord2val(this.drag.y) - this.chart.lAxis.coord2val(e.pageY);
			this.drag.x = e.pageX;
			this.drag.y = e.pageY;
			if (dx) {
				if (!this.chart.bAxis.zoom)
					this.chart.bAxis.zoom = {min: this.chart.bAxis.min, max: this.chart.bAxis.max};
				this.chart.bAxis.zoom.min += dx;
				this.chart.bAxis.zoom.max += dx;
				this.chart.bAxis.calcGrid();
			}
			if (dy) {
				if (!this.chart.lAxis.zoom)
					this.chart.lAxis.zoom = {min: this.chart.lAxis.min, max: this.chart.lAxis.max};
				this.chart.lAxis.zoom.min += dy;
				this.chart.lAxis.zoom.max += dy;
				this.chart.lAxis.calcGrid();
			}
			if (dx || dy)
				this.chart.draw();
		}
	}
};
JSGadget.Mouse.prototype.bind = function() {
	var self = this;
	this.chart.owner.bind("mouseup", function(e) {self.onUp(e);}).
			bind("mousemove", function(e) {self.onMove(e);}).
			bind("mouseleave", function(e) {self.onLeave(e);});
};
JSGadget.Mouse.prototype.unbind = function() {
	this.chart.owner.unbind("mousemove").unbind("mouseup").unbind("mouseleave");
};
