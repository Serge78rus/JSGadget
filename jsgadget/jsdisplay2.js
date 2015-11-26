var display = [], v = "12345";
$(function() {
  for (var i = 1; i <= 5; ++i)
    display.push(new JSGadget.Display("#display" + i, {digits: i}, v.substring(0, i)));
});
