/**
 * Project: JSGadget
 * Gadget:  JSCalendar
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

var JSGadget = JSGadget || {};

/**
 * calendar.js
 */

//Calendar declaration
JSGadget.Calendar = function(owner, options, onSelect) {
  this.owner = typeof(owner) == "string" ? $(owner) : owner;
	this.owner.css(JSGadget.Calendar.Style.OWNER);
	this.opt = {
		font: {
			family: "'Times New Roman', 'Times CY', 'Nimbus Roman No9 L', serif",
			size: 16
		}
	};
	if (options)
		for (var key in options)
			if (typeof(options[key]) == "object")
				for (var key1 in options[key])
					this.opt[key][key1] = options[key][key1];
			else
				this.opt[key] = options[key];
	this.onSelect = onSelect;
	//css
	this.resize();
	this.newDate();
};
//Calendar implementation
JSGadget.Calendar.prototype.resize = function() {
	if (this.opt.font.size)
		this.owner.css("font-size", this.opt.font.size + "px");
	else
		this.owner.css("font-size", this.opt.font.size + "px");//calc///////////////////////
};
JSGadget.Calendar.prototype.newDate = function() {
	this.owner.empty();
	var tb = this.owner.append("<table cellspacing='2' border='0'><tbody></tbody></table>").
			children().children();
 	var tr = tb.append("<tr></tr>").children().last();
 	for (var i = 0; i < 7; ++i) {
 		tr.append("<td>" + JSGadget.Calendar.WDN[i] + "</td>");
 	  if (i > 4)
 	  	tr.children().last().css("color", "red");
 	}
 	tb.append("<tr><td colspan='7'><div></div><td></tr>").children().children().children().
 			css("border-bottom", "1px solid black");
 	var date = new Date();
 	var m = date.getMonth();
 	date.setDate(1);
 	var fwd = date.getDay();
 	fwd = fwd == 0 ? 6 : fwd - 1;
 	for (var i = 0; date.getMonth() == m; ++i) {
	 	tr = tb.append("<tr align='right'></tr>").children().last();
	 	for (var j = 0; j < 7; ++j) {
	 	  if (i == 0 && j < fwd || date.getMonth() != m)
	 	    tr.append("<td></td>");
	 	  else {
	 	  	tr.append("<td>" + date.getDate() + "</td>");
	 	  	/*
	 	  	if (date.getDate() == td && date.getMonth() == tm &&
	 	  		date.getFullYear() == ty)
		 	  	el.children().last().addClass('calendartoday');
	 	  	if (select && date.getDate() == d && date.getMonth() == m &&
	 	  		date.getFullYear() == y)
		 	  	el.children().last().addClass('calendarselect');
		 	  */
	 	  	if (j > 4)
		 	  	tr.children().last().css("color", "red");
				date.setDate(date.getDate() + 1);
			}
	 	}

 	}

};


/**
 * style.js
 */

JSGadget.Calendar.Style = {};

JSGadget.Calendar.Style.OWNER = {
	overflow:   "hidden"
};
/**
 * const.js
 */

JSGadget.Calendar.WDN = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
JSGadget.Calendar.MN = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
	"Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
