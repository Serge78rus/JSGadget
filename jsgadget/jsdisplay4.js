var display = [];
$(function() {
  for (var i = 1; i <= 6; ++i)
    display.push(new JSGadget.Display("#display" + i, {
        digits: 4, 
        color: i & 1 ? "black" : "lime",
        shadow: i & 1 ? {color: "gray"} : {}
      }, "0.123"));
});
