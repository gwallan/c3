var _ = require("underscore");
var utility = require("./utility");

// Features:
// 1. category axis
// 2. ceil values of translate/x/y to int for half pixel antialiasing
// 3. multiline tick text
var tickTextCharSize;

function c3_axis(d3, params, c3) {
    var scale = d3.scale.linear(), orient = "bottom", innerTickSize = 6, outerTickSize, tickPadding = 9, tickValues = null, tickFormat, tickArguments;
    var tickOffset = 0, tickCulling = true, tickCentered;
    var config = c3.config;

    params = params || {};
    outerTickSize = params.withOuterTick ? 6 : 0;
    tickPadding = config.axis_x_tick_padding || tickPadding;

    function axisX(selection, x) {
        selection.attr("transform", function (d) {
            return "translate(" + Math.ceil(x(d) + tickOffset) + ", 0)";
        });
    }
    function axisY(selection, y) {
        selection.attr("transform", function (d) {
            return "translate(0," + Math.ceil(y(d)) + ")";
        });
    }
    function scaleExtent(domain) {
        var start = domain[0], stop = domain[domain.length - 1];
        return start < stop ? [start, stop] : [stop, start];
    }
    function generateTicks(scale) {
        var i, domain, ticks = [];

        if (scale.ticks) {
            // if(orient == "bottom"){
            //     ticks = scale.ticks.apply(scale, tickArguments);
            //     ticks.shift();
            //     return ticks;
            // }

            return scale.ticks.apply(scale, tickArguments);
        }

        domain = scale.domain();
        for (i = Math.ceil(domain[0]) ; i < domain[1]; i++) {
            ticks.push(i);
        }
        if (ticks.length > 0 && ticks[0] > 0) {
            ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
        }
        return ticks;
    }
    function copyScale() {
        var newScale = scale.copy(), domain;
        if (params.isCategory) {
            domain = scale.domain();
            newScale.domain([domain[0], domain[1] - 1]);
        }
        return newScale;
    }
    function textFormatted(v, i) {
        // var formatted = tickFormat ? tickFormat(c3.config.axis_x_tick_values ? c3.config.axis_x_tick_values[i] || v :  v) : v;
        var formatted = tickFormat ? tickFormat(v) : v;
        return typeof formatted !== 'undefined' ? formatted : '';
    }
    function getSizeFor1Char(tick) {
        // if (tickTextCharSize) {
        //     return tickTextCharSize;
        // }
        var size = {
            w: 12,
            h: 12
        };
        tick.select('text').text(textFormatted).each(function (d) {
            var box = this.getBoundingClientRect(),
                text = textFormatted(d),
                h = box.height,
                w = text ? (box.width / text.length) : undefined;
            if (h && w) {
                size.h = h;
                size.w = w;
            }
        }).text('');

        tickTextCharSize = size;
        return size;
    }
    function getSizeForText(tick, text){
        var size = {
            h: 12,
            w: 12
        };

        tick.text(text).each(function (d) {
            var box = this.getBoundingClientRect(),
                text = textFormatted(d),
                h = box.height,
                w = text ? (box.width / text.length) : undefined;
            if (h && w) {
                size.h = h;
                size.w = w;
            }
        }).text('');
        tick.remove();

        return size;
    }
    function transitionise(selection) {
        return params.withoutTransition ? selection : d3.transition(selection);
    }
    function axis(g) {
        g.each(function () {
            var g = axis.g = d3.select(this);
            var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = copyScale();
            var ticks = tickValues ? tickValues : generateTicks(scale1),
                tick = g.selectAll(".tick").data(ticks, scale1),
                tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1e-6),
                // MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
                tickExit = tick.exit().remove(),
                tickUpdate = transitionise(tick).style("opacity", 1),
                tickTransform, tickX, tickY;
            var range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range()),
                path = g.selectAll(".domain").data([0]),
                pathUpdate = (path.enter().append("path").attr("class", "domain"), transitionise(path));

            tickEnter.append("line");
            tickEnter.append("text");

            var lineEnter = tickEnter.select("line"),
                lineUpdate = tickUpdate.select("line"),
                textEnter = tickEnter.select("text"),
                textUpdate = tickUpdate.select("text");

            if (params.isCategory) {
                tickOffset = Math.ceil((scale1(1) - scale1(0)) / 2);
                tickX = tickCentered ? 0 : tickOffset;
                tickY = tickCentered ? tickOffset : 0;
            } else {
                tickOffset = tickX = 0;
            }

            var text, tspan, sizeFor1Char = getSizeFor1Char(g.select('.tick')), counts = [];
            var tickLength = Math.max(innerTickSize, 0) + tickPadding,
                isVertical = orient === 'left' || orient === 'right',
                ticksWidth = 0;

            // this should be called only when category axis
            function splitTickText(d, i, maxWidth) {
                var tickText = textFormatted(d, i),
                    subtext, spaceIndex, textWidth, splitted = [];

                if (Object.prototype.toString.call(tickText) === "[object Array]") {
                    return tickText;
                }

                if (!maxWidth || maxWidth <= 0) {
                    maxWidth = isVertical ? 95 : params.isCategory ? (Math.ceil(scale1(ticks[1]) - scale1(ticks[0])) - 12) : 110;
                }

                function split(splitted, text) {
                    spaceIndex = undefined;
                    for (var i = 1; i < text.length; i++) {
                        if (text.charAt(i) === ' ') {
                            spaceIndex = i;
                        }
                        subtext = text.substr(0, i + 1);
                        //sizeFor1Char.w * subtext.length;
                        textWidth = getSizeForText(g.append("text").attr("class", "tick"), subtext).w;
                        // if text width gets over tick width, split by space index or crrent index
                        if (maxWidth < textWidth) {
                            return split(
                                splitted.concat(text.substr(0, spaceIndex ? spaceIndex : i)),
                                text.slice(spaceIndex ? spaceIndex + 1 : i)
                            );
                        }
                    }
                    return splitted.concat(text);
                }

                return split(splitted, tickText + "");
            }

            function tspanDy(d, i) {
                var dy = sizeFor1Char.h;
                if (i === 0) {
                    if (orient === 'left' || orient === 'right') {
                        dy = -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3);
                    } else {
                        dy = ".71em";
                    }
                }
                return dy;
            }

            function tickSize(d) {
                var tickPosition = scale(d) + (tickCentered ? 0 : tickOffset);
                return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
            }

            text = tick.select("text");
            tspan = text.selectAll('tspan')
                .data(function (d, i) {
                    // if(orient == "bottom"){
                    //     debugger
                    // }
                    //typeof d == "number" ? Math.round(d) :
                    var v = orient == "bottom" ?
                        (c3.config.axis_x_tick_values && c3.config.axis_x_tick_values[i] ? c3.config.axis_x_tick_values[i] : d) :
                        c3.yAxisTickValues ? c3.yAxisTickValues[i] : d;
                    var splitted = params.tickMultiline ?
                        splitTickText(c3.config.axis_x_type == "timeseries" ? new Date(v) : v, i, params.tickWivth) :
                        [].concat(textFormatted(d, i));

                    counts[i] = splitted.length;

                    return splitted.map(function (s) {
                        if(orient == "bottom")ticksWidth += (s ? s.length*sizeFor1Char.w : 0);
                        return { index: i, splitted: s};
                    });
                });
            tspan.enter().append('tspan');
            tspan.exit().remove();
            tspan.text(function (d, i, j) {
                if(orient == "left" && config.axis_y_tick_orient && d.splitted == 0)
                    return "";
                return d.splitted;
                // else if(orient == "bottom"){
                //     return c3.xMax - 20 < ticksWidth && j%2 == 0 ? "" : d.splitted;
                // }else
                //     return d.splitted;
            });

            var rotate = params.tickTextRotate;

            function textAnchorForText(rotate) {
                if (!rotate) {
                    return 'middle';
                }
                return rotate > 0 ? "start" : "end";
            }
            function textTransform(rotate) {
                if (!rotate) {
                    return '';
                }
                return "rotate(" + rotate + ")";
            }
            function dxForText(rotate) {
                if (!rotate) {
                    return 0;
                }
                return 8 * Math.sin(Math.PI * (rotate / 180));
            }
            function yForText(rotate) {
                if (!rotate) {
                    return tickLength;
                }
                return 11.5 - 2.5 * (rotate / 15) * (rotate > 0 ? 1 : -1);
            }

            switch (orient) {
                case "bottom":
                    {
                        tickTransform = axisX;
                        lineEnter.attr("y2", innerTickSize);
                        textEnter.attr("y", tickLength);
                        lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", tickSize);
                        textUpdate.attr("x", 0).attr("y", yForText(rotate))
                            .style("text-anchor", textAnchorForText(rotate))
                            .attr("transform", textTransform(rotate));
                        //  shgga 将 dx 加到 x 属性上.
                        // tspan.attr('x', config.axis_x_tick_alignment ? tickX : 0).attr("dy", tspanDy).attr('dx', dxForText(rotate));
                        tspan.attr('x', (config.axis_x_tick_alignment ? tickX : 0) + dxForText(rotate)).attr("dy", tspanDy);
                        //X轴首尾显示刻度标记
                        pathUpdate.attr("d", "M" + range[0] + "," + (config.axis_x_tick_mark ? outerTickSize : 0) + "V0H" + range[1] + "V" + (config.axis_x_tick_mark ? outerTickSize : 0));

                        if(config.axis_x_tick_zero && config.axis_x_type == "categorized"){
                            g.append("g")
                                .attr("transform", "translate(0, 0)")
                                .attr("class", "tick")
                                .append("text")
                                .attr("y", 16)
                                .attr("x", -2)
                                .text("0");
                        }
                        break;
                    }
                case "top":
                    {
                        // TODO: rotated tick text
                        tickTransform = axisX;
                        lineEnter.attr("y2", -innerTickSize);
                        textEnter.attr("y", -tickLength);
                        lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);
                        textUpdate.attr("x", 0).attr("y", -tickLength);
                        text.style("text-anchor", "middle");
                        tspan.attr('x', 0).attr("dy", "0em");
                        pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
                        break;
                    }
                case "left":
                    {
                        tickTransform = axisY;
                        //Y轴刻度显示方向反转
                        if(config.axis_y_tick_orient){
                            lineEnter.attr("x2", config.axis_y_tick_width || innerTickSize);
                            textEnter.attr("x", tickLength);
                            lineUpdate.attr("x2", config.axis_y_tick_width || innerTickSize).attr("y1", tickY).attr("y2", tickY);
                            textUpdate.attr("x", tickLength).attr("y", tickOffset);
                            text.style("text-anchor", "start");
                            tspan.attr('x', (config.axis_y_tick_width || innerTickSize) + 1).attr("dy", tspanDy);
                            pathUpdate.attr("d", "M" + (config.axis_y_tick_width || outerTickSize) + "," + range[0] + "H0V" + range[1] + "H" + (config.axis_y_tick_width || outerTickSize));
                        }else{
                            lineEnter.attr("x2", -(config.axis_y_tick_width || innerTickSize));
                            textEnter.attr("x", -tickLength - 5);
                            lineUpdate.attr("x2", -(config.axis_y_tick_width || innerTickSize)).attr("y1", tickY).attr("y2", tickY);
                            textUpdate.attr("x", -tickLength - 5).attr("y", tickOffset);
                            text.style("text-anchor", "end");
                            tspan.attr('x', -tickLength - 5).attr("dy", tspanDy);
                            pathUpdate.attr("d", "M" + (config.axis_y_tick_mark ? -(config.axis_y_tick_width || outerTickSize) : 0) + "," + range[0] + "H0V" + range[1] + "H" + -(config.axis_y_tick_width || outerTickSize));
                        }
                        break;
                    }
                case "right":
                    {
                        tickTransform = axisY;
                        lineEnter.attr("x2", innerTickSize);
                        textEnter.attr("x", tickLength);
                        lineUpdate.attr("x2", innerTickSize).attr("y2", 0);
                        textUpdate.attr("x", tickLength).attr("y", 0);
                        text.style("text-anchor", "start");
                        tspan.attr('x', tickLength).attr("dy", tspanDy);
                        pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize);
                        break;
                    }
            }

            if (scale1.rangeBand) {
                var x = scale1, dx = x.rangeBand() / 2;
                scale0 = scale1 = function (d) {
                    return x(d) + dx;
                };
            } else if (scale0.rangeBand) {
                scale0 = scale1;
            } else {
                tickExit.call(tickTransform, scale1);
            }
            tickEnter.call(tickTransform, scale0);
            tickUpdate.call(tickTransform, scale1);
        });
    }
    axis.scale = function (x) {
        if (!arguments.length) { return scale; }
        scale = x;
        return axis;
    };
    axis.orient = function (x) {
        if (!arguments.length) { return orient; }
        orient = x in { top: 1, right: 1, bottom: 1, left: 1 } ? x + "" : "bottom";
        return axis;
    };
    axis.tickFormat = function (format) {
        if (!arguments.length) { return tickFormat; }
        tickFormat = format;
        return axis;
    };
    axis.tickCentered = function (isCentered) {
        if (!arguments.length) { return tickCentered; }
        tickCentered = isCentered;
        return axis;
    };
    axis.tickOffset = function () {
        return tickOffset;
    };
    axis.tickInterval = function () {
        var interval, length;
        if (params.isCategory) {
            interval = tickOffset * 2;
        }else {
            length = axis.g.select('path.domain').node().getTotalLength() - outerTickSize * 2;
            interval = length / axis.g.selectAll('line').size();
        }
        // return 0;
        return interval === Infinity ? 0 : interval;
    };
    axis.ticks = function () {
        if (!arguments.length) { return tickArguments; }
        tickArguments = arguments;
        return axis;
    };
    axis.tickCulling = function (culling) {
        if (!arguments.length) { return tickCulling; }
        tickCulling = culling;
        return axis;
    };
    axis.tickValues = function (x) {
        if (typeof x === 'function') {
            tickValues = function () {
                return x(scale.domain());
            };
        }
        else {
            if (!arguments.length) { return tickValues; }
            tickValues = x;
        }
        // if(tickValues && tickValues.length && tickValues[tickValues.length - 1] == "0.08"){debugger}
        return axis;
    };
    return axis;
}

function Axis(owner){
    this.owner = owner;

    owner.config = _.extend(owner.config, owner.convert({
        axis: {
            rotated: false,
            x: {
                show: true,
                type: 'indexed',
                localtime: true,
                categories: [],
                max: undefined,
                min: undefined,
                height: undefined,
                extent: undefined,
                label: null,
                padding: {},
                tick: {
                    responsive: false,
                    centered: false,
                    format: undefined,
                    culling: {},
                    culling_max: null,
                    count: undefined,
                    fit: true,
                    values: [],
                    rotate: 0,
                    outer: true,
                    multiline: true,
                    width: null,
                    mark: false,//是否显示X轴两端刻度
                    alignment: false,//是否X轴标签与刻度对齐
                    zero: false,//是否显示X轴0刻度
                    padding: 9,//轴文本显示间距
                },
            },
            y: {
                show: true,
                type: undefined,
                max: undefined,
                min: undefined,
                inverted: false,
                center: undefined,
                inner: undefined,
                label: null,
                offset: true,
                padding: {},
                default: undefined,
                tick: {
                    orient: false,
                    mark: true,
                    width: 0,
                    format: undefined,
                    outer: true,
                    values: null,
                    count: undefined,
                    time: {
                        value: undefined,
                        interval: undefined,
                    }
                }
            },
            y2: {
                show: false,
                max: undefined,
                min: undefined,
                inverted: false,
                center: undefined,
                inner: undefined,
                default: undefined,
                label: {},
                padding: {},
                tick: {
                    format: undefined,
                    outer: true,
                    values: null,
                    count: undefined,
                }
            }
        }
    }));
    owner.CLASS = _.extend(owner.CLASS, {
        axis: 'c3-axis',
        axisX: 'c3-axis-x',
        axisXLabel: 'c3-axis-x-label',
        axisY: 'c3-axis-y',
        axisYLabel: 'c3-axis-y-label',
        axisY2: 'c3-axis-y2',
        axisY2Label: 'c3-axis-y2-label'
    });

    owner.axis = {
        init: function init() {
            var $$ = owner, config = $$.config, main = $$.main;

            $$.axes.x = main.append("g")
                .attr("class", $$.CLASS.axis + ' ' + $$.CLASS.axisX)
                // .attr("clip-path", $$.clipPathForXAxis)
                .attr("transform", $$.getTranslate('x'))
                .style("visibility", config.axis_x_show ? 'visible' : 'hidden');
            $$.axes.x.append("text")
                .attr("class", $$.CLASS.axisXLabel)
                // .attr("transform", config.axis_rotated ? "rotate(-90)" : "")
                .style("text-anchor", this.textAnchorForXAxisLabel.bind(this));
            $$.axes.y = main.append("g")
                .attr("class", $$.CLASS.axis + ' ' + $$.CLASS.axisY)
                // .attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis)
                .attr("transform", $$.getTranslate('y'))
                .style("visibility", config.axis_y_show ? 'visible' : 'hidden');
            $$.axes.y.append("text")
                .attr("class", $$.CLASS.axisYLabel)
                // .attr("transform", config.axis_rotated ? "" : "rotate(-90)")
                .style("text-anchor", this.textAnchorForYAxisLabel.bind(this));

            $$.axes.y2 = main.append("g")
                .attr("class", $$.CLASS.axis + ' ' + $$.CLASS.axisY2)
                // clip-path?
                .attr("transform", $$.getTranslate('y2'))
                .style("visibility", config.axis_y2_show ? 'visible' : 'hidden');
            $$.axes.y2.append("text")
                .attr("class", $$.CLASS.axisY2Label)
                .attr("transform", config.axis_rotated ? "" : "rotate(-90)")
                .style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
        },
        getXAxis: function getXAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
            var $$ = owner, config = $$.config,
                axisParams = {
                    isCategory: $$.isCategorized(),
                    withOuterTick: withOuterTick,
                    tickMultiline: config.axis_x_tick_multiline,
                    tickWidth: config.axis_x_tick_width,
                    tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
                    withoutTransition: withoutTransition,
                },
                axis = c3_axis($$.d3, axisParams, $$).scale(scale).orient(orient);

            if(axisParams.isCategory && tickValues){

            }
            if ($$.isTimeSeries() && tickValues) {
                tickValues = tickValues.map(function (v) { return $$.parseDate(v); });
            }

            // Set tick
            axis.tickFormat(tickFormat).tickValues(tickValues);
            if ($$.isCategorized()) {
                axis.tickCentered(config.axis_x_tick_centered);
                if (utility.isEmpty(config.axis_x_tick_culling)) {
                    config.axis_x_tick_culling = false;
                }
            }

            return axis;
        },
        updateXAxisTickValues: function updateXAxisTickValues(targets, axis) {
            var $$ = owner, config = $$.config, tickValues;

            if (config.axis_x_tick_fit || config.axis_x_tick_count) {
                tickValues = this.generateTickValues($$.mapTargetsToUniqueXs(targets), config.axis_x_tick_count, $$.isTimeSeries(), config.axis_x_tick_format);
                // tickValues = this.generateTickValues($$.xAxisTickValues, config.axis_x_tick_count, $$.isTimeSeries());
            }
            if (axis) {
                axis.tickValues(tickValues);
            } else {
                $$.xAxis.tickValues(tickValues);
                $$.subXAxis.tickValues(tickValues);
            }

            return tickValues;
        },
        getYAxis: function getYAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition) {
            var axisParams = {
                withOuterTick: withOuterTick,
                withoutTransition: withoutTransition,
            },
                $$ = owner,
                d3 = $$.d3,
                config = $$.config,
                axis = c3_axis(d3, axisParams, $$).scale(scale).orient(orient).tickFormat(tickFormat);
            if ($$.isTimeSeriesY()) {
                axis.ticks(d3.time[config.axis_y_tick_time_value], config.axis_y_tick_time_interval);
            } else {
                axis.tickValues(tickValues);
            }
            return axis;
        },
        getId: function getId(id) {
            var config = owner.config;
            return id in config.data_axes ? config.data_axes[id] : 'y';
        },
        getXAxisTickFormat: function getXAxisTickFormat() {
            var $$ = owner, config = $$.config,
                format = $$.isTimeSeries() ? $$.defaultAxisTimeFormat : $$.isCategorized() ? $$.categoryName : function (v) { return v < 0 ? v.toFixed(0) : v; };

            if (config.axis_x_tick_format) {
                if (utility.isFunction(config.axis_x_tick_format)) {
                    format = config.axis_x_tick_format;
                    // return function (v) { return config.axis_x_tick_format.call($$, v, format.call($$, v)); }
                } else if ($$.isTimeSeries()) {
                    format = function (date) {
                        return date ? $$.axisTimeFormat(config.axis_x_tick_format)(date) : "";
                    };
                    // return function (v) { return format.call($$, v); };
                }
            }
            return utility.isFunction(format) ? function (v) { return format.call($$, v); } : format;
        },
        getTickValues: function getTickValues(tickValues, axis) {
            return tickValues ? tickValues : axis ? axis.tickValues() : undefined;
        },
        getXAxisTickValues: function getXAxisTickValues() {
            return this.getTickValues(owner.config.axis_x_tick_values, owner.xAxis);
        },
        getYAxisTickValues: function getYAxisTickValues() {
            return this.getTickValues(owner.config.axis_y_tick_values, owner.yAxis);
        },
        getY2AxisTickValues: function getY2AxisTickValues() {
            return this.getTickValues(owner.config.axis_y2_tick_values, owner.y2Axis);
        },
        getLabelOptionByAxisId: function getLabelOptionByAxisId(axisId) {
            var $$ = owner, config = $$.config, option;
            if (axisId === 'y') {
                option = config.axis_y_label;
            } else if (axisId === 'y2') {
                option = config.axis_y2_label;
            } else if (axisId === 'x') {
                option = config.axis_x_label;
            }
            return option;
        },
        getLabelText: function getLabelText(axisId) {
            var option = this.getLabelOptionByAxisId(axisId);
            return utility.isString(option) ? option : option ? option.text : null;
        },
        setLabelText: function setLabelText(axisId, text) {
            var $$ = owner, config = $$.config,
                option = this.getLabelOptionByAxisId(axisId);
            if (utility.isString(option)) {
                if (axisId === 'y') {
                    config.axis_y_label = text;
                } else if (axisId === 'y2') {
                    config.axis_y2_label = text;
                } else if (axisId === 'x') {
                    config.axis_x_label = text;
                }
            } else if (option) {
                option.text = text;
            }
        },
        getLabelPosition: function getLabelPosition(axisId, defaultPosition) {
            var option = this.getLabelOptionByAxisId(axisId),
                position = (option && typeof option === 'object' && option.position) ? option.position : defaultPosition;

            return {
                isInner: position.indexOf('inner') >= 0,
                isOuter: position.indexOf('outer') >= 0,
                isLeft: position.indexOf('left') >= 0,
                isCenter: position.indexOf('center') >= 0,
                isRight: position.indexOf('right') >= 0,
                isTop: position.indexOf('top') >= 0,
                isMiddle: position.indexOf('middle') >= 0,
                isBottom: position.indexOf('bottom') >= 0
            };
        },
        getXAxisLabelPosition: function getXAxisLabelPosition() {
            return this.getLabelPosition('x', owner.config.axis_rotated ? 'inner-top' : 'inner-right');
        },
        getYAxisLabelPosition: function getYAxisLabelPosition() {
            return this.getLabelPosition('y', owner.config.axis_rotated ? 'inner-right' : 'inner-top');
        },
        getY2AxisLabelPosition: function getY2AxisLabelPosition() {
            return this.getLabelPosition('y2', owner.config.axis_rotated ? 'inner-right' : 'inner-top');
        },
        getLabelPositionById: function getLabelPositionById(id) {
            return id === 'y2' ? this.getY2AxisLabelPosition() : id === 'y' ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition();
        },
        textForXAxisLabel: function textForXAxisLabel() {
            return this.getLabelText('x');
        },
        textForYAxisLabel: function textForYAxisLabel() {
            return this.getLabelText('y');
        },
        textForY2AxisLabel: function textForY2AxisLabel() {
            return this.getLabelText('y2');
        },
        xForAxisLabel: function xForAxisLabel(forHorizontal, position) {
            var $$ = owner;

            if (forHorizontal) {
                return position.isLeft ? 0 : position.isCenter ? $$.width / 2 : $$.width + 10;
            } else {
                // return position.isBottom ? -$$.height : position.isMiddle ? -$$.height / 2 : $$.yLabelRect["w"]/2;
                return $$.xLabelRect["w"]/2;
            }
        },
        dxForAxisLabel: function dxForAxisLabel(forHorizontal, position) {
            if (forHorizontal) {
                // return position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0";
                return !owner.isCategorized() ? "0" : "0.5em";
            } else {
                // return position.isTop ? "-0.5em" : position.isBottom ? "0.5em" : "0";
                return owner.yLabelRect["w"]/2;
            }
        },
        textAnchorForAxisLabel: function textAnchorForAxisLabel(forHorizontal, position) {
            if (forHorizontal) {
                // return position.isLeft ? 'start' : position.isCenter ? 'middle' : 'end';
                return 'end';
            } else {
                // return position.isBottom ? 'start' : position.isend ? 'middle' : 'end';
                return 'end';
            }
        },
        xForXAxisLabel: function xForXAxisLabel() {
            return this.xForAxisLabel(!owner.config.axis_rotated, this.getXAxisLabelPosition());
        },
        yForXAxisLabel: function yForXAxisLabel() {
            var rectX = owner.axes.x.node().getBoundingClientRect();

            if(owner.config.axis_rotated){
                return 5;
            }else{
                return rectX["height"]/4;
            }
        },
        yForYAxisLabel: function yForXAxisLabel() {
            var rectX = owner.axes.x.node().getBoundingClientRect();

            if(owner.config.axis_rotated){
                return owner.yLabelRect["h"]/2;
            }else{
                return 10;
            }
        },
        xForYAxisLabel: function xForYAxisLabel() {
            return this.xForAxisLabel(owner.config.axis_rotated, this.getYAxisLabelPosition());
        },
        xForY2AxisLabel: function xForY2AxisLabel() {
            return this.xForAxisLabel(owner.config.axis_rotated, this.getY2AxisLabelPosition());
        },
        dxForXAxisLabel: function dxForXAxisLabel() {
            return this.dxForAxisLabel(!owner.config.axis_rotated, this.getXAxisLabelPosition());
        },
        dxForYAxisLabel: function dxForYAxisLabel() {
            return this.dxForAxisLabel(owner.config.axis_rotated, this.getYAxisLabelPosition());
        },
        dxForY2AxisLabel: function dxForY2AxisLabel() {
            return this.dxForAxisLabel(owner.config.axis_rotated, this.getY2AxisLabelPosition());
        },
        dyForXAxisLabel: function dyForXAxisLabel() {
            var $$ = owner, config = $$.config,
                position = this.getXAxisLabelPosition();

            if (config.axis_rotated) {
                return position.isInner ? 0 + $$.xLabelRect.h/2 : -25 - this.getMaxTickWidth('x');
            } else {
                return position.isInner ? "-0.5em" : config.axis_x_height ? config.axis_x_height - 10 : "3em";
            }
        },
        dyForYAxisLabel: function dyForYAxisLabel() {
            var $$ = owner,
                position = this.getYAxisLabelPosition();

            if ($$.config.axis_rotated) {
                return position.isInner ? 0 + $$.yLabelRect.h/2 : "3em";
            } else {
                return position.isInner ? "0.8em" : -10 - ($$.config.axis_y_inner ? 0 : (this.getMaxTickWidth('y') + 10));
            }
        },
        dyForY2AxisLabel: function dyForY2AxisLabel() {
            var $$ = owner,
                position = this.getY2AxisLabelPosition();

            if ($$.config.axis_rotated) {
                return position.isInner ? "1.2em" : "-2.2em";
            } else {
                return position.isInner ? "-0.5em" : 15 + ($$.config.axis_y2_inner ? 0 : (this.getMaxTickWidth('y2') + 15));
            }
        },
        textAnchorForXAxisLabel: function textAnchorForXAxisLabel() {
            var $$ = owner;
            return this.textAnchorForAxisLabel(!$$.config.axis_rotated, this.getXAxisLabelPosition());
        },
        textAnchorForYAxisLabel: function textAnchorForYAxisLabel() {
            var $$ = owner;
            return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getYAxisLabelPosition());
        },
        textAnchorForY2AxisLabel: function textAnchorForY2AxisLabel() {
            var $$ = owner;
            return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getY2AxisLabelPosition());
        },
        getMaxTickWidth: function getMaxTickWidth(id, withoutRecompute) {
            var $$ = owner, config = $$.config,
                maxWidth = 0, targetsToShow, scale, axis, dummy, svg;

            if (withoutRecompute && $$.currentMaxTickWidths[id]) {
                return $$.currentMaxTickWidths[id];
            }
            if ($$.svg) {
                targetsToShow = $$.filterTargetsToShow($$.data.targets);
                if (id === 'y') {
                    scale = $$.y.copy().domain($$.getYDomain(targetsToShow, 'y'));
                    axis = this.getYAxis(scale, $$.yOrient, config.axis_y_tick_format, $$.yAxisTickValues, false, true);
                } else if (id === 'y2') {
                    scale = $$.y2.copy().domain($$.getYDomain(targetsToShow, 'y2'));
                    axis = this.getYAxis(scale, $$.y2Orient, config.axis_y2_tick_format, $$.y2AxisTickValues, false, true);
                } else {
                    scale = $$.x.copy().domain($$.getXDomain(targetsToShow));
                    axis = this.getXAxis(scale, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, false, true, true);
                    this.updateXAxisTickValues(targetsToShow, axis);
                }

                dummy = $$.d3
                    .select('body')
                    .append('div')
                    .classed('c3', true);
                svg = dummy
                    .append("svg")
                    .style('visibility', 'hidden')
                    .style('position', 'fixed')
                    .style('top', 0)
                    .style('left', 0);

                svg.append('g').call(axis).each(function () {
                    //上述复制轴逻辑有问题，暂时通过直接获取已经绘制的轴元素来筛选出刻度最大值
                    var target;
                    if(id == "x"){
                        target = ".c3-axis-x";
                    }else if(id == "y"){
                        target = ".c3-axis-y";
                    }
                    $$.svg.select(target).selectAll('text').each(function () {
                        var box = this.getBoundingClientRect();
                        if (maxWidth < box.width) { maxWidth = box.width; }
                    });
                    dummy.remove();
                });
            }
            $$.currentMaxTickWidths[id] = maxWidth <= 0 ? $$.currentMaxTickWidths[id] : maxWidth;

            return $$.currentMaxTickWidths[id];
        },
        updateLabels: function updateLabels(withTransition) {
            var $$ = owner;
            var axisXLabel = $$.main.select('.' + $$.CLASS.axisX + ' .' + $$.CLASS.axisXLabel),
                axisYLabel = $$.main.select('.' + $$.CLASS.axisY + ' .' + $$.CLASS.axisYLabel),
                axisY2Label = $$.main.select('.' + $$.CLASS.axisY2 + ' .' + $$.CLASS.axisY2Label);

            (withTransition ? axisXLabel.transition() : axisXLabel)
                .attr("x", this.xForXAxisLabel.bind(this))
                .attr("y", this.yForXAxisLabel.bind(this))
                // .attr("dx", this.dxForXAxisLabel.bind(this))
                // .attr("dy", this.dyForXAxisLabel.bind(this))
                .text(this.textForXAxisLabel.bind(this));
            (withTransition ? axisYLabel.transition() : axisYLabel)
                .attr("x", this.xForYAxisLabel.bind(this))
                .attr("y", this.yForYAxisLabel.bind(this))
                // .attr("dx", this.dxForYAxisLabel.bind(this))
                // .attr("dy", this.dyForYAxisLabel.bind(this))
                .text(this.textForYAxisLabel.bind(this));
            (withTransition ? axisY2Label.transition() : axisY2Label)
                .attr("x", this.xForY2AxisLabel.bind(this))
                .attr("dx", this.dxForY2AxisLabel.bind(this))
                .attr("dy", this.dyForY2AxisLabel.bind(this))
                .text(this.textForY2AxisLabel.bind(this));
        },
        getPadding: function getPadding(padding, key, defaultValue, domainLength) {
            if (!utility.isValue(padding[key])) {
                return defaultValue;
            }
            if (padding.unit === 'ratio') {
                return padding[key] * domainLength;
            }
            // assume padding is pixels if unit is not specified
            return this.convertPixelsToAxisPadding(padding[key], domainLength);
        },
        convertPixelsToAxisPadding: function convertPixelsToAxisPadding(pixels, domainLength) {
            var $$ = owner,
                length = $$.config.axis_rotated ? $$.width : $$.height;
            return domainLength * (pixels / length);
        },
        generateTickValues: function generateTickValues(values, tickCount, forTimeSeries, format) {
            var $$ = owner, tickValues = values, targetCount, start, end, count, interval, i, tickValue;

            function fix(date, format){
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate(),
                    hour = date.getHours(),
                    minutes = date.getMinutes(),
                    second = date.getSeconds();

                if(utility.isString(format) && format.indexOf("%") > -1){
                    format = format.substr(format.length - 1).toLowerCase();

                    switch(format){
                        case "y":
                            month = 1;
                            day = 1;
                            hour = 0;
                            minutes = 0;
                            second = 0;
                            break;
                        case "m":
                            day = 1;
                            hour = 0;
                            minutes = 0;
                            second = 0;
                            break;
                        case "d":
                            hour = 0;
                            minutes = 0;
                            second = 0;
                            break;
                        case "i":
                            minutes = 0;
                            second = 0;
                            break;
                        case "m":
                            second = 0;
                            break;
                        case "s":
                            break;
                    }

                    return new Date(year, month, day, hour, minutes, second);
                }else{
                    return date;
                }
            }

            if (tickCount) {
                targetCount = utility.isFunction(tickCount) ? tickCount() : tickCount;
                // compute ticks according to tickCount
                if (targetCount === 1) {
                    tickValues = [values[0]];
                } else if (targetCount === 2) {
                    tickValues = [values[0], values[values.length - 1]];
                } else if (targetCount > 2) {
                    count = targetCount - 2;
                    start = values[0];
                    end = values[values.length - 1];
                    interval = (end - start) / (count + 1);
                    // re-construct unique values
                    tickValues = [start];
                    for (i = 0; i < count; i++) {
                        tickValue = +start + interval * (i + 1);
                        tickValues.push(forTimeSeries ? fix(new Date(tickValue), format || "d") : tickValue);
                    }
                    tickValues.push(end);
                }
            }
            if (!forTimeSeries) { tickValues = tickValues.sort(function (a, b) { return a - b; }); }
            return tickValues;
        },
        generateTransitions: function generateTransitions(duration) {
            var $$ = owner, axes = $$.axes;
            return {
                axisX: duration ? axes.x.transition().duration(duration) : axes.x,
                axisY: duration ? axes.y.transition().duration(duration) : axes.y,
                axisY2: duration ? axes.y2.transition().duration(duration) : axes.y2,
                axisSubX: duration ? axes.subx.transition().duration(duration) : axes.subx
            };
        },
        redraw: function redraw(transitions, isHidden) {
            var $$ = owner;

            $$.axes.x.style("opacity", isHidden ? 0 : 1);
            $$.axes.y.style("opacity", isHidden ? 0 : 1);
            $$.axes.y2.style("opacity", isHidden ? 0 : 1);
            $$.axes.subx.style("opacity", isHidden ? 0 : 1);
            transitions.axisX.call($$.xAxis);
            transitions.axisY.call($$.yAxis);
            transitions.axisY2.call($$.y2Axis);
            transitions.axisSubX.call($$.subXAxis);
        }
    }
}

Axis.prototype.initAxis = function(){
    this.axis.init();
};
Axis.prototype.getAxisClipX = function (forHorizontal) {
    // axis line width + padding for left
    var left = Math.max(30, this.margin.left);
    return forHorizontal ? -(1 + left) : -(left - 1);
};
Axis.prototype.getAxisClipY = function (forHorizontal) {
    return forHorizontal ? -20 : -this.margin.top;
};
Axis.prototype.getXAxisClipX = function () {
    var $$ = this;
    return $$.getAxisClipX(!$$.config.axis_rotated);
};
Axis.prototype.getXAxisClipY = function () {
    var $$ = this;
    return $$.getAxisClipY(!$$.config.axis_rotated);
};
Axis.prototype.getYAxisClipX = function () {
    var $$ = this;
    return $$.config.axis_y_inner ? -1 : $$.getAxisClipX($$.config.axis_rotated);
};
Axis.prototype.getYAxisClipY = function () {
    var $$ = this;
    return $$.getAxisClipY($$.config.axis_rotated);
};
Axis.prototype.getAxisClipWidth = function (forHorizontal) {
    var $$ = this,
        left = Math.max(30, $$.margin.left),
        right = Math.max(30, $$.margin.right);
    // width + axis line width + padding for left/right
    return forHorizontal ? $$.width + 2 + left + right : $$.margin.left + 20;
};
Axis.prototype.getAxisClipHeight = function (forHorizontal) {
    // less than 20 is not enough to show the axis label 'outer' without legend
    return (forHorizontal ? this.margin.bottom : (this.margin.top + this.height)) + 20;
};
Axis.prototype.getXAxisClipWidth = function () {
    var $$ = this;
    return $$.getAxisClipWidth(!$$.config.axis_rotated);
};
Axis.prototype.getXAxisClipHeight = function () {
    var $$ = this;
    return $$.getAxisClipHeight(!$$.config.axis_rotated);
};
Axis.prototype.getYAxisClipWidth = function () {
    var $$ = this;
    return $$.getAxisClipWidth($$.config.axis_rotated) + ($$.config.axis_y_inner ? 20 : 0);
};
Axis.prototype.getYAxisClipHeight = function () {
    var $$ = this;
    return $$.getAxisClipHeight($$.config.axis_rotated);
};
Axis.prototype.updateAxis = function(targetsToShow, transitions, options){
    var $$ = this, main = $$.main, d3 = $$.d3, config = $$.config;
    var hideAxis = false;
    var withY, withSubchart, withTransition, withTransitionForExit, withTransitionForAxis,
        withTransform, withUpdateXDomain, withUpdateOrgXDomain, withTrimXDomain,
        withEventRect, withDimension, withUpdateXAxis, xDomainForZoom, tickValues, intervalForCulling;

    withY = utility.getOption(options, "withY", true);
    withTransition = utility.getOption(options, "withTransition", true);
    withTransform = utility.getOption(options, "withTransform", false);
    withUpdateXDomain = utility.getOption(options, "withUpdateXDomain", false);
    withUpdateOrgXDomain = utility.getOption(options, "withUpdateOrgXDomain", false);
    withTrimXDomain = utility.getOption(options, "withTrimXDomain", true);
    withUpdateXAxis = utility.getOption(options, "withUpdateXAxis", withUpdateXDomain);

    // MEMO: needed for grids calculation
    if ($$.isCategorized() && targetsToShow.length === 0) {
        $$.x.domain([0, $$.axes.x.selectAll('.tick').size()]);
    }

    if (targetsToShow.length) {
        $$.updateXDomain(targetsToShow, withUpdateXDomain, withUpdateOrgXDomain, withTrimXDomain);

        //始终获得X轴刻度值,在绘制刻度值时替换内容
        tickValues = $$.axis.updateXAxisTickValues(targetsToShow);
    } else {
        $$.xAxis.tickValues([]);
        $$.subXAxis.tickValues([]);
    }

    if (config.zoom_rescale && !options.flow) {
        xDomainForZoom = $$.x.orgDomain();
    }

    $$.y.domain($$.getYDomain(targetsToShow, 'y', xDomainForZoom));
    $$.y2.domain($$.getYDomain(targetsToShow, 'y2', xDomainForZoom));

    if (!config.axis_y_tick_values && config.axis_y_tick_count) {
        $$.yAxis.tickValues($$.axis.generateTickValues($$.y.domain(), config.axis_y_tick_count));
    }
    if (!config.axis_y2_tick_values && config.axis_y2_tick_count) {
        $$.y2Axis.tickValues($$.axis.generateTickValues($$.y2.domain(), config.axis_y2_tick_count));
    }

    // axes
    $$.axis.redraw(transitions, hideAxis);
    // Update axis label
    $$.axis.updateLabels(withTransition);

    // show/hide if manual culling needed
    if ((withUpdateXDomain || withUpdateXAxis) && targetsToShow.length) {
        if(config.axis_x_tick_responsive){
            config.axis_x_tick_culling_max = parseInt($$.width/$$.axis.getMaxTickWidth("x") - 1);
        }
        if (config.axis_x_tick_culling_max && tickValues) {
            for (var i = 1; i < tickValues.length; i++) {
                if (tickValues.length / i < config.axis_x_tick_culling_max) {
                    intervalForCulling = i;
                    break;
                }
            }
            $$.svg.selectAll('.' + $$.CLASS.axisX + ' .tick text').each(function (e) {
                var index = tickValues.indexOf(e);
                if (index >= 0) {
                    d3.select(this).style('display', index % intervalForCulling ? 'none' : 'block');
                }
            });
        } else {
            $$.svg.selectAll('.' + $$.CLASS.axisX + ' .tick text').style('display', 'block');
        }
    }

    // Update sub domain
    if (withY) {
        $$.subY.domain($$.getYDomain(targetsToShow, 'y'));
        $$.subY2.domain($$.getYDomain(targetsToShow, 'y2'));
    }
};
Axis.prototype.getAxisWidthByAxisId = function (id, withoutRecompute) {
    var $$ = this, position = $$.axis.getLabelPositionById(id);

    return $$.axis.getMaxTickWidth(id, withoutRecompute) + (position.isInner ? 20 : 40);
};
Axis.prototype.getHorizontalAxisHeight = function (axisId) {
    var $$ = this, config = $$.config, h = 30;

    if (axisId === 'x' && !config.axis_x_show) { return 8; }
    if (axisId === 'x' && config.axis_x_height) { return config.axis_x_height; }
    if (axisId === 'y' && !config.axis_y_show) { return config.legend_show && !$$.isLegendRight && !$$.isLegendInset ? 10 : 1; }
    if (axisId === 'y2' && !config.axis_y2_show) { return $$.rotated_padding_top; }
    // Calculate x axis height when tick rotated
    if (axisId === 'x' && !config.axis_rotated && config.axis_x_tick_rotate) {
        h = 30 + $$.axis.getMaxTickWidth(axisId) * Math.cos(Math.PI * (90 - config.axis_x_tick_rotate) / 180);
    }
    return h + ($$.axis.getLabelPositionById(axisId).isInner ? 0 : 10) + (axisId === 'y2' ? -10 : 0);
};

module.exports = Axis;