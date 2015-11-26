var clock = [];
$(function() {
  clock.push(new JSGadget.Clock("#clock1", {
    title: "Local"
  }));
  clock.push(new JSGadget.Clock("#clock2", {
    utc: true,
    title: "UTC"
  }));
});
