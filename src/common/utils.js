/**
 * utils.js
 */

JSGadget.Utils = {};

JSGadget.Utils.extend = function(child, parent) {
	var F = function() {};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.superclass = parent.prototype;
};
JSGadget.Utils.int22dig = function(v) {
	return v < 10 ? "0" + v : "" + v;
};
JSGadget.Utils.date2str = function(d) {
	return JSGadget.Utils.int22dig(d.getDate()) + "." + JSGadget.Utils.int22dig(d.getMonth() + 1) + "." +
			d.getFullYear();
};
JSGadget.Utils.time2str = function(d) {
	return JSGadget.Utils.int22dig(d.getHours()) + ":" + JSGadget.Utils.int22dig(d.getMinutes()) + ":" +
			JSGadget.Utils.int22dig(d.getSeconds());
};
JSGadget.Utils.round2pix = function(v, w) {
	w = w || 1;
	if (w & 1) {
		var r = Math.round(v);
		return r < v ? r + 0.5 : r - 0.5;
	} else
		return Math.round(v);
};

/*
 * disableTextSelect
 * */
(function($) {
	if (!$.browser) { //remove dependency from jQuery-migrate 
		/*from jQuery-migrate*/
		function uaMatch( ua ) {
			ua = ua.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||	[];
			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		};
		var matched = uaMatch( navigator.userAgent ), browser = {};
		if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}
		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
			browser.webkit = true;
		} else if ( browser.webkit ) {
			browser.safari = true;
		}
		jQuery.browser = browser;
	}
  if ($.browser.mozilla) {
      $.fn.disableTextSelect = function() {
          return this.each(function() {
              $(this).css({
                  'MozUserSelect' : 'none'
              });
          });
      };
      $.fn.enableTextSelect = function() {
          return this.each(function() {
              $(this).css({
                  'MozUserSelect' : ''
              });
          });
      };
  } else if ($.browser.msie) {
      $.fn.disableTextSelect = function() {
          return this.each(function() {
              $(this).bind('selectstart.disableTextSelect', function() {
                  return false;
              });
          });
      };
      $.fn.enableTextSelect = function() {
          return this.each(function() {
              $(this).unbind('selectstart.disableTextSelect');
          });
      };
  } else {
      $.fn.disableTextSelect = function() {
          return this.each(function() {
              $(this).bind('mousedown.disableTextSelect', function() {
                  return false;
              });
          });
      };
      $.fn.enableTextSelect = function() {
          return this.each(function() {
              $(this).unbind('mousedown.disableTextSelect');
          });
      };
  }
})(jQuery);
