var page = require('webpage').create();
page.viewportSize = { width: 720, height: 480 };

var system = require('system');
var args = system.args;
var type = args[1], demo = args.length == 1 ? args[1] : args[2];

var fs = require('fs');
var list = fs.list("screenshots/");
// Cycle through the list
for(var x = 0; x < list.length; x++){
  // Note: If you didn't end path with a slash, you need to do so here.
  var file = "screenshots/" + list[x];
  if(fs.isFile(file)){
    fs.remove(file);
  }
}

page.open('http://127.0.0.1:8086/htdocs/report/' + type + '/' + demo, function () {
  setTimeout(function() {
    // Initial frame
    var frame = 0;
    // Add an interval every 25th second
    setInterval(function() {
      // Render an image with the frame name
      page.render('screenshots/' + type + (frame++) + '.png', { format: "png" });
      // Exit after 50 images
      if(frame > 50) {
        phantom.exit();
      }
    }, 25);
  }, 666);
});