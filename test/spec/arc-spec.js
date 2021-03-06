var expect = chai.expect, assert = chai.assert;

mocha.setup({
    "ui": "bdd",
    "timeout": 10000
});

describe('c3 chart arc', function () {
    'use strict';

    var chart, args;

    beforeEach(function (done) {
        chart = window.initChart(chart, args, done);
    });

    describe('show pie chart', function () {
        it('should update args to have pie chart', function () {
            args = {
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 150],
                        ['data3', 120]
                    ],
                    type: 'pie'
                }
            };
            expect(true).to.be.true;
        });

        it('should have correct classes', function () {
            var chartArc = d3.select('.c3-chart-arcs'),
            arcs = {
                data1: chartArc.select('.c3-chart-arc.c3-target.c3-target-data1')
                    .select('g.c3-shapes.c3-shapes-data1.c3-arcs.c3-arcs-data1')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data1'),
                data2: chartArc.select('.c3-chart-arc.c3-target.c3-target-data2')
                    .select('g.c3-shapes.c3-shapes-data2.c3-arcs.c3-arcs-data2')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data2'),
                data3: chartArc.select('.c3-chart-arc.c3-target.c3-target-data3')
                    .select('g.c3-shapes.c3-shapes-data3.c3-arcs.c3-arcs-data3')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data3')
            };

            expect(arcs.data1.size()).to.equal(1);
            expect(arcs.data2.size()).to.equal(1);
            expect(arcs.data3.size()).to.equal(1);
        });

        it('should have correct d', function () {
            expect(d3.select('.c3-arc-data1').attr('d')).to.match(/M-124\..+,-171\..+A211\..+,211\..+ 0 0,1 -3\..+,-211\..+L0,0Z/);
            expect(d3.select('.c3-arc-data2').attr('d')).to.match(/M1\..+,-211\..+A211\..+,211\..+ 0 0,1 1\..+,211\..+L0,0Z/);
            expect(d3.select('.c3-arc-data3').attr('d')).to.match(/M1\..+,211\..+A211\..+,211\..+ 0 0,1 -124\..+,-171\..+L0,0Z/);
        });

        it('should set args with data id that can be converted to a color', function () {
            args.data.columns = [
                ['black', 30],
                ['data2', 150],
                ['data3', 120]
            ];
            expect(true).to.be.true;
        });

        it('should have correct d even if data id can be converted to a color', function (done) {
            setTimeout(function () {
                expect(d3.select('.c3-arc-black').attr('d')).to.match(/M-124\..+,-171\..+A211\..+,211\..+ 0 0,1 -3\..+,-211\..+L0,0Z/);
                done();
            }, 500);
        });

        it('should update args to have empty pie chart', function () {
            args = {
                data: {
                    columns: [
                        ['data1', null],
                        ['data2', null],
                        ['data3', null]
                    ],
                    type: 'pie'
                }
            };
            expect(true).to.be.true;
        });

        it('should have correct d attribute', function () {
            var chartArc = d3.select('.c3-chart-arcs'),
            arcs = {
                data1: chartArc.select('.c3-chart-arc.c3-target.c3-target-data1')
                    .select('g.c3-shapes.c3-shapes-data1.c3-arcs.c3-arcs-data1')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data1'),
                data2: chartArc.select('.c3-chart-arc.c3-target.c3-target-data2')
                    .select('g.c3-shapes.c3-shapes-data2.c3-arcs.c3-arcs-data2')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data2'),
                data3: chartArc.select('.c3-chart-arc.c3-target.c3-target-data3')
                    .select('g.c3-shapes.c3-shapes-data3.c3-arcs.c3-arcs-data3')
                    .select('path.c3-shape.c3-shape.c3-arc.c3-arc-data3')
            };
            expect(arcs.data1.attr('d').indexOf('NaN')).to.be.equal(-1);
            expect(arcs.data2.attr('d').indexOf('NaN')).to.be.equal(-1);
            expect(arcs.data3.attr('d').indexOf('NaN')).to.be.equal(-1);
        });
    });
});

mocha.run();
