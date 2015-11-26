var clock = [];
$(function() {
  clock.push(new JSGadget.Clock("#clock1"));
  clock.push(new JSGadget.Clock("#clock2", {
    hh: { //hour hand
      w: 5, //width
      l0: 8, //tail lenght
      f: "t" //form: l-line(default), t-triangle
    },
    mh: { //min hand
      w: 5, //width
      l: 35, //length
      l0: 10, //tail lenght
      f: "t" //form: l-line(default), t-triangle
    }
  }));
  clock.push(new JSGadget.Clock("#clock3", {
    hh: { //hour hand
      w: 8, //width
      l0: 0, //tail lenght
      f: "t" //form: l-line(default), t-triangle
    },
    mh: { //min hand
      w: 8, //width
      l: 35, //length
      l0: 0, //tail lenght
      cr: 6, //center radius
      f: "t" //form: l-line(default), t-triangle
    },
    sh: { //sec hand
      l0: 0, //tail lenght
      cr: 4, //center radius
    }
  }));
  clock.push(new JSGadget.Clock("#clock4", {
    hh: { //hour hand
      w: 6, //width
      l0: 8, //tail lenght
    },
    mh: { //min hand
      w: 4, //width
      l0: 10, //tail lenght
      cr: 6, //center radius
    },
    sh: { //sec hand
      w: 2, //width
      cr: 4, //center radius
    }
  }));
  clock.push(new JSGadget.Clock("#clock5", {
    hh: { //hour hand
      c: "red" //color
    },
    mh: { //min hand
      c: "red" //color
    },
    sh: { //sec hand
      c: "black" //color
    }
  }));
  clock.push(new JSGadget.Clock("#clock6", {
    hh: { //hour hand
      c: "blue" //color
    },
    mh: { //min hand
      c: "lime" //color
    }
  }));
});
