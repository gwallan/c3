function takeScreenshot(filename) {
    if (window.callPhantom) {
        var date = new Date();
        var filename =  "./test/screenshots/" + (filename || date.getTime());

        callPhantom({'screenshot': filename});
    }
}
function stdout(msg){
    if (window.callPhantom) {
        window.callPhantom({
            stdout: msg
        });
    }
}