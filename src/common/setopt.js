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