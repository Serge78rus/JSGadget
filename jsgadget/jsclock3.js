var clock = [];
$(function() {
  for (var i = 1; i <= 4; ++i)
    clock.push(new JSGadget.Clock("#clock" + i));
});
