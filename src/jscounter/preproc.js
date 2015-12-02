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