var chart, v = [], i = 60, c = 5, cc = 2;
$(function() {
  chart = new JSGadget.Chart($("#chart"), { //create chart
    trends: [ //create trends
      new JSGadget.ATrend({data: v, xFld: 0, yFld: 1, color: "red"}),
      new JSGadget.ATrend({data: v, xFld: 0, yFld: 2, color: "blue"})
    ] 
  });
  chart.lAxis.setMinMax(-1.1, 1.1); //set y limits
  setInterval(function() {
    tick();
  }, 1000);
  tick();
});
function tick() {
  var t2 = new Date(), tz = tz = t2.getTimezoneOffset() * 60;
  t2 = t2.getTime() / 1000 - tz;
  var t1 = t2 - i, t = (t2 / c) % (Math.PI * 2);
  v.push([t2, Math.sin(t), Math.cos(t)]);
  if (v.length > i)
    delete v.shift();
  if (!--cc) {
    cc = c;
    if (!chart.lAxis.zoom && !chart.bAxis.zoom) {
      chart.loading(true);
      setTimeout(function() {
        chart.bAxis.setMinMax(t1, t2);
        chart.loading(false); //draw() called inside loading()
      }, 1000);
    }
  }
};
