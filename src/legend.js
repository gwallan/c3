var _ = require("underscore");
var utility = require("./utility");

var config = {
    equally: false,
    shape: 'square',
    width: 0,
    show: true,
    hide: false,
    position: 'bottom',
    inset: {
        anchor: null,
        x: 10,
        y: 0,
        step: undefined,
    },
    item: {
        onclick: undefined,
        onmouseover: undefined,
        onmouseout: undefined,
        width: 0,
        height: 0,
        paddingRight: 0,
        color: null
    }
};
var CLASS = {
    legendBackground: 'c3-legend-background',
    legendItem: 'c3-legend-item',
    legendItemEvent: 'c3-legend-item-event',
    legendItemTile: 'c3-legend-item-tile',
    legendItemHidden: 'c3-legend-item-hidden',
    legendItemFocused: 'c3-legend-item-focused'
};

function Legend(owner){
    owner.config = _.extend(owner.config, owner.convert({legend: config}));
    owner.CLASS = _.extend(owner.CLASS, CLASS);
}

Legend.prototype.initLegend = function () {
    var $$ = this;

    $$.legendItemTextBox = {};
    $$.legendHasRendered = false;
    $$.legend = $$.svg.append("g").attr("transform", $$.getTranslate('legend'));

    if (!$$.config.legend_show) {
        $$.legend.style('visibility', 'hidden');
        $$.hiddenLegendIds = $$.mapToIds($$.data.targets);
        return;
    }
    // MEMO: call here to update legend box and tranlate for all
    // MEMO: translate will be upated by this, so transform not needed in updateLegend()
    $$.updateLegendWithDefaults();
};
Legend.prototype.updateLegendWithDefaults = function () {
    var $$ = this, ids = $$.mapToIds($$.orderTargets($$.data.targets));

    if ($$.config.donut_stack_enabled) {
        ids = ids.splice(0, $$.config.donut_stack_count);
    }
    $$.updateLegend(ids, { withTransform: false, withTransitionForTransform: false, withTransition: false });
};
Legend.prototype.updateSizeForLegend = function (legendHeight, legendWidth) {
    var $$ = this,
        config = $$.config,
        insetLegendPosition = {
            top: $$.isLegendTop ? $$.getCurrentPaddingTop() + ($$.isFunction(config.legend_inset_y) ? config.legend_inset_y($$.currentHeight, legendHeight) : config.legend_inset_y) + 5.5 : !$$.isFunction(config.legend_inset_y) ? $$.currentHeight - legendHeight - $$.getCurrentPaddingBottom() - config.legend_inset_y : config.legend_inset_y($$.currentHeight, legendHeight),
            left: $$.isLegendLeft ? $$.getCurrentPaddingLeft() + (!$$.isFunction(config.legend_inset_x) ? config.legend_inset_x : config.legend_inset_x($$.currentWidth, legendWidth) - $$.getCurrentPaddingLeft()) + 0.5 : !$$.isFunction(config.legend_inset_x) ? $$.currentWidth - legendWidth - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5 : config.legend_inset_x($$.currentWidth, legendWidth)
        };

    $$.margin3 = {
        top: $$.isLegendRight ? $$.margin.top : $$.isLegendInset ? insetLegendPosition.top : $$.isLegendTop ? 0 : $$.currentHeight - legendHeight,
        right: NaN,
        bottom: 0,
        left: $$.isLegendRight ? $$.currentWidth - legendWidth : $$.isLegendInset ? insetLegendPosition.left : $$.config.legend_width ? ($$.currentWidth - $$.config.legend_width)/2 : 0
    };
},
Legend.prototype.transformLegend = function (withTransition) {
    var $$ = this;
    (withTransition ? $$.legend.transition() : $$.legend).attr("transform", $$.getTranslate('legend'));
};
Legend.prototype.updateLegendStep = function (step) {
    this.legendStep = step;
};
Legend.prototype.updateLegendItemWidth = function (w) {
    this.legendItemWidth = w;
};
Legend.prototype.updateLegendItemHeight = function (h) {
    this.legendItemHeight = h;
};
Legend.prototype.getLegendWidth = function () {
    var $$ = this, legendItems = $$.d3.selectAll('.' + CLASS.legendItem)[0].length;

    if($$.legend)
        return $$.config.legend_show ? $$.isLegendRight || $$.isLegendInset ? $$.legend.node().getBBox()["width"] : $$.currentWidth : 0;
    return $$.config.legend_show ? $$.isLegendRight || $$.isLegendInset ? $$.legendItemWidth * ($$.legendStep + 1) : $$.currentWidth : 0;
};
Legend.prototype.getLegendHeight = function () {
    var $$ = this, h = 0;

    if ($$.config.legend_show) {
        if ($$.isLegendRight) {
            h = $$.currentHeight;
        } else {
            h = Math.max(21, $$.legendItemHeight) * ($$.legendStep + 1);
        }
    }
    return h;
};
Legend.prototype.opacityForLegend = function (legendItem) {
    return legendItem.classed(CLASS.legendItemHidden) ? null : 1;
};
Legend.prototype.opacityForUnfocusedLegend = function (legendItem) {
    return legendItem.classed(CLASS.legendItemHidden) ? null : 0.3;
};
Legend.prototype.toggleFocusLegend = function (targetIds, focus) {
    var $$ = this;
    targetIds = $$.mapToTargetIds(targetIds);
    $$.legend.selectAll('.' + CLASS.legendItem)
        .filter(function (id) { return targetIds.indexOf(id) >= 0; })
        .classed(CLASS.legendItemFocused, focus)
      .transition().duration(100)
        .style('opacity', function () {
            var opacity = focus ? $$.opacityForLegend : $$.opacityForUnfocusedLegend;
            return opacity.call($$, $$.d3.select(this));
        });
};
Legend.prototype.revertLegend = function () {
    var $$ = this, d3 = $$.d3;
    $$.legend.selectAll('.' + CLASS.legendItem)
        .classed(CLASS.legendItemFocused, false)
        .transition().duration(100)
        .style('opacity', function () { return $$.opacityForLegend(d3.select(this)); });
};
Legend.prototype.showLegend = function (targetIds) {
    var $$ = this, config = $$.config;
    if (!config.legend_show) {
        config.legend_show = true;
        $$.legend.style('visibility', 'visible');
        if (!$$.legendHasRendered) {
            $$.updateLegendWithDefaults();
        }
    }
    $$.removeHiddenLegendIds(targetIds);
    $$.legend.selectAll($$.selectorLegends(targetIds))
        .style('visibility', 'visible')
        .transition()
        .style('opacity', function () { return $$.opacityForLegend($$.d3.select(this)); });
};
Legend.prototype.hideLegend = function (targetIds) {
    var $$ = this, config = $$.config;
    if (config.legend_show && utility.isEmpty(targetIds)) {
        config.legend_show = false;
        $$.legend.style('visibility', 'hidden');
    }
    $$.addHiddenLegendIds(targetIds);
    $$.legend.selectAll($$.selectorLegends(targetIds))
        .style('opacity', 0)
        .style('visibility', 'hidden');
};
Legend.prototype.clearLegendItemTextBoxCache = function () {
    this.legendItemTextBox = {};
};
Legend.prototype.updateLegend = function (targetIds, options, transitions) {
    var $$ = this, config = $$.config;
    var xForLegend, xForLegendText, xForLegendRect, yForLegend, yForLegendText, yForLegendRect;
    var paddingTop = 4, paddingRight = 10, maxWidth = 0, maxHeight = 0, posMin = 10, tileWidth = 15;
    var l, totalLength = 0, offsets = {}, widths = {}, heights = {}, margins = [0], steps = {}, step = 0;
    var withTransition, withTransitionForTransform;
    var texts, rects, tiles, background;

    options = options || {};
    withTransition = utility.getOption(options, "withTransition", true);
    withTransitionForTransform = utility.getOption(options, "withTransitionForTransform", true);

    function getTextBox(textElement, id) {
        if (!$$.legendItemTextBox[id]) {
            $$.legendItemTextBox[id] = $$.getTextRect(textElement.textContent, CLASS.legendItem);
        }
        return $$.legendItemTextBox[id];
    }

    function updatePositions(textElement, id, index) {
        var reset = index === 0, isLast = index === targetIds.length - 1,
            box = textElement.getBoundingClientRect(),
            // box = getTextBox(textElement, id),
            itemWidth = $$.config.legend_item_width || box.width + tileWidth + (isLast && !($$.isLegendRight || $$.isLegendInset) ? 0 : paddingRight) + $$.config.legend_item_paddingRight,
            itemHeight = $$.config.legend_item_height ||  box.height + paddingTop,
            itemLength = $$.isLegendRight || $$.isLegendInset ? itemHeight : itemWidth,
            areaLength = $$.isLegendRight || $$.isLegendInset ? $$.getLegendHeight() : $$.getLegendWidth(),
            margin, maxLength;

        // MEMO: care about condifion of step, totalLength
        function updateValues(id, withoutStep) {
            if (!withoutStep) {
                margin = (areaLength - totalLength - itemLength) / 2;
                if (margin < posMin) {
                    margin = (areaLength - itemLength) / 2;
                    totalLength = 0;
                    step++;
                }
            }
            offsets[id] = totalLength;
            totalLength += itemLength;
            steps[id] = step;
            margins[step] = $$.isLegendInset ? 10 : margin;
        }

        if (reset) {
            totalLength = 0;
            step = 0;
            maxWidth = 0;
            maxHeight = 0;
        }

        if (config.legend_show && !$$.isLegendToShow(id)) {
            widths[id] = heights[id] = steps[id] = offsets[id] = 0;
            return;
        }

        widths[id] = itemWidth;
        heights[id] = itemHeight;

        if (!maxWidth || itemWidth >= maxWidth) { maxWidth = itemWidth; }
        if (!maxHeight || itemHeight >= maxHeight) { maxHeight = itemHeight; }
        maxLength = $$.isLegendRight || $$.isLegendInset ? maxHeight : maxWidth;

        if (config.legend_equally) {
            Object.keys(widths).forEach(function (id) { widths[id] = maxWidth; });
            Object.keys(heights).forEach(function (id) { heights[id] = maxHeight; });
            margin = (areaLength - maxLength * targetIds.length) / 2;
            if (margin < posMin) {
                totalLength = 0;
                step = 0;
                targetIds.forEach(function (id) { updateValues(id); });
            }
            else {
                updateValues(id, true);
            }
        } else {
            updateValues(id);
        }
    }

    if ($$.isLegendInset) {
        step = config.legend_inset_step ? config.legend_inset_step : targetIds.length;
        $$.updateLegendStep(step);
    }

    if ($$.isLegendRight) {
        xForLegend = function (id) { return maxWidth * steps[id]; };
        yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
    } else if ($$.isLegendInset) {
        xForLegend = function (id) { return maxWidth * steps[id] + 10; };
        yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
    } else {
        xForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
        yForLegend = function (id) { return maxHeight * steps[id] + 10; };
    }
    xForLegendText = function (id, i) { return xForLegend(id, i) + 14; };
    yForLegendText = function (id, i) { return yForLegend(id, i) + 9; };
    xForLegendRect = function (id, i) { return xForLegend(id, i); };
    yForLegendRect = function (id, i) { return yForLegend(id, i) - 5; };

    // Define g for legend area
    l = $$.legend.selectAll('.' + CLASS.legendItem)
        .data(targetIds)
        .enter().append('g')
        .attr('class', function (id) { return $$.generateClass(CLASS.legendItem, id); })
        .style('visibility', function (id) { return $$.isLegendToShow(id) ? 'visible' : 'hidden'; })
        .style('cursor', 'pointer')
        .on('click', function (id) {
            if (config.legend_item_onclick) {
                config.legend_item_onclick.call($$, id);
            } if (config.donut_stack_enabled) {

            } else {
                if ($$.d3.event.altKey) {
                    $$.api.hide();
                    $$.api.show(id);
                } else {
                    if($$.hasType("tree")){
                        if(d3.select(config.bindto).selectAll("path." + id)[0].length != d3.select(config.bindto).selectAll(".c3-tree-node")[0].length){
                            $$.hiddenTargetIds = [];

                            $$.api.toggle(targetIds.filter(function(target){
                                return target == id ? false : true;
                            }));
                        }else{
                            $$.hiddenTargetIds = targetIds;

                            $$.api.toggle(targetIds);
                        }
                    }else{
                        $$.api.toggle(id);
                        !$$.isTargetToShow(id) && $$.api.revert();
                        // $$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert();
                    }
                }
            }
        })
        .on('mouseover', function (id) {
            if($$.hasType("tree") && !d3.selectAll(".c3-tree-node." + id)[0].length){
                return;
            }

            $$.d3.select(this).classed(CLASS.legendItemFocused, true);
            if (!$$.transiting && $$.isTargetToShow(id)) {
                $$.api.focus(id);
            }
            if (config.legend_item_onmouseover) {
                config.legend_item_onmouseover.call($$, id);
            }
        })
        .on('mouseout', function (id) {
            if($$.hasType("tree") && !d3.selectAll(".c3-tree-node." + id)[0].length){
                return;
            }

            $$.d3.select(this).classed(CLASS.legendItemFocused, false);
            $$.api.revert();
            if (config.legend_item_onmouseout) {
                config.legend_item_onmouseout.call($$, id);
            }
        });

    l.append('text')
        .text(function (id) { return utility.isDefined(config.data_names[id]) ? config.data_names[id] : id; })
        .each(function (id, i) { updatePositions(this, id, i); })
        .style("pointer-events", "none")
        .attr('x', $$.isLegendRight || $$.isLegendInset ? xForLegendText : -200)
        .attr('y', $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendText)
    l.append('rect')
        .attr("class", CLASS.legendItemEvent)
        .style('fill-opacity', 0)
        .attr('x', $$.isLegendRight || $$.isLegendInset ? xForLegendRect : -200)
        .attr('y', $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendRect);
    l.append('path')
        .attr("class", CLASS.legendItemTile)
        .attr("d", $$.symbol[config.legend_shape || "circle"])
        .style("pointer-events", "none")
        .style('fill', $$.color);

    // Set background for inset legend
    background = $$.legend.select('.' + CLASS.legendBackground + ' rect');
    if ($$.isLegendInset && maxWidth > 0 && background.size() === 0) {
        // background = $$.legend.insert('g', '.' + CLASS.legendItem)
        //     .attr("class", CLASS.legendBackground)
        //     .append('rect');
    }

    texts = $$.legend.selectAll('text')
        .data(targetIds)
        .html(function (id) {
            return utility.isDefined(config.data_names[id]) ? config.data_names[id] : id;
        }) // MEMO: needed for update
        .attr("fill", $$.config.legend_item_color)
        .each(function (id, i) { updatePositions(this, id, i); });
    (withTransition ? texts.transition() : texts)
        .attr('x', xForLegendText)
        .attr('y', yForLegendText);
    rects = $$.legend.selectAll('rect.' + CLASS.legendItemEvent)
        .data(targetIds);
    (withTransition ? rects.transition() : rects)
        .attr('width', function (id) { return widths[id]; })
        .attr('height', function (id) { return heights[id]; })
        .attr('x', xForLegendRect)
        .attr('y', yForLegendRect);
    tiles = $$.legend.selectAll('path.' + CLASS.legendItemTile)
        .data(targetIds);
    (withTransition ? tiles.transition() : tiles)
        .attr("transform", function(id ,i){
            return "translate(" + ($$.isLegendRight || $$.isLegendInset ? xForLegendText(id, i) - 10 : xForLegendRect(id) + 4.5) + "," + (yForLegend(id) + 4.5) + ")";
        });

    if (background) {
        (withTransition ? background.transition() : background)
            .attr('height', $$.getLegendHeight() - 12)
            .attr('width', maxWidth * (step + 1) + 10);
    }

    // toggle legend state
    $$.legend.selectAll('.' + CLASS.legendItem)
        .classed(CLASS.legendItemHidden, function (id) { return !$$.isTargetToShow(id); });

    // Update all to reflect change of legend
    $$.updateLegendItemWidth(maxWidth);
    $$.updateLegendItemHeight(maxHeight);
    $$.updateLegendStep(step);
    // Update size and scale
    $$.updateSizes();
    $$.updateScales();
    $$.updateSvgSize();
    // Update g positions
    $$.transformAll(withTransitionForTransform, transitions);
    $$.legendHasRendered = true;
};
Legend.prototype.isLegendToShow = function (targetId) {
    return this.hiddenLegendIds.indexOf(targetId) < 0;
};
Legend.prototype.addHiddenLegendIds = function (targetIds) {
    this.hiddenLegendIds = this.hiddenLegendIds.concat(targetIds);
};
Legend.prototype.removeHiddenLegendIds = function (targetIds) {
    this.hiddenLegendIds = this.hiddenLegendIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
};
Legend.prototype.selectorLegend = function (id) {
    return '.' + CLASS.legendItem + this.getTargetSelectorSuffix(id);
};
Legend.prototype.selectorLegends = function (ids) {
    var $$ = this;
    return ids && ids.length ? ids.map(function (id) { return $$.selectorLegend(id); }) : null;
};

module.exports = Legend;