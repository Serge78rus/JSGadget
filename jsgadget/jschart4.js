var chart;
$(function() {
  //prepare values
  var t2 = new Date(), //now
      tz = t2.getTimezoneOffset() * 60; //timezone in sec
  t2 = t2.getTime() / 1000 - tz; //now local time in sec (end of interval)
  var t1 = t2 - 60, //start of interval in sec
      d1 = [], d2 = [], //data arrays
      v1 = Math.random() > 0.5, //initial data values;
      v2 = Math.random() > 0.5,
      v3 = Math.random() > 0.5 ? 1 : 0;
      f = 5;
  for (var t = Math.floor(t1); t <= t2; ++t) { //fill data
    d1.push({x: t, y: Math.random() > 0.8 ? v1 = !v1 : v1});//array of objects
    d2.push([t, Math.random() > 0.8 ? v2 = !v2 : v2,
        Math.random() > 0.8 ? (v3 = v3 ? 0 : 1) : v3]);
  }
  //create and draw chart
  chart = new JSGadget.Chart($("#chart"), {
    gap: {l: 40}, //left space for status names
    digital: true, //digital chart
    trends: [ //pass trends to constructor
      new JSGadget.DTrend({title: "Chart 1"}), //no data
      new JSGadget.DTrend({data: d2, xFld: 0, yFld: 1, text0: "No", text1: "Yes",
          title: "Chart 2"}),
      new JSGadget.DTrend({data: d2, xFld: 0, yFld: 2, text0: "Off", text1: "On",
          title: "Chart 3", width: 4}) //set width (default 2)
    ]
  });
  chart.trends.push(new JSGadget.DTrend(chart, {title: "Chart 4"})); //append trends
  chart.trends.push(new JSGadget.DTrend(chart, {data: d2, xFld: 0, yFld: 1, 
      text0: "Close", text1: "Open", title: "Chart 5", color: "green"})); //set color
  chart.trends.push(new JSGadget.DTrend(chart, {data: d2, xFld: 0, yFld: 2, 
      text0: "Stop", text1: "Run", title: "Chart 6", color: "red"}));
  chart.trends[0].data = d1; //asign trends data
  chart.trends[3].data = d1;
  chart.bAxis.setMinMax(t1, t2); //set x limits
  chart.draw(); //draw chart
});
