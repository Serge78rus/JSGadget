/**
 *
 */

var chart = [], points = 1000, cycle = 20;

$(function() {
	var t2 = new Date().getTime() / 1000, t1 = t2 - 86400, dt = (t2 - t1) / points;
	var sin = [], cos = [], rnd = [], d1 = [], d2 = [], d3 = [];
	for (var i = 0; i < points; ++i) {
		var t = t1 + i * dt;
		sin[i] = {x: t, y: Math.sin(i / cycle) * 30 + 50};
		cos[i] = {x: t, y: Math.cos(i / cycle) * 30 + 50};
		rnd[i] = [t, i % cycle ? rnd[i - 1][1] : Math.random() * 60 + 20];
		d1[i] = {x: t, y: i % cycle ? d1[i - 1].y : Math.random() > 0.5};
		d2[i] = [t, i % cycle ? d2[i - 1][1] : Math.random() > 0.5];
		d3[i] = [t, i % cycle ? d3[i - 1][1] : (Math.random() > 0.5 ? 1 : 0)];
	}
	var start = new Date().getTime() / 1000;
	for (var i = 0; i < 5; ++i) {
		switch (i) {
			case 0:
				chart[i] = new JSGadget.Chart($("#chart" + (i + 1)), {background: "white"});
				chart[i].lAxis.setMinMax(0, 100);
				chart[i].lAxis.lohi = {lolo: 10, lo: 20, hi: 80, hihi: 90};
				chart[i].trends.push(new JSGadget.ATrend(chart[i], {data: sin}));
				chart[i].trends.push(new JSGadget.ATrend(chart[i]));
				chart[i].trends.push(new JSGadget.ATrend(chart[i], {xFld: 0, yFld: 1}));
				chart[i].trends[1].data = cos;
				chart[i].trends[2].data = rnd;
				break;
			case 1:
				chart[i] = new JSGadget.Chart($("#chart" + (i + 1)),
						{
							gap: {
								l: 40
							},
							digital: true,
							trends: [
											  new JSGadget.DTrend({data: d1, title: "График 1"}),
											  new JSGadget.DTrend({data: d2, xFld: 0, yFld: 1, text0: "Нет", text1: "Есть",
											   	 	title: "График 2"}),
											  new JSGadget.DTrend({data: d3, xFld: 0, yFld: 1, text0: "Нет", text1: "Да",
											   	 	title: "График 3"}),
											  new JSGadget.DTrend({data: d1, title: "График 4"}),
											  new JSGadget.DTrend({data: d2, xFld: 0, yFld: 1, text0: "Нет", text1: "Есть",
											   	 	title: "График 5", color: "yellow"}),
											  new JSGadget.DTrend({data: d3, xFld: 0, yFld: 1, text0: "Нет", text1: "Да",
											   	 	title: "График 6", color: "red"})/*,
											  new JSGadget.DTrend({data: d1, title: "График 7"}),
											  new JSGadget.DTrend({data: d2, xFld: 0, yFld: 1, text0: "Нет", text1: "Есть",
											   	 	title: "График 8"}),
											  new JSGadget.DTrend({data: d3, xFld: 0, yFld: 1, text0: "Нет", text1: "Да",
											   	 	title: "График 9", color: "red"})*/
							]
						});
				break;
			case 2:
				chart[i] = new JSGadget.Chart($("#chart" + (i + 1)),
						{
							font: {
								size: 10
							},
							gap: {
								l: 30,
								b: 25
							},
							trends: [
							         new JSGadget.ATrend({data: sin}),
							         new JSGadget.ATrend({data: cos}),
							         new JSGadget.ATrend({data: rnd, xFld: 0, yFld: 1})
							         ]
						});
				chart[i].lAxis.setMinMax(0, 100);
				break;
			case 3:
				chart[i] = new JSGadget.Chart($("#chart" + (i + 1)),
						{
							gap: {
								l: 40
							},
							digital: true,
							trends: [new JSGadget.DTrend({data: d1, text0: "Нет", text1: "Есть"}),]
						});

				break;
			case 4:
				chart[i] = new JSGadget.Chart($("#chart" + (i + 1)),
						{
							gap: {
								l: 40
							},
							digital: true,
							trends: [new JSGadget.DTrend({data: d2, xFld: 0, yFld: 1}),]
						});

				break;
		}
		chart[i].bAxis.setMinMax(t1, t2);
		chart[i].draw();
	}
	var stop = new Date().getTime() / 1000;
//	alert("draw time: " + (stop - start));
});

function resize() {
	for (var i = 0, l = chart.length; i < l; ++i)
		chart[i].resize();
}