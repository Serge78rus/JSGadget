/**
 * trend.js
 */

//Trend declaration
JSGadget.Trend = function(chart, options) {
	if (chart instanceof JSGadget.Chart)
		this.chart = chart;
	else
		options = chart;
	this.opt = {
			color: null,
			xFld: "x", //0 for array
			yFld: "y", //1 for array
			width: 2
	};
	if (options)
		for (var key in options)
			switch (key) {
				case "data":
					this[key] = options[key];
					break;
				default:
					this.opt[key] = options[key];
			}
};

