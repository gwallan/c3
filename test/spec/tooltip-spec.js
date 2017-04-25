var expect = chai.expect, assert = chai.assert;

mocha.setup({
    "ui": "bdd",
    "timeout": 10000
});

describe('c3 chart tooltip', function () {
    'use strict';

    var chart;
    var tooltipConfiguration;

    var args = function () {
        return {
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25],
                    ['data3', 150, 120, 110, 140, 115, 125]
                ],
            },
            tooltip: tooltipConfiguration
        };
    };

    beforeEach(function (done) {
        chart = window.initChart(chart, args(), done);
    });

    describe('tooltip position', function () {
        before(function () {
            tooltipConfiguration = {};
        });

        describe('without left margin', function () {

            it('should show tooltip on proper position', function () {
                var eventRect = d3.select('.c3-event-rect-2').node();
                window.setMouseEvent(chart, 'mousemove', 100, 100, eventRect);

                var tooltipContainer = d3.select('.c3-tooltip-container'),
                    top = Math.floor(+tooltipContainer.style('top').replace(/px/, '')),
                    left = Math.floor(+tooltipContainer.style('left').replace(/px/, '')),
                    topExpected = 115,
                    leftExpected = 280;
                expect(top).to.be.eql(topExpected);
                expect(left).to.be.at.least(leftExpected);
            });

        });

        describe('with left margin', function () {

            it('should set left margin', function () {
                d3.select('#chart').style('margin-left', '300px');
                expect(true).to.be.true;
            });

            it('should show tooltip on proper position', function () {
                var eventRect = d3.select('.c3-event-rect-2').node();
                window.setMouseEvent(chart, 'mousemove', 100, 100, eventRect);

                var tooltipContainer = d3.select('.c3-tooltip-container'),
                    top = Math.floor(+tooltipContainer.style('top').replace(/px/, '')),
                    left = Math.floor(+tooltipContainer.style('left').replace(/px/, '')),
                    topExpected = 115,
                    leftExpected = 280;
                expect(top).to.be.eql(topExpected);
                expect(left).to.be.at.least(leftExpected);
            });

        });

    });

    describe('tooltip positionFunction', function () {
        var topExpected = 37, leftExpected = 79;

        before(function () {
            tooltipConfiguration = {
                position: function (data, width, height, element) {
                    expect(data.length).to.be.eql(args().data.columns.length);
                    expect(data[0]).toEqual(jasmine.objectContaining({
                        index: 2,
                        value: 100,
                        id: 'data1'
                    }));
                    expect(width).to.be.at.least(0);
                    expect(height).to.be.at.least(0);
                    expect(element).to.be.eql(d3.select('.c3-event-rect-2').node());
                    return {top: topExpected, left: leftExpected};
                }
            };
        });

        it('should be set to the coordinate where the function returned', function () {
            var eventRect = d3.select('.c3-event-rect-2').node();
            window.setMouseEvent(chart, 'mousemove', 100, 100, eventRect);

            var tooltipContainer = d3.select('.c3-tooltip-container'),
                top = Math.floor(+tooltipContainer.style('top').replace(/px/, '')),
                left = Math.floor(+tooltipContainer.style('left').replace(/px/, ''));
            expect(top).to.be.eql(topExpected);
            expect(left).to.be.eql(leftExpected);
        });
    });

    describe('tooltip getTooltipContent', function () {
        before(function () {
            tooltipConfiguration = {
                data_order: 'desc'
            };
        });

        it('should sort values desc', function () {
          var eventRect = d3.select('.c3-event-rect-2').node();
          window.setMouseEvent(chart, 'mousemove', 100, 100, eventRect);

          var tooltipTable = d3.select('.c3-tooltip')[0];
          var expected = ["", "c3-tooltip-name--data3",
                            "c3-tooltip-name--data1", "c3-tooltip-name--data2"];
          var i;
          for (i = 0; i < tooltipTable[0].rows.length; i++) {
            expect(tooltipTable[0].rows[i].className).to.be.eql(expected[i]);
          }
        });
    });
});

mocha.run();
