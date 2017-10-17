var c3 = require("../c3"),
    utility = require("../utility"),
    Axis = require("../axis"),
    Grid = require("../grid"),
    Region = require("../region"),
    Legend = require("../legend"),
    Text = require("../text");

function C3Bar() {
    var self = this;

    return {
        initBar: function () {
            var $$ = this;
            $$.main.select('.' + $$.CLASS.chart).append("g")
                .attr("class", $$.CLASS.chartBars)
                // .attr("transform", $$.config.bar_corners ? "translate(0, 20)" : null);
        },
        updateTargetsForBar: function (targets) {
            var $$ = this, config = $$.config,
                mainBarUpdate, mainBarEnter,
                classChartBar = $$.classChartBar.bind($$),
                classBars = $$.classBars.bind($$),
                classFocus = $$.classFocus.bind($$),
                classCircles = $$.classCircles.bind($$);

            mainBarUpdate = $$.main.select('.' + $$.CLASS.chartBars).selectAll('.' + $$.CLASS.chartBar)
                .data(targets)
                .attr('class', function (d) { return classChartBar(d) + classFocus(d); });
            mainBarEnter = mainBarUpdate.enter().append('g')
                .attr('class', classChartBar)
                .style('opacity', 0)
                .style("pointer-events", "none");
            // Bars for each data
            mainBarEnter.append('g')
                .attr("class", classBars)
                .style("cursor", function (d) { return config.data_selection_isselectable(d) ? "pointer" : null; });
            mainBarEnter.append('g')
                .attr("class", classCircles)
                .style("cursor", function (d) { return config.data_selection_isselectable(d) ? "pointer" : null; });
        },
        updateBar: function (durationForExit) {
            var $$ = this,
                barData = $$.barData.bind($$),
                classBar = $$.classBar.bind($$),
                initialOpacity = $$.initialOpacity.bind($$),
                color = function (d) { return $$.color(d.id); };

            $$.mainBar = $$.main.selectAll('.' + $$.CLASS.bars).selectAll('.' + $$.CLASS.bar)
                .data(barData);
            $$.mainBar.enter().append('path')
                .attr("class", classBar)
                .style("stroke", color)
                .style("fill", color);
            $$.mainBar
                .style("opacity", initialOpacity);
            $$.mainBar.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();
        },
        redrawBar: function (drawBar, withTransition) {
            var $$ = this;

            if(!this.mainBar.length)return;

            this.mainBar
                .style("fill", this.color)
                .style("opacity", 1)
                .attr("d", function(d, i){
                    var outline;

                    if(!d.outline)
                        d.outline = drawBar(d, i);
                    outline = d.outline.split(" ");

                    outline[2] = outline[1];
                    outline[3] = outline[4];

                    return outline.join(" ");
                });

            withTransition = withTransition || $$.config.transition_enabled;

            return [
                (withTransition ? this.mainBar.transition(Math.random().toString()).duration($$.config.transition_duration) : this.mainBar)
                    .attr('d', function(d){
                        return d.outline;
                    })
            ];
        },
        getBarW: function (axis, barTargetsNum) {
            var $$ = this, config = $$.config,
                w = typeof config.bar_width === 'number' ? config.bar_width : barTargetsNum ? (axis.tickInterval() * config.bar_width_ratio) / barTargetsNum : 0;

            return config.bar_width_max && w > config.bar_width_max ? config.bar_width_max : w;
        },
        getBars: function (i, id) {
            var $$ = this;

            return (id ? $$.main.selectAll('.' + $$.CLASS.bars + $$.getTargetSelectorSuffix(id)) : $$.main).selectAll('.' + $$.CLASS.bar + (utility.isValue(i) ? '-' + i : ''));
        },
        getBarSingle: function (i, id, coor) {
            var $$ = this, target;

            if(!id && coor){
                target = $$.main.selectAll("." + $$.CLASS.bar + "-" + i).filter(function(d, i){
                    var rect = this.getBBox();
                    return coor[0] > rect.x && coor[1] > rect.y && coor[0] < (rect.x + rect.width) && coor[1] < (rect.y + rect.height);
                });
            }else{
                target = $$.main.selectAll('.' + $$.CLASS.bars + $$.getTargetSelectorSuffix(id)).selectAll('.' + $$.CLASS.bar + (isValue(i) ? '-' + i : ''));
            }

            return target;
        },
        expandBars: function (i, id, reset) {
            var $$ = this;

            if (reset) { $$.unexpandBars(); }
            $$.getBars(i, id).classed($$.CLASS.EXPANDED, true);
        },
        expandBarSingle: function (i, id, reset, coor) {
            var $$ = this, single;

            $$.expandBars(null, null, reset);

            return $$.getBarSingle(i, null, coor).classed($$.CLASS.EXPANDED, false);
        },
        unexpandBars: function (i) {
            var $$ = this;
            $$.getBars(i).classed($$.CLASS.EXPANDED, false);
        },
        generateDrawBar: function (barIndices, isSub) {
            var $$ = this, config = $$.config,
                getPoints = $$.generateGetBarPoints(barIndices, isSub);

            return function (d, i) {
                // 4 points that make a bar
                var points = getPoints(d, i);
                // switch points if axis is rotated, not applicable for sub chart
                var indexX = config.axis_rotated ? 1 : 0;
                var indexY = config.axis_rotated ? 0 : 1;
                var rx = config.bar_corners ? (points[2][indexX] - points[1][indexX])/2 : 0;
                var path = 'M ' + points[0][indexX] + ',' + points[0][indexY] + ' ' +
                        'L' + points[1][indexX] + ',' + (!config.bar_corners ? points[1][indexY] : points[1][indexY] + rx) + ' ' +
                        (!config.bar_corners ? 'L' + points[2][indexX] + ',' + points[2][indexY] : 'A' + rx + "," + rx + " 0 1,1 " + points[2][indexX] + ',' + (points[2][indexY] + rx)) + ' ' +
                        'L' + points[3][indexX] + ',' + points[3][indexY] + ' ' +
                        'z';

                return path;
            };
        },
        generateGetBarPoints: function (barIndices, isSub) {
            var $$ = this,
                axis = isSub ? $$.subXAxis : $$.xAxis,
                barTargetsNum = barIndices.__max__ + 1,
                barW = $$.getBarW(axis, barTargetsNum),
                barX = $$.getShapeX(barW, barTargetsNum, barIndices, !!isSub),
                barY = $$.getShapeY(!!isSub),
                barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub),
                yScale = isSub ? $$.getSubYScale : $$.getYScale;

            return function (d, i) {
                var y0 = yScale.call($$, d.id)(0),
                    offset = barOffset(d, i) || y0, // offset is for stacked bar chart
                    posX = barX(d), posY = barY(d);

                // fix posY not to overflow opposite quadrant
                if ($$.config.axis_rotated) {
                    if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }
                }

                // 4 points that make a bar
                return [
                    [posX, offset],
                    [posX, posY - (y0 - offset)],
                    [posX + barW, posY - (y0 - offset)],
                    [posX + barW, offset]
                ];
            };
        },
        isWithinBar: function (that) {
            var mouse = this.d3.mouse(that), box = that.getBoundingClientRect(),
                seg0 = that.pathSegList.getItem(0), seg1 = that.pathSegList.getItem(1),
                x = Math.min(seg0.x, seg1.x), y = Math.min(seg0.y, seg1.y),
                w = box.width, h = box.height, offset = 2,
                sx = x - offset, ex = x + w + offset, sy = y + h + offset, ey = y - offset;
            return sx < mouse[0] && mouse[0] < ex && ey < mouse[1] && mouse[1] < sy;
        },
        classBar: function (d) {
            return this.classShape(d) + this.generateClass(this.CLASS.bar, d.index);
        },
        classBars: function (d) {
            return this.classShapes(d) + this.generateClass(this.CLASS.bars, d.id);
        },
        barData: function (d) {
            return this.isBarType(d) ? d.values : [];
        },
        isBarType: function (d) {
            var id = utility.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'bar';
        }
    };
}

C3Bar.prototype = {

};

c3.register("bar", [Axis, Grid, Region, Legend, Text], {
    CLASS: {
        chartBar: 'c3-chart-bar',
        chartBars: 'c3-chart-bars',
        bar: 'c3-bar',
        bars: 'c3-bars'
    },
    config: {
        bar: {
            width: {
                ratio: 0.6,
                max: undefined,
            },
            zerobased: true,
            corners: false,
            focus: "full",
            onmouseover: undefined,
            onmouseout: undefined,
        }
    },
    exceptElements: []
}, C3Bar);

module.exports = c3;