function initDom() {
    'use strict';

    if(document.querySelector("#chart"))return;

    var div = document.createElement('div');
    div.id = 'chart';
    div.style.width = '640px';
    div.style.height = '480px';
    document.body.appendChild(div);
    document.body.style.margin = '0px';
}
typeof initDom !== 'undefined';

function setMouseEvent(chart, name, x, y, element) {
    'use strict';

    var paddingLeft = chart.internal.main.node().transform.baseVal.getItem(0).matrix.e,
        event = document.createEvent("MouseEvents");
    event.initMouseEvent(name, true, true, window,
                       0, 0, 0, x + paddingLeft, y + 5,
                       false, false, false, false, 0, null);
    chart.internal.d3.event = event;
    if (element) { element.dispatchEvent(event); }
}
typeof setMouseEvent !== 'undefined';

function initChart(chart, args, done) {
    'use strict';

    if (typeof chart === 'undefined') {
        window.initDom();
    }else{
        chart.destroy();
    }
    if (args) {
        chart = window.c3.generate(args);
        window.d3 = chart.internal.d3;
        window.d3.select('#chart')
            .style('position', 'fixed')
            .style('right', "20px")
            .style('bottom', "20px");
    }

    window.setTimeout(function () {
        done();
    }, 10);

    return chart;
}
typeof initChart !== 'undefined';