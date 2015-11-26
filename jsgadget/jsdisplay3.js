var display = [], 
   color = ["#ff0000", "#00ff00", "#0000ff"],
   shadow = [null, "gray", "silver", "gray"];
$(function() {
  for (var i = 0; i < 6; ++i)
    display.push(new JSGadget.Display(
      $("#display" + (i + 1)).css({
        left: (10 + Math.floor(i / 3) * 310) + "px", 
        top: (10 + (i % 3) * 100) + "px" 
      }), {
        digits: 4, 
        color: i < 3 ? color[i] : "black",
        shadow: i < 4 ? {} : {
          color: shadow[i % 3], 
          dx: (i % 3) * 4,
          dy: (i % 3) * 4,
        }
      }, "0.123"));
});
