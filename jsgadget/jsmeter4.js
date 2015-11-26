var meter = [];
$(function() {
  meter.push(new JSGadget.Meter("#meter1_i", {
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
  }));
  meter.push(new JSGadget.Meter("#meter2_i", {
    title: "MPa",
    angle: 240,
    max: 10,
    scale: {
      lm: {
        s: 1
      },
      sm: {
        s: 0.2
      }
    },
    hand: {
      w: 2,
      l: 32,
      l0: 10,
      cr: 4,
    },
    font: {
      size: "bold 20"
    }
  }));
  meter.push(new JSGadget.Meter("#meter3_i", {
    title: "kV",
    angle: 240,
    max: 10,
    scale: {
      c: "white",
      lm: {
        c: "white",
        fc: "white",
        s: 2
      },
      sm: {
        c: "white",
        s: 0.5
      }
    },
    hand: {
      w: 8,
      cr: 6,
      f: "t"
    },
    font: {
      size: "bold 20",
      color: "red"
    }
  }));
});
