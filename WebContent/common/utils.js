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
