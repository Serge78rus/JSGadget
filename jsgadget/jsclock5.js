var clock = [];
$(function() {
  clock.push(new JSGadget.Clock("#clock1"));
  clock.push(new JSGadget.Clock("#clock2", {
    dh: { //dial hour
      c: "red", //color
      w: 5,  //width
      f: "c" //form: l-line(default), t-triangle, c-cycle
    }
  }));
  clock.push(new JSGadget.Clock("#clock3", {
    dh: { //dial hour
      c: "red", //color
      w: 5, //width
      l: 6, //length
      f: "t" //form: l-line(default), t-triangle, c-cycle
    }
  }));
  clock.push(new JSGadget.Clock("#clock4", {
    dh: { //dial hour
      l: 3, //length
    },
    dm: { //dial min
      w: 2, //width
      f: "c" //form: l-line(default), t-triangle, c-cycle
    }
  }));
  clock.push(new JSGadget.Clock("#clock5", {
    dh: { //dial hour
      w: 4, //width
      l: 8, //length
      f: "t" //form: l-line(default), t-triangle, c-cycle
    },
    dm: { //dial min
      w: 4, //width
      f: "t" //form: l-line(default), t-triangle, c-cycle
    }
  }));
  clock.push(new JSGadget.Clock("#clock6", {
    dh: { //dial hour
      c: "white", //color
    },
    dm: { //dial min
      c: "white", //color
    },
    hh: { //hour hand
      c: "white", //color
    },
    mh: { //min hand
      c: "white", //color
    }
  }));
});
