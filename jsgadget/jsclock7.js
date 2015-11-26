var clock = [],
  text = [
    "Sans-Serif",
    "Serif",
    "Verdana",
    "ORIENT",
    "SEIKO",
    "Made in China"
  ],
  font = [
    "sans-serif",
    "sans",
    "verdana",
    "serif",
    "serif",
    "sans-serif"
  ],
  size = [
    14, 
    14, 
    14, 
    "bold 14", 
    "bold 14", 
    11
  ];
$(function() {
  for (var i = 0; i < 6; ++i)
    clock.push(new JSGadget.Clock("#clock" + (i + 1), {
      title: text[i],
      font: {
        size: size[i],
        family: font[i]
      }
    }));
});
