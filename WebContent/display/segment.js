/**
 * segment.js
 */

JSGadget.Display.prototype.drawS = function(s) {
	this.ctx.beginPath();
	switch (s) {
		case "a":
			this.ctx.moveTo(28, 9);
			this.ctx.lineTo(33, 5);
			this.ctx.lineTo(78, 5);
			this.ctx.lineTo(81, 8);
			this.ctx.lineTo(76, 12);
			this.ctx.lineTo(32, 12);
			break;
		case "b":
			this.ctx.moveTo(84, 10);
			this.ctx.lineTo(86, 13);
			this.ctx.lineTo(80, 44);
			this.ctx.lineTo(77, 47);
			this.ctx.lineTo(71, 42);
			this.ctx.lineTo(76, 16);
			break;
		case "c":
			this.ctx.moveTo(77, 51);
			this.ctx.lineTo(79, 53);
			this.ctx.lineTo(73, 85);
			this.ctx.lineTo(70, 88);
			this.ctx.lineTo(64, 83);
			this.ctx.lineTo(69, 57);
			break;
		case "d":
			this.ctx.moveTo(67, 90);
			this.ctx.lineTo(62, 94);
			this.ctx.lineTo(17, 94);
			this.ctx.lineTo(14, 91);
			this.ctx.lineTo(18, 87);
			this.ctx.lineTo(63, 87);
			break;
		case "e":
			this.ctx.moveTo(11, 89);
			this.ctx.lineTo(9, 86);
			this.ctx.lineTo(15, 55);
			this.ctx.lineTo(18, 52);
			this.ctx.lineTo(24, 57);
			this.ctx.lineTo(19, 83);
			break;
		case "f":
			this.ctx.moveTo(18, 48);
			this.ctx.lineTo(16, 45);
			this.ctx.lineTo(22, 14);
			this.ctx.lineTo(25, 11);
			this.ctx.lineTo(31, 16);
			this.ctx.lineTo(26, 42);
			break;
		case "g":
			this.ctx.moveTo(21, 50);
			this.ctx.lineTo(25, 46);
			this.ctx.lineTo(70, 46);
			this.ctx.lineTo(74, 49);
			this.ctx.lineTo(69, 53);
			this.ctx.lineTo(24, 53);
			break;
		case "h":
			this.ctx.moveTo(84, 80);
			this.ctx.lineTo(92, 80);
			this.ctx.lineTo(90, 87);
			this.ctx.lineTo(78, 97);
			this.ctx.lineTo(76, 97);
			this.ctx.lineTo(82, 88);
			break;
	}
	this.ctx.closePath();
	this.ctx.fill();
};
