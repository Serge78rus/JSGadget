var counter = [], time = {}, f, sep;
$(function() {
  for (var i = 0; i < 2; ++i) {
    counter.push(new JSGadget.Counter("#counter" + (i + 1) + ">.in", 
      {digits: 4, color: i & 1 ? "black" : "white"}));
  }
  setInterval(function() {
    counter[0].inc();
    counter[1].dec();
  }, 1000);
});
