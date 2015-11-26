var chart;
$(function() {
  //prepare values
  var t2 = new Date(), //now
      tz = t2.getTimezoneOffset() * 60; //timezone in sec
  t2 = t2.getTime() / 1000 - tz; //now local time in sec (end of interval)
  var t1 = t2 - 60, //start of interval in sec
      data1 = [], //data array for trend 0
      data2 = [], //data array for trends 1 and 2
      _2pi = Math.PI * 2; //2 * PI
  for (var t = t1; t <= t2; t += 0.2) { //fill data
    data1.push([t, Math.sin((t / 5) % _2pi)]); //array of arrays
    data2.push({x: t, y: Math.cos((t / 5) % _2pi), //array of objects
       y2: Math.sin((t / 5) % _2pi) * Math.sin((t / 5) % _2pi)}); 
  }
  //create and draw chart
  chart = new JSGadget.Chart($("#chart"), { //create chart
    trends: [ //create trends
      new JSGadget.ATrend({data: data1, xFld: 0, yFld: 1}), //trend 0: set data in constructor
      new JSGadget.ATrend({color: "red"}) //trend 1: not set data
    ] 
  });
  chart.trends[1].data = data2; //set data for trend 1
  chart.trends.push(new JSGadget.ATrend(chart, {  //add trend 2
    data: data2, //data array
    yFld: "y2", //y field name (default y)
    color: "black", //trend color
    width: 4 //trend width
  }));
  chart.bAxis.setMinMax(t1, t2); //set x limits
  chart.lAxis.setMinMax(-1.1, 1.1); //set y limits
  chart.draw(); //draw chart
});
