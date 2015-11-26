var display = [], time = {}, f, sep;
$(function() {
  for (var i = 0; i < 2; ++i) {
    display.push({
      h: new JSGadget.Display("#clock" + (i + 1) + " .hour", {
          digits: 2, 
          color: i & 1 ? "black" : "lime",
          shadow: i & 1 ? {color: "gray"} : {}
        }),
      m: new JSGadget.Display("#clock" + (i + 1) + " .min", {
          digits: 2, 
          color: i & 1 ? "black" : "lime",
          shadow: i & 1 ? {color: "gray"} : {}
        }),
      s: new JSGadget.Display("#clock" + (i + 1) + " .sec", {
          digits: 2, 
          color: i & 1 ? "black" : "lime",
          shadow: i & 1 ? {color: "gray"} : {}
        })
    });
  }
  sep = $(".sep, .seps");
  setInterval(function() {
    if (f = !f) {
      showTime();
      sep.addClass("show"); 
    } else
      sep.removeClass("show"); 
  }, 500);
  showTime();
});
function showTime() {
  var t = new Date(),
      s = t.getSeconds(),
      m = t.getMinutes(),
      h = t.getHours(),
      s0 = t.getUTCSeconds(),
      m0 = t.getUTCMinutes(),
      h0 = t.getUTCHours();
  if (s !== time.s) {
    time.s = s;
    display[0].s.setVal(int22dig(s));
    display[1].s.setVal(int22dig(s0));
    if (m !== time.m) {
      time.m = m;
      display[0].m.setVal(int22dig(m));
      display[1].m.setVal(int22dig(m0));
      if (h !== time.h) {
        time.h = h;
        display[0].h.setVal(int22dig(h));
        display[1].h.setVal(int22dig(h0));
      }
    }
  }
}
function int22dig(v) {
  return v < 10 ? "0" + v : "" + v;
};
