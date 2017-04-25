var name = process.argv[2];
var shell = require("shelljs");

shell.exec("rm -rf out.mp4");
shell.exec("ffmpeg -start_number 10 -i ./screenshots/" + name + "%02d.png -c:v libx264 -r 25 -pix_fmt yuv420p out.mp4");
