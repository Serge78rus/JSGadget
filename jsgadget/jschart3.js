var chart;
$(function() {
  //prepare values
  var t2 = new Date(), //now
      tz = t2.getTimezoneOffset() * 60; //timezone in sec
  t2 = t2.getTime() / 1000 - tz; //now local time in sec (end of interval)
  var t1 = t2 - 60, //start of interval in sec
      data = []; //data array
  for (var t = t1; t <= t2; t += 0.2) //fill data
    data.push({x: t, y: Math.sin((t / 5) % (Math.PI * 2))}); 
  //create and draw chart
  chart = new JSGadget.Chart($("#chart"), { //create chart
    trends: [new JSGadget.ATrend()] //create trend
  });
  chart.lAxis.lohi = {lolo: -0.9, lo: -0.7, hi: 0.7, hihi: 0.9};
  chart.trends[0].data = data; //set data
  chart.bAxis.setMinMax(t1, t2); //set x limits
  chart.lAxis.setMinMax(-1.1, 1.1); //set y limits
  chart.draw(); //draw chart
});
