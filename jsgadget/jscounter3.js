var counter = [], 
   color = ["#ffffff", "#ff0000", "#00ff00", "#0000ff", "#000000", "#ff0000", "#00ff00", "#0000ff"];
$(function() {
  for (var i = 0; i < 8; ++i)
    counter.push(new JSGadget.Counter(
      $("#counter" + (i + 1)).css({
        left: (75 + Math.floor(i / 4) * 300) + "px", 
        top: (25 + (i % 4) * 100) + "px" 
      }), {
        digits: 4, 
        color: color[i]
      }, "1234"));
});
