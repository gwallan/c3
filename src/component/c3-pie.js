var c3 = require("../c3"),
    utility = require("../utility"),
    Legend = require("../legend"),
    Tooltip = require("../tooltip"),
    Text = require("../text");

function C3Arc() {
    var self = this;

    return {
        initArc: function () {
            var $$ = this, d3 = $$.d3, config = $$.config;

            $$.pie = d3.layout.pie().value(function (d) {
                return d.values.reduce(function (a, b) { return a + b.value; }, 0);
            });

            if (!config.data_order) {
                $$.pie.sort(null);
            }else if(config.data_order.match(/desc|asc/ig)){
                $$.pie.sort(function(a, b){
                    if(config.data_order == "asc")
                        return a.values[0].value - b.values[0].value;
                    if(config.data_order == "desc")
                        return b.values[0].value - a.values[0].value;
                });
            }

            $$.arcs = $$.main.select('.' + $$.CLASS.chart).append("g")
                .attr("class", $$.CLASS.chartArcs)
                .attr("transform", $$.hasBubbleType() ? "" : $$.getTranslate('arc'));
            $$.arcs.append('text')
                .attr('class', $$.CLASS.chartArcsTitle)
                .style("text-anchor", "middle")
                .text($$.getArcTitle());
        },
        initGauge: function () {
            var $$ = this, d3 = $$.d3, config = $$.config;

            config.legend_show = false;

            $$.arcs = $$.main.select('.' + $$.CLASS.chart).append("g")
                .attr("class", $$.CLASS.chartArcs)
                .attr("transform", $$.hasBubbleType() ? "" : $$.getTranslate('arc'));
            $$.arcs.append('text')
                .attr('class', $$.CLASS.chartArcsTitle)
                .style("text-anchor", "middle")
                .text($$.getArcTitle());

            $$.arcs.append('path')
                .attr("class", $$.CLASS.chartArcsBackground);
            if($$.config.gauge_pointer_show){
                $$.arcs.append("text")
                    .attr("class", $$.CLASS.chartArcsGaugeUnit)
                    .style("text-anchor", "middle")
                    .style("pointer-events", "none");
            }
            $$.arcs.append("g")
                .attr("class", $$.CLASS.chartArcsGaugeRanges);
            $$.arcs.append("g")
                .attr("class", $$.CLASS.chartArcsGaugeTicks);
            if($$.config.gauge_pointer_show){
                $$.arcs.append("g")
                    .attr("class", $$.CLASS.chartArcsGaugePointer);
            }

            // $$.arcs.append("text")
            //     .attr("class", $$.CLASS.chartArcsGaugeMin)
            //     .style("text-anchor", "middle")
            //     .style("pointer-events", "none");
            // $$.arcs.append("text")
            //     .attr("class", $$.CLASS.chartArcsGaugeMax)
            //     .style("text-anchor", "middle")
            //     .style("pointer-events", "none");
        },
        isNoneArc: function (d) {
            return this.hasTarget(this.data.targets, d.id);
        },
        isArc: function (d) {
            return 'data' in d && this.hasTarget(this.data.targets, d.data.id);
        },
        isPieType: function (d) {
            var id = utility.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'pie';
        },
        isGaugeType: function (d) {
            var id = utility.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'gauge';
        },
        isDonutType: function (d) {
            var id = utility.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'donut';
        },
        isArcType: function (d) {
            return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d);
        },
        hasArcType: function (targets) {
            return this.hasType('pie', targets) || this.hasType('donut', targets) || this.hasType('gauge', targets);// || this.hasType('tree', targets);
        },
        hasBubbleType: function (targets) {
            return this.hasType('bubble', targets);
        },
        hasGaugeType: function (targets) {
            return this.hasType('gauge', targets);
        },
        arcData: function (d, i) {
            // return this.isArcType(d.data) ? [d] : [];
            if (this.isArcType(d.data)) {
                if (this.config.donut_stack_enabled) {
                    if (i < this.config.donut_stack_count)
                        return [d];
                    return [];
                } else {
                    return [d];
                }
            }

            return [];
        },
        updateRadius: function () {
            var $$ = this, config = $$.config,
                w = config.gauge_width || config.donut_width;

            $$.radiusExpanded = ($$.hasType('pie') && !config.pie_split) || ($$.hasType('donut') && !config.donut_split) ? Math.min($$.arcWidth, $$.arcHeight) / 2 : Math.min($$.arcHeight/2, $$.arcWidth/$$.data.targets.length/2) - 20;
            $$.radius = $$.radiusExpanded * ( config.pie_label_position == 'extend' || config.donut_label_position == 'extend' ? 0.75 : 0.95);
            $$.innerRadiusRatio = w ? ($$.radius - w) / $$.radius : 0.6;
            $$.innerRadius = $$.hasType('donut') || $$.hasType('gauge') ? $$.radius * $$.innerRadiusRatio : 0;
        },
        updateArc: function () {
            var $$ = this;

            $$.svgArc = $$.getSvgArc();
            $$.svgArcExpanded = $$.getSvgArcExpanded();
            $$.svgArcExpandedSub = $$.getSvgArcExpanded(0.98);
        },
        updateAngle: function (d) {
            var $$ = this, config = $$.config,
                found = false, index = 0,
                gMin = config.gauge_min, gMax = config.gauge_max, gTic, gValue;

            $$.pie($$.filterTargetsToShow($$.data.targets)).forEach(function (t) {
                if (!found && t.data.id === d.data.id) {
                    found = true;
                    d = t;
                    d.index = index;
                }
                index++;
            });
            if (isNaN(d.startAngle)) {
                d.startAngle = 0;
            }
            if (isNaN(d.endAngle)) {
                d.endAngle = d.startAngle;
            }
            if ($$.isGaugeType(d.data)) {
                gTic = (Math.PI) / (gMax - gMin);
                gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : (gMax - gMin);
                d.startAngle = -1 * (Math.PI / 2);
                d.endAngle = d.startAngle + gTic * gValue;
            }
            return found ? d : null;
        },
        getSvgArc: function (){
            var $$ = this,
                arc = $$.d3.svg.arc().outerRadius($$.radius).innerRadius($$.innerRadius),
                newArc = function (d, withoutUpdate) {
                    var innerRadius = $$.innerRadius, radius = $$.radius, updated = d, attrD;

                    !withoutUpdate && (updated = $$.updateAngle(d));

                    if ($$.config.donut_stack_enabled) {
                        $$.innerRadius -= $$.config.donut_width * updated.index;
                        $$.radius -= $$.config.donut_width * updated.index;

                        arc.outerRadius($$.radius)
                            .innerRadius($$.innerRadius)
                            .startAngle(function (d) { return Math.PI*2 - (d.endAngle - d.startAngle); })
                            .endAngle(function (d) { return Math.PI*2; });//Math.PI/2
                    }

                    if (withoutUpdate) {
                        attrD = arc(updated);
                    } else {
                        if (updated) {
                            attrD = arc(updated);
                        } else {
                            attrD = "M 0 0";
                        }
                    }

                    arc.outerRadius($$.radius).innerRadius($$.innerRadius);
                    $$.innerRadius = innerRadius;
                    $$.radius = radius;

                    return attrD;
                };

            newArc.centroid = arc.centroid;
            newArc.innerRadius = arc.innerRadius;
            newArc.outerRadius = arc.outerRadius;

            return newArc;
        },
        getSvgArcExpanded: function (rate) {
            var $$ = this,
                arc = $$.d3.svg.arc().outerRadius($$.radiusExpanded * (rate ? rate : 1)).innerRadius($$.innerRadius);

            return function (d) {
                var innerRadius = $$.innerRadius, radius = $$.radius, updated = $$.updateAngle(d);

                if ($$.config.donut_stack_enabled) {
                    $$.innerRadius -= $$.config.donut_width * updated.index;
                    $$.radius -= $$.config.donut_width * updated.index;

                    arc.outerRadius($$.radius)
                    .innerRadius($$.innerRadius)
                    .startAngle(function (d) { return Math.PI*2 - (d.endAngle - d.startAngle); })
                    .endAngle(function (d) { return Math.PI*2; });
                }

                arc.outerRadius($$.radius*1.01).innerRadius($$.innerRadius*0.99);
                $$.innerRadius = innerRadius;
                $$.radius = radius;

                return updated ? arc(updated) : "M 0 0";
            };
        },
        getArc: function (d, withoutUpdate, force) {
            return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
        },
        transformForArcLabel: function (d) {
            var $$ = this,
                radius = $$.radius, updated, c, x, y, h, ratio, translate = "";

            function midAngle(d){
                return d.startAngle + (d.endAngle - d.startAngle)/2;
            }

            updated = $$.updateAngle(d);
            if (($$.config.pie_split || $$.config.donut_split) && ($$.hasType('pie') || $$.hasType('donut'))) {
                translate = "translate(0, 0)";
            } else if (updated && !$$.hasType('gauge')) {
                if ($$.config.donut_stack_enabled) {
                    updated.startAngle = Math.PI*2 - (updated.endAngle - updated.startAngle);
                    updated.endAngle = Math.PI*2;
                    $$.radius -= $$.config.donut_width * updated.index;
                }

                c = this.svgArc.centroid(updated);
                x = isNaN(c[0]) ? 0 : c[0];
                y = isNaN(c[1]) ? 0 : c[1];
                h = Math.sqrt(x * x + y * y);
                // TODO: ratio should be an option?
                ratio = $$.radius && h ? (36 / $$.radius > 0.375 ? 1.175 - 36 / $$.radius : 0.75) * $$.radius / h : 0;
                translate = "translate(" + (x * ratio) + ',' + (y * ratio) + ")";

                if ($$.config.donut_stack_enabled) {
                    translate = "translate(20" + ',' + (0 - $$.radius + $$.config.donut_width/2) + ")";
                }else if($$.config.donut_label_position == 'extend' || $$.config.pie_label_position == 'extend'){
                    var factor = $$.config.data_type == "donut" ? 1.35 : 2.15;
                    var arc = $$.d3.svg.arc().outerRadius($$.radius * factor).innerRadius($$.innerRadius * factor);
                    var pos = arc.centroid(updated);

                    pos[0] = pos[0] + (55 * (midAngle(updated) < Math.PI ? 1 : -1) );
                    translate = "translate("+ pos +")";
                }
            }

            $$.radius = radius;

            return translate;
        },
        getArcRatio: function (d) {
            var $$ = this,
                whole = $$.hasType('gauge') ? Math.PI : (Math.PI * 2);
            return d ? (d.endAngle - d.startAngle) / whole : null;
        },
        convertToArcData: function (d) {
            return this.addName({
                id: d.data.id,
                value: d.value,
                ratio: this.getArcRatio(d),
                index: d.index
            });
        },
        textForArcLabel: function (d) {
            var $$ = this, updated, value, ratio, id, format;

            if (!$$.shouldShowArcLabel()) { return ""; }

            updated = $$.updateAngle(d);
            value = updated ? updated.value : null;
            ratio = $$.getArcRatio(updated);
            id = d.data.id;
            if (!$$.hasType('gauge') && !$$.meetsArcLabelThreshold(ratio)) { return ""; }
            format = $$.getArcLabelFormat();

            return format ? format(value, ratio, id) : $$.defaultArcValueFormat(value, ratio);
        },
        textForArcLabelTitle: function (d) {
            var $$ = this, updated, value, ratio, id, format;

            if (!$$.shouldShowArcLabelTitle()) { return ""; }

            updated = $$.updateAngle(d);
            value = updated ? updated.value : null;
            ratio = $$.getArcRatio(updated);

            if (!$$.hasType('gauge') && !$$.meetsArcLabelThreshold(ratio)) { return ""; }
            return d.data.id;
        },
        textForBubbleLabel: function (d) {
            var $$ = this, updated, value, ratio, id, format;

            if (!$$.shouldShowArcLabel()) { return ""; }

            value = d.value;
            id = d.id;
            ratio = value / (d.parent.children.length > 1 ? d.parent.children.reduce(function (a, b) {
                return a.value ? a.value + b.value : a + b.value;
            }) : d.parent.children[0].value);
            format = $$.getArcLabelFormat();

            function wraptext(text) {
                var words = text.split("<br>").reverse(),
                    word,
                    line = [],
                    lineNumber = -1,
                    lineHeight = 1.1;

                if (words.length == 1)
                    return text;

                while (word = words.pop()) {
                    line.push("<tspan x='0' y='0' dy='" + (++lineNumber * lineHeight + "em") + "'>" + word + "</tspan>");
                }
                return line.join("");
            }

            return format ? wraptext(format(value, ratio, id)) : $$.defaultArcValueFormat(value, ratio);
        },
        expandArc: function (targetIds) {
            var $$ = this, interval;

            // MEMO: avoid to cancel transition
            if ($$.transiting) {
                interval = window.setInterval(function () {
                    if (!$$.transiting) {
                        window.clearInterval(interval);
                        if ($$.legend.selectAll('.c3-legend-item-focused').size() > 0) {
                            $$.expandArc(targetIds);
                        }
                    }
                }, 10);
                return;
            }

            targetIds = $$.mapToTargetIds(targetIds);

            if($$.hasType('tree')){
                $$.svg.selectAll("." + $$.CLASS.treeNode)
                    .style("opacity", 0.3);
                $$.svg.selectAll('.' + $$.CLASS.treeNode + "." + targetIds[0])
                    .style("opacity", 1);
            }else{
                $$.svg.selectAll($$.selectorTargets(targetIds, '.' + $$.CLASS.chartArc)).each(function (d) {
                    if (!$$.shouldExpand(d.data.id)) { return; }
                    $$.d3.select(this).selectAll('path:last-child')
                        .transition()
                        .duration(50)
                        .attr("d", $$.svgArcExpanded)
                        .transition()
                        .duration(100)
                        .attr("d", $$.svgArcExpandedSub)
                        .each(function (d) {
                            if ($$.isDonutType(d.data)) {
                                // callback here
                            }
                        });
                });
            }
        },
        unexpandArc: function (targetIds) {
            var $$ = this;

            if ($$.transiting) { return; }

            targetIds = $$.mapToTargetIds(targetIds);

            if($$.hasType('tree')){
                $$.svg.selectAll("." + $$.CLASS.treeNode)
                    .style("opacity", 1);
            }else{
                $$.svg.selectAll($$.selectorTargets(targetIds, '.' + $$.CLASS.chartArc)).selectAll('path:last-child')
                    .transition().duration(50)
                    .attr("d", $$.svgArc);
                $$.svg.selectAll('.' + $$.CLASS.arc)
                    .style("opacity", 1);
            }
        },
        shouldExpand: function (id) {
            var $$ = this, config = $$.config;
            return ($$.isDonutType(id) && config.donut_expand) || ($$.isGaugeType(id) && config.gauge_expand) || ($$.isPieType(id) && config.pie_expand);
        },
        shouldShowArcLabel: function () {
            var $$ = this, config = $$.config, shouldShow = true;

            if ($$.hasType('donut')) {
                shouldShow = config.donut_label_show;
            } else if ($$.hasType('pie')) {
                shouldShow = config.pie_label_show;
            }
            // when gauge or bubble, always true
            return shouldShow;
        },
        shouldShowArcLabelTitle: function () {
            var $$ = this, config = $$.config, shouldShow = true;

            if ($$.hasType('donut')) {
                shouldShow = config.donut_title_show;
            } else if ($$.hasType('pie')) {
                shouldShow = config.pie_title_show;
            }
            // when gauge or bubble, always true
            return shouldShow;
        },
        meetsArcLabelThreshold: function (ratio, index) {
            var $$ = this, config = $$.config,
                threshold = $$.hasType('donut') ? config.donut_label_threshold : config.pie_label_threshold;

            if(config.pie_split || config.donut_split)
                return true;
            else if(config.pie_label_count != -1 || config.donut_label_count != -1)
                return index + 1 > config.pie_label_count || index + 1 > config.donut_label_count ? false : true;
            else
                return ratio >= threshold;
        },
        getArcLabelFormat: function () {
            var $$ = this, config = $$.config,
                format = config.pie_label_format;
            if ($$.hasType('gauge')) {
                format = config.gauge_label_format;
            } else if ($$.hasType('donut')) {
                format = config.donut_label_format;
            } else if ($$.hasType('bubble')) {
                format = config.bubble_label_format;
            }
            return format;
        },
        getArcTitle: function () {
            var $$ = this;
            return $$.hasType('donut') && utility.isString($$.config.donut_title) ? $$.config.donut_title : "";
        },
        updateTargetsForArc: function (targets) {
            var $$ = this, main = $$.main,
                mainPieUpdate, mainPieEnter,
                classChartArc = $$.classChartArc.bind($$),
                classArcs = $$.classArcs.bind($$),
                classFocus = $$.classFocus.bind($$);

            if($$.hasType('gauge'))return;

            mainPieUpdate = main.select('.' + $$.CLASS.chartArcs).selectAll('.' + $$.CLASS.chartArc)
                .data($$.pie(targets))
                .attr("class", function (d) { return classChartArc(d) + classFocus(d.data); });
            mainPieEnter = mainPieUpdate.enter().append("g")
                .attr("class", classChartArc);
            mainPieEnter.append('g')
                .attr('class', classArcs);
            mainPieEnter.append("text")
                .attr("dy", $$.hasType('gauge') ? "-.1em" : ".35em")
                .style("opacity", 0)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
            mainPieEnter.append("text")
                .classed("c3-chart-arc-title", true)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");

            // MEMO: can not keep same color..., but not bad to update color in redraw
            //mainPieUpdate.exit().remove();
        },
        updateTargetsForBubble: function (targets) {
            var $$ = this, main = $$.main,
                mainBubbleUpdate, mainBubbleEnter,
                classChartBubble = $$.classChartBubble.bind($$),
                classBubbles = $$.classBubbles.bind($$),
                classFocus = $$.classFocus.bind($$);

            var root = {
                "children": targets.length > 1 ? targets.reduce(function (a, b) {
                    if (a.values)
                        return a.values.concat(b.values)
                    else
                        return a.concat(b.values);
                }) : targets[0]["values"]
            };
            mainBubbleUpdate = main.select('.' + $$.CLASS.chartArcs).selectAll('.' + $$.CLASS.chartArc)
                .data($$.bubble.nodes(root).filter(function (n) { return !n.children; }))
                .attr("class", function (d) { return classChartBubble(d) + classFocus(d.data); });
            mainBubbleEnter = mainBubbleUpdate.enter().append("g")
                .attr("class", classChartBubble);
            mainBubbleEnter.append('g')
                .attr('class', classBubbles);
            mainBubbleEnter.append("text")
                .attr("dy", $$.hasType('gauge') ? "-.1em" : ".35em")
                .style("opacity", 0)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
        },
        updateTargetsForGauge: function(targets){
            var $$ = this, d3 = $$.d3, config = $$.config, main = $$.main,
                mainArc;
            var data = config.gauge_range, interval = config.gauge_interval;

            if(config.gauge_interval){
                data = config.gauge_range.map(function(r){
                    if(r["end"] - r["start"] < interval)
                        return [r]
                    else{
                        var diff = (r["end"] - r["start"]) / interval, i = 0, arr = [];
                        while(i < diff){
                            arr.push({
                                "start": r["start"] + i * interval,
                                "end": i + 1 != Math.round(diff) ? r["start"] + (i + 1) * interval : r["end"],
                                "color": r["color"]
                            })
                            i++;
                        }
                        return arr;
                    }
                }).reduce(function(resulte, item){
                    resulte = resulte.concat(item);
                    return resulte;
                }, []);
            }

            $$.arcs.select('.' + $$.CLASS.chartArcsGaugePointer)
                .selectAll("path")
                .data(targets[0]["values"])
                .enter()
                .append("path");
            $$.arcs.select('.' + $$.CLASS.chartArcsGaugeUnit)
                .data(targets[0]["values"]);
            $$.arcs.select('.' + $$.CLASS.chartArcsGaugeRanges)
                .selectAll('.' + $$.CLASS.chartArcsGaugeRange)
                .data(data)
                .enter()
                .append("path")
                .attr("class", $$.CLASS.chartArcsGaugeRange);
            $$.arcs.select('.' + $$.CLASS.chartArcsGaugeTicks)
                .selectAll("text")
                .data([{"start": 0, "end": 0}].concat(data))
                .enter()
                .append("text");
        },
        getGaugeLabelHeight: function () {
            return this.config.gauge_label_show ? 20 : 0;
        },
        redrawArc: function (duration, durationForExit, withTransform) {
            var $$ = this, d3 = $$.d3, config = $$.config, main = $$.main,
                mainArc;

            mainArc = main.selectAll('.' + $$.CLASS.arcs).selectAll('.' + $$.CLASS.arc).data($$.arcData.bind($$));

            /* 绘制分组饼图 start */
            if(config.pie_split || config.donut_split){
                main.selectAll("." + $$.CLASS.chartArc).attr("transform", function (d, i) {
                    var len = $$.data.targets.length,
                        transform = "0,0",
                        offset = (($$.width - 20)/len - 2 * $$.radius)/2;

                    transform = ($$.width/2 - 10 - offset*(2*(len - 1 - i) + 1) - $$.radius*(2*(len - 1 - i) + 1)) + ", 0";
                    return "translate(" + transform + ")";
                });
                mainArc.enter()
                    .append('path')
                    .attr("class", $$.classArcFull.bind($$))
                    .style("fill", function (d) {
                        var color = $$.color(d.data);
                        return $$.config.pie_other || $$.config.donut_other ||  d3.rgb(color).brighter(0.8);
                    })
                main.selectAll("." + $$.CLASS.arc + "-full").attr("d", function(d){
                    var _d = d;
                    _d.startAngle = 0;
                    _d.endAngle = Math.PI * 2;

                    return $$.getArc(_d, true);
                });
            }
            /* 绘制分组饼图 end */

            mainArc.enter()
                .append('path')
                .attr("class", $$.classArc.bind($$))
                .style("fill", function (d) { return $$.color(d.data); })
                .style("cursor", function (d) { return config.interaction_enabled && config.data_selection_isselectable(d) ? "pointer" : null; })
                .style("opacity", 0)
                .each(function (d) {
                    var updated = $$.updateAngle(d),
                        arcData = $$.convertToArcData(updated);

                    d.ratio = arcData.ratio;

                    if ($$.isGaugeType(d.data)) {
                        d.startAngle = d.endAngle = -1 * (Math.PI / 2);
                    }
                    this._current = d;
                });
            mainArc
                // .attr("transform", function (d) { return !$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""; })
                .style("opacity", function (d) { return d === this._current ? 0 : 1; })
                .on('mouseover', config.interaction_enabled ? function (d) {
                    var updated, arcData;

                    if ($$.transiting) { // skip while transiting
                        return;
                    }
                    updated = $$.updateAngle(d);
                    arcData = $$.convertToArcData(updated);

                    // transitions
                    $$.expandArc(updated.data.id);
                    $$.api.focus(updated.data.id);
                    $$.toggleFocusLegend(updated.data.id, true);
                    $$.config.data_onmouseover(arcData, this);
                } : null)
                .on('mousemove', config.interaction_enabled ? function (d) {
                    var updated = $$.updateAngle(d),
                        arcData = $$.convertToArcData(updated),
                        selectedData = [arcData];

                    $$.showTooltip(selectedData, this);
                } : null)
                .on('mouseout', config.interaction_enabled ? function (d) {
                    var updated, arcData;
                    if ($$.transiting) { // skip while transiting
                        return;
                    }
                    updated = $$.updateAngle(d);
                    arcData = $$.convertToArcData(updated);
                    // transitions
                    $$.unexpandArc(updated.data.id);
                    $$.api.revert();
                    $$.revertLegend();
                    $$.hideTooltip();
                    $$.config.data_onmouseout(arcData, this);
                } : null)
                .on('click', config.interaction_enabled ? function (d, i) {
                    var updated = $$.updateAngle(d),
                        arcData = $$.convertToArcData(updated);

                    if ($$.toggleShape && !$$.isTouchDevice) { $$.toggleShape(this, arcData, i); }
                    $$.config.data_onclick.call($$.api, arcData, this);
                } : null)
                .each(function () { $$.transiting = true; })
                .transition().duration(duration)
                .attrTween("d", function (d) {
                    var updated = $$.updateAngle(d), interpolate;

                    // d.startAngle = 0;
                    // d.endAngle = 0;

                    if (!updated || !this._current) {
                        return function () { return "M 0 0"; };
                    }
                    if (isNaN(this._current.startAngle)) {
                        this._current.startAngle = 0;
                    }
                    if (isNaN(this._current.endAngle)) {
                        this._current.endAngle = this._current.startAngle;
                    }
                    interpolate = d3.interpolate(this._current, updated);

                    return function (t) {
                        var interpolated = interpolate(t);
                        return $$.getArc((interpolated.data = d.data) && interpolated, true);
                    };
                })
                .attr("transform", withTransform ? "scale(1)" : "")
                .style("fill", function (d) {
                    return $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data.id);
                }) // Where gauge reading color would receive customization.
                .style("opacity", 1)
                // .style("stroke", "#fff")
                .style("stroke-width", "1.5px")
                .call($$.endall, function () {
                    $$.transiting = false;
                });
            mainArc.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();
            main.selectAll('.' + $$.CLASS.chartArc).selectAll(".c3-chart-arc-title")
                .text($$.textForArcLabelTitle.bind($$))
                .attr('class', "c3-chart-arc-title")
                .attr("transform", function (d) {
                    var translate = "translate(0," + ($$.arcHeight / 2 + 2) + ")";

                    if($$.config.donut_label_position == 'extend' || $$.config.pie_label_position == 'extend'){
                        translate = $$.transformForArcLabel(d).replace("translate(", "").replace(")", "");
                        translate = "translate(" + translate.split(",")[0] + "," + (translate.split(",")[1] - 15) + ")";
                    }else if($$.config.pie_split || $$.config.donut_split){
                        translate = "translate(0," + (this.previousElementSibling.previousElementSibling.getBBox().height / 2 + 25) + ")";
                    }else{
                        translate = $$.transformForArcLabel(d).replace("translate(", "").replace(")", "");
                        translate = translate ? "translate(" + translate.split(",")[0] + "," + (translate.split(",")[1].replace(")", "") - (-15)) + ")" : "translate(0,0)";
                    }
                    return translate;
                })
                .attr("dy", $$.hasType('gauge') ? "-.1em" : ".35em")
                .style("text-anchor", "middle")
                .style('fill', function (d) {
                    if($$.config.donut_label_position == 'extend' || $$.config.pie_label_position == 'extend')
                        return $$.color(d.data);
                    return ($$.config.donut_split && $$.hasType('donut')) || ($$.config.pie_split && $$.hasType('pie')) ? '#777' : '';
                })
                .style("opacity", function (d, i, index) {
                    var count = $$.config[$$.config.data_type + "_label_count"];
                    var position = $$.config.donut_label_position || $$.config.pie_label_position;

                    if($$.config.donut_stack_enabled && i < $$.config.donut_stack_count)
                        return $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? 1 : 0;
                    else if(d.value && position && (index < count || count == -1))
                        return 1;
                    else if($$.config.pie_split)
                        return 1;
                    else
                        return 0;
                })
                .transition().duration(duration);
            main.selectAll('.' + $$.CLASS.chartArc)
                // .sort(function(d1, d2){
                //     return d3.ascending(d1.value, d2.value);
                // })
                .select('text')
                .text($$.textForArcLabel.bind($$))
                .attr('class', function (d) { return $$.isGaugeType(d.data) ? $$.CLASS.gaugeValue : 'c3-chart-arc-value'; })
                .attr("transform", $$.transformForArcLabel.bind($$))
                .style('font-size', function (d) { return $$.isGaugeType(d.data) ? Math.round($$.radius / 5) + 'px' : ''; })
                .style('fill', function (d) {
                    if($$.config.donut_stack_enabled)
                        return $$.color(d.data);
                    else if($$.config.donut_label_position == 'extend' || $$.config.pie_label_position == 'extend')
                        return $$.color(d.data);
                    return ($$.config.donut_split && $$.hasType('donut')) || ($$.config.pie_split && $$.hasType('pie')) ? '#777' : '';
                })
                .transition().duration(duration)
                .style("opacity", function (d, i) {
                    var count = $$.config[$$.config.data_type + "_label_count"];
                    var position = $$.config.donut_label_position || $$.config.pie_label_position;

                    if($$.config.donut_stack_enabled && i < $$.config.donut_stack_count)
                        return $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? 1 : 0;
                    else if(position && (i < count || count == -1))
                        return 1;
                    else if($$.config.pie_split)
                        return 1;
                    else
                        return 0;
                });

            if((!config.pie_split || !config.donut_split) && (config.donut_label_position == 'extend' || config.pie_label_position == 'extend')){
                var mainArcPolyline = main.selectAll('.' + $$.CLASS.arcs)
                    .selectAll("polyline")
                    .data($$.arcData.bind($$));

                mainArcPolyline
                    .enter()
                    .append("polyline")
                mainArcPolyline
                    .transition().duration(0)
                    .attrTween("points", function(d, i){
                        d.startAngle = 0;
                        this._current = this._current || d;

                        var updated = $$.updateAngle(d), interpolate;
                        var interpolate = d3.interpolate(this._current, updated);
                        this._current = interpolate(0);

                        return function(t) {
                            var factor = $$.config.data_type == "donut" ? 1.35 : 2.15;
                            var arc = $$.d3.svg.arc().outerRadius($$.radius * factor).innerRadius($$.innerRadius * factor);
                            var d2 = interpolate(t);
                            var pos = arc.centroid(d2);

                            function midAngle(d){
                                return d.startAngle + (d.endAngle - d.startAngle)/2;
                            }

                            pos[0] = pos[0] + (30 * (midAngle(d2) < Math.PI ? 1 : -1) );
                            if(!updated || !d2.value)
                                return [0,0,0,0,0,0];
                            return [$$.svgArc.centroid(d2), arc.centroid(d2), pos];
                        };
                    })
                    .style("stroke", function(d){
                        return $$.color(d.data);
                    })
                    .style("opacity", function (d, i, index) {
                        var count = $$.config[$$.config.data_type + "_label_count"];

                        if(index >= count && count != -1)
                            return 0;
                        else
                            return 0.6;
                    });
                mainArcPolyline.exit();
            }

            main.select('.' + $$.CLASS.chartArcsTitle)
                .style("opacity", $$.hasType('donut') || $$.hasType('gauge') ? 1 : 0);

            if ($$.hasType('gauge')) {
                $$.arcs.select('.' + $$.CLASS.chartArcsBackground)
                    .attr("d", function () {
                        var d = {
                            data: [{ value: config.gauge_max }],
                            startAngle: 0,
                            endAngle: Math.PI * 2
                        };
                        return $$.getArc(d, true, true);
                    });
                $$.arcs.select('.' + $$.CLASS.chartArcsGaugeRanges)
                    .selectAll('.' + $$.CLASS.chartArcsGaugeRange)
                    .attr("d", function(d, i){
                        var d = {
                            startAngle: d["start"]/config.gauge_max*1.5*Math.PI + Math.PI*1.25,
                            endAngle: d["end"]/config.gauge_max*1.5*Math.PI + Math.PI*1.25
                        };
                        return $$.getArc(d, true, true);
                    })
                    .style("fill", function(d){
                        return d.color;
                    });
                $$.arcs.select('.' + $$.CLASS.chartArcsGaugeTicks)
                    .selectAll("text")
                    .text(function(d){
                        return d["end"];
                    })
                    .attr("text-anchor", "middle")
                    .attr("x", function(d){
                        return ($$.innerRadius - 10) * Math.sin(d["end"]/config.gauge_max*1.5*Math.PI + Math.PI*1.25)
                    })
                    .attr("y", function(d){
                        return -1 * ($$.innerRadius - 10) * Math.cos(d["end"]/config.gauge_max*1.5*Math.PI + Math.PI*1.25)
                    })
                    .attr("dy", 6)
                    .style("fill", function(d){
                        return d.color;
                    });
                $$.arcs.select('.' + $$.CLASS.chartArcsGaugeUnit)
                    .attr("dx", function(){
                        return $$.config.gauge_label_position ? $$.config.gauge_label_position["x"] : 0
                    })
                    .attr("dy", function(){
                        return $$.config.gauge_label_position ? $$.config.gauge_label_position["y"] : $$.radius * 0.6
                    })
                    .text(function(d){
                        if(!$$.config.gauge_label_show)
                            return "";

                        if($$.config.gauge_label_format && utility.isFunction($$.config.gauge_label_format)){
                            return $$.config.gauge_label_format(d.value);
                        }else{
                            return d.value;
                        }
                    })
                    .style("fill", "#0691d2");
                $$.arcs.select('.' + $$.CLASS.chartArcsGaugePointer)
                    .select("path")
                    .attr('d', function(){
                        var data = [
                            [-$$.config.gauge_pointer_width, 0],
                            [0, $$.innerRadius - 22],
                            [$$.config.gauge_pointer_width, 0],
                            [0, -$$.config.gauge_pointer_width - 2],
                            [-$$.config.gauge_pointer_width, 0]
                        ];
                        return d3.svg.line().interpolate('monotone')(data);
                    })
                    .style("stroke", "#0691d2")
                    .style("fill", "#0691d2")
                    .attr('transform', function(d){
                        return 'rotate(' + 45 + ')';
                    })
                    .transition()
                    .duration($$.config.transition_duration)
                    .attrTween( 'transform', function(d) {
                        var interpolator = d3.interpolateNumber(0, d.value);

                        return function( t ) {
                            return 'rotate(' + (45 + 27*(interpolator(t)/$$.config.gauge_interval)) + ')';
                        };
                    });
                // $$.arcs.select('.' + $$.CLASS.chartArcsGaugeMin)
                //     .attr("dx", -1 * ($$.innerRadius + (($$.radius - $$.innerRadius) / 2)) + "px")
                //     .attr("dy", "1.2em")
                //     .text(config.gauge_label_show ? config.gauge_min : '');
                // $$.arcs.select('.' + $$.CLASS.chartArcsGaugeMax)
                //     .attr("dx", $$.innerRadius + (($$.radius - $$.innerRadius) / 2) + "px")
                //     .attr("dy", "1.2em")
                //     .text(config.gauge_label_show ? config.gauge_max : '');
            }
        },

        classArc: function (d) {
            return this.classShape(d.data) + this.generateClass(this.CLASS.arc, d.data.id);
        },
        classArcFull: function (d) {
            return this.classShape(d.data) + this.generateClass(this.CLASS.arc + "-full", d.data.id);
        },
        classArcs: function (d) {
            return this.classShapes(d.data) + this.generateClass(this.CLASS.arcs, d.data.id);
        }
    };
}

C3Arc.prototype = {

};

c3.register("arc", [Legend, Tooltip, Text], {
    CLASS: {
        chartArc: 'c3-chart-arc',
        chartArcs: 'c3-chart-arcs',
        chartArcsTitle: 'c3-chart-arcs-title',
        chartArcsBackground: 'c3-chart-arcs-background',
        chartArcsGaugeUnit: 'c3-chart-arcs-gauge-unit',
        chartArcsGaugeMax: 'c3-chart-arcs-gauge-max',
        chartArcsGaugeMin: 'c3-chart-arcs-gauge-min',
        chartArcsGaugeRanges: 'c3-chart-arcs-gauge-ranges',
        chartArcsGaugeRange: 'c3-chart-arcs-gauge-range',
        chartArcsGaugeTicks: 'c3-chart-arcs-gauge-ticks',
        chartArcsGaugePointer: 'c3-chart-arcs-gauge-pointer',
        gaugeValue: 'c3-gauge-value',
        treeRoot: 'c3-tree-root',
        treeNode: 'c3-tree-node',
        tree: 'c3-tree',
        arc: 'c3-arc',
        arcs: 'c3-arcs'
    },
    config: {
        pie: {
            label: {
                show: true,
                format: undefined,
                threshold: 0.05,
                position: false,
                offset_x: 0,
                offset_y: 0,
                count: -1,
            },
            title: {
                show: true
            },
            expand: true,
            split: false,
            other: null
        },
        gauge: {
            label: {
                show: true,
                format: undefined,
                position: undefined
            },
            pointer: {
                show: true,
                width: 5
            },
            min: 0,
            max: 100,
            units: undefined,
            width: undefined,
            range: [],
            interval: null
        },
        donut: {
            label: {
                show: true,
                format: undefined,
                threshold: 0.05,
                position: '',
                count: -1,
            },
            stack: {
                enabled: false,
                count: 3,
            },
            title: {
                show: false
            },
            split: false,
            width: undefined,
            expand: true,
            other: null
        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Arc);

module.exports = c3;