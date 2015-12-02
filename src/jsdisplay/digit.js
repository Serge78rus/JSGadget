/**
 * digit.js
 */

JSGadget.Display.prototype.drawD = function(d, dp) {
	switch (d) {
		case "0":
			this.drawS("a");
			this.drawS("b");
			this.drawS("c");
			this.drawS("d");
			this.drawS("e");
			this.drawS("f");
			break;
		case "1":
			this.drawS("b");
			this.drawS("c");
			break;
		case "2":
			this.drawS("a");
			this.drawS("b");
			this.drawS("d");
			this.drawS("e");
			this.drawS("g");
			break;
		case "3":
			this.drawS("a");
			this.drawS("b");
			this.drawS("c");
			this.drawS("d");
			this.drawS("g");
			break;
		case "4":
			this.drawS("b");
			this.drawS("c");
			this.drawS("f");
			this.drawS("g");
			break;
		case "5":
			this.drawS("a");
			this.drawS("c");
			this.drawS("d");
			this.drawS("f");
			this.drawS("g");
			break;
		case "6":
			this.drawS("a");
			this.drawS("c");
			this.drawS("d");
			this.drawS("e");
			this.drawS("f");
			this.drawS("g");
			break;
		case "7":
			this.drawS("a");
			this.drawS("b");
			this.drawS("c");
			break;
		case "8":
			this.drawS("a");
			this.drawS("b");
			this.drawS("c");
			this.drawS("d");
			this.drawS("e");
			this.drawS("f");
			this.drawS("g");
			break;
		case "9":
			this.drawS("a");
			this.drawS("b");
			this.drawS("c");
			this.drawS("d");
			this.drawS("f");
			this.drawS("g");
			break;
		case "-":
			this.drawS("g");
			break;
	}
	if (dp)
		this.drawS("h");
};
