var meter = [];
$(function() {
  meter.push(new JSGadget.Meter("#meter1"));
  meter.push(new JSGadget.Meter("#meter2", {
    hand: {
      w: 6,
      cr: 6,
      f: "t"
    }
  }));
  meter.push(new JSGadget.Meter("#meter3", {angle: 240}));
  meter.push(new JSGadget.Meter("#meter4", {
    angle: 240,
    hand: {
      w: 3,
      l: 31,
      l0: 10,
      cr: 5
    }
  }));
  meter.push(new JSGadget.Meter("#meter5", {
    angle: 240,
    hand: {
      c: "blue",
      w: 6,
      cr: 6,
      f: "t"
    }
  }));
  meter.push(new JSGadget.Meter("#meter6", {
    angle: 240,
    hand: {
      c: "black",
      w: 6,
      l0: 15,
      cr: 6,
      f: "t"
    }
  }));
});
