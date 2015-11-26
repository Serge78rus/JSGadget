var meter = [];
$(function() {
  meter.push(new JSGadget.Meter("#meter1"));
  meter.push(new JSGadget.Meter("#meter2", {
    min: -1, 
    max: 1, 
    scale: {
      lm: {
        s: 0.5
      }, 
      sm: {
        s: 0.1
      }
    }
  }));
  meter.push(new JSGadget.Meter("#meter3", {
    scale: {
      w: 1,
      c: "blue",
      lm: {
        c: "blue",
        w: 1,
        f: 6,
        fc: "blue"
      }, 
      sm: {
        c: "blue",
        s: 4,
        l: 1
      }
    }
  }));
  meter.push(new JSGadget.Meter("#meter4", {angle: 240}));
  meter.push(new JSGadget.Meter("#meter5", {
    angle: 240,
    min: -1, 
    max: 1, 
    scale: {
      lm: {
        s: 0.2,
        f: 7
      }, 
      sm: {
        s: 0.1
      }
    }
  }));
  meter.push(new JSGadget.Meter("#meter6", {
    angle: 240,
    scale: {
      w: 1,
      c: "green",
      lm: {
        c: "green",
        s: 10,
        w: 1,
        f: 6
      }, 
      sm: {
        c: "green",
        s: 2,
        l: 1
      }
    }
  }));
});
