var counter = [];
$(function() {
  for (var i = 1; i <= 6; ++i)
    counter.push(new JSGadget.Counter("#counter" + i, {
        digits: 4, 
        color: i & 1 ? "black" : "white",
      }, "1234"));
});
