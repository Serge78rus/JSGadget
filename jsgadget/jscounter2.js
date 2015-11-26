var counter = [], v = "12345";
$(function() {
  for (var i = 1; i <= 5; ++i)
    counter.push(new JSGadget.Counter("#counter" + i, {digits: i}, v.substring(0, i)));
});
