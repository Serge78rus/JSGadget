var meter, v = 0, f;
$(function() {
  meter = new JSGadget.Meter("#meter_i", {
    title: "V",
    gap: 10,
    scale: {
      w: 1,
      lm: {
        s: 10,
        w: 1,
        l: 2,
        f: 4.5
      },
      sm: {
        s: 2,
        w: 0.5,
        l: 1
      }
    },
    hand: {
      l: 38
    },
    font: {
      size: "bold 30"
    }
  });
  setInterval(function() {
    if (v <= 0)
      f = true;
    else if (v >= 100)
      f = false;
    meter.setVal(v += f ? 1 : -1);
  }, 100);
});
