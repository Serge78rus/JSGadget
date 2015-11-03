/**
 * preproc.js
 */

JSGadget.Display.prototype.preproc = function(v) {
	this.data = [];
	this.point = undefined;
	for (var i = 0, l = (v += "").length; i < l; ++i)
		if (i && (v.charAt(i) == "." || v.charAt(i) == ","))
			this.point = i - 1;
		else
			this.data.push(v.charAt(i));
	var l = this.data.length - this.opt.digits;
	if (l > 0)
		while (l--)
			delete this.data.pop();
	else if (l < 0) {
		if (this.point !== undefined)
			this.point -= l;
		while (l++)
			this.data.unshift(" ");
	}
};