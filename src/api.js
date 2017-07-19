var utility = require("./utility");

var API = function () { };

API.prototype.focus = function (targetIds) {
    var $$ = this.internal, candidates;

    targetIds = $$.mapToTargetIds(targetIds);
    candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));

    this.revert();
    this.defocus();
    candidates.classed($$.CLASS.focused, true).classed($$.CLASS.defocused, false);
    if ($$.hasArcType() || $$.hasTreeType()) {
        $$.expandArc(targetIds);
    }
    $$.toggleFocusLegend(targetIds, true);

    $$.focusedTargetIds = targetIds;
    $$.defocusedTargetIds = $$.defocusedTargetIds.filter(function (id) {
        return targetIds.indexOf(id) < 0;
    });
};

API.prototype.defocus = function (targetIds) {
    var $$ = this.internal, candidates;

    targetIds = $$.mapToTargetIds(targetIds);
    candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))),

    candidates.classed($$.CLASS.focused, false).classed($$.CLASS.defocused, true);
    if ($$.hasArcType()) {
        $$.unexpandArc(targetIds);
    }
    $$.toggleFocusLegend(targetIds, false);

    $$.focusedTargetIds = $$.focusedTargetIds.filter(function (id) {
        return targetIds.indexOf(id) < 0;
    });
    $$.defocusedTargetIds = targetIds;
};

API.prototype.revert = function (targetIds) {
    var $$ = this.internal, candidates;

    targetIds = $$.mapToTargetIds(targetIds);
    candidates = $$.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets

    candidates.classed($$.CLASS.focused, false).classed($$.CLASS.defocused, false);
    if ($$.hasType('arc') || $$.hasType('tree')) {
        $$.unexpandArc(targetIds);
    }
    if ($$.config.legend_show) {
        $$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
        $$.legend.selectAll($$.selectorLegends(targetIds))
            .filter(function () {
                return $$.d3.select(this).classed($$.CLASS.legendItemFocused);
            })
            .classed($$.CLASS.legendItemFocused, false);
    }

    $$.focusedTargetIds = [];
    $$.defocusedTargetIds = [];
};

API.prototype.show = function (targetIds, options) {
    var $$ = this.internal, targets;

    targetIds = $$.mapToTargetIds(targetIds);
    options = options || {};

    $$.removeHiddenTargetIds(targetIds);
    if($$.hasType("tree")){
        targets = $$.svg.selectAll("." + $$.CLASS.treeNode + "." + targetIds[0]);
    }else{
        targets = $$.svg.selectAll($$.selectorTargets(targetIds));
    }

    targets.transition()
        .style('opacity', 1, 'important')
        .call($$.endall, function () {
            targets.style('opacity', null).style('opacity', 1);
        });

    if (options.withLegend) {
        $$.showLegend(targetIds);
    }

    $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true });
};

API.prototype.hide = function (targetIds, options) {
    var $$ = this.internal, targets;

    targetIds = $$.mapToTargetIds(targetIds);
    options = options || {};

    $$.addHiddenTargetIds(targetIds);
    if($$.hasType("tree")){
        targets = $$.svg.selectAll("." + $$.CLASS.treeNode + "." + targetIds[0]);
    }else{
        targets = $$.svg.selectAll($$.selectorTargets(targetIds));
    }

    targets.transition()
        .style('opacity', 0, 'important')
        .call($$.endall, function () {
            targets.style('opacity', null).style('opacity', 0);
        });

    if (options.withLegend) {
        $$.hideLegend(targetIds);
    }

    $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true });
};

API.prototype.toggle = function (targetIds, options) {
    var that = this, $$ = this.internal, showTargets = [], hiddenTargetIds = [];

    if($$.hasTreeType()){
        $$.mapToTargetIds(targetIds).map(function (targetId) {
            $$.isTargetToShow(targetId) ? hiddenTargetIds.push(targetId) : showTargets.push(targetId);
        });
        hiddenTargetIds.length && that.hide(hiddenTargetIds, options);
        showTargets.length && that.show(showTargets, options);
    }else{
        $$.mapToTargetIds(targetIds).forEach(function (targetId) {
            $$.isTargetToShow(targetId) ? that.hide(targetId, options) : that.show(targetId, options);
        });
    }
};

API.prototype.zoom = function (domain) {
    var $$ = this.internal;
    if (domain) {
        if ($$.isTimeSeries()) {
            domain = domain.map(function (x) { return $$.parseDate(x); });
        }
        $$.brush.extent(domain);
        $$.redraw({ withUpdateXDomain: true, withY: $$.config.zoom_rescale });
        $$.config.zoom_onzoom.call(this, $$.x.orgDomain());
    }
    return $$.brush.extent();
};
API.prototype.zoom.enable = function (enabled) {
    var $$ = this.internal;
    $$.config.zoom_enabled = enabled;
    $$.updateAndRedraw();
};
API.prototype.unzoom = function () {
    var $$ = this.internal;
    $$.brush.clear().update();
    $$.redraw({ withUpdateXDomain: true });
};

API.prototype.load = function (args) {
    var $$ = this.internal, config = $$.config;
    // update xs if specified
    if (args.xs) {
        $$.addXs(args.xs);
    }
    // update classes if exists
    if ('classes' in args) {
        Object.keys(args.classes).forEach(function (id) {
            config.data_classes[id] = args.classes[id];
        });
    }
    // update categories if exists
    if ('categories' in args && $$.isCategorized()) {
        config.axis_x_categories = args.categories;
    }
    // update axes if exists
    if ('axes' in args) {
        Object.keys(args.axes).forEach(function (id) {
            config.data_axes[id] = args.axes[id];
        });
    }
    // update colors if exists
    if ('colors' in args) {
        Object.keys(args.colors).forEach(function (id) {
            config.data_colors[id] = args.colors[id];
        });
    }
    if ('regions' in args) {
        Object.keys(args.regions).forEach(function (id) {
            config.data_regions[id] = args.regions[id];
        });
    }
    // use cache if exists
    if ('cacheIds' in args && $$.hasCaches(args.cacheIds)) {
        $$.load($$.getCaches(args.cacheIds), args.done);
        return;
    }
    // unload if needed
    if ('unload' in args) {
        // TODO: do not unload if target will load (included in url/rows/columns)
        $$.unload($$.mapToTargetIds((typeof args.unload === 'boolean' && args.unload) ? null : args.unload), function () {
            $$.loadFromArgs(args);
        });
    } else {
        $$.loadFromArgs(args);
    }
};

API.prototype.unload = function (args) {
    var $$ = this.internal;
    args = args || {};
    if (args instanceof Array) {
        args = { ids: args };
    } else if (typeof args === 'string') {
        args = { ids: [args] };
    }
    $$.unload($$.mapToTargetIds(args.ids), function () {
        $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true });
        if (args.done) { args.done(); }
    });

    //去除name和region
    args["ids"].ach(function (id) {
        delete $$.config.data_names[id];
        delete $$.config.data_regions[id];
    });
};

API.prototype.flow = function (args) {
    var $$ = this.internal,
        targets, data, notfoundIds = [], orgDataCount = $$.getMaxDataCount(),
        dataCount, domain, baseTarget, baseValue, length = 0, tail = 0, diff, to;

    if (args.json) {
        data = $$.convertJsonToData(args.json, args.keys);
    }
    else if (args.rows) {
        data = $$.convertRowsToData(args.rows);
    }
    else if (args.columns) {
        data = $$.convertColumnsToData(args.columns);
    }
    else {
        return;
    }
    targets = $$.convertDataToTargets(data, true);

    // Update/Add data
    $$.data.targets.forEach(function (t) {
        var found = false, i, j;
        for (i = 0; i < targets.length; i++) {
            if (t.id === targets[i].id) {
                found = true;

                if (t.values[t.values.length - 1]) {
                    tail = t.values[t.values.length - 1].index + 1;
                }
                length = targets[i].values.length;

                for (j = 0; j < length; j++) {
                    targets[i].values[j].index = tail + j;
                    if (!$$.isTimeSeries()) {
                        targets[i].values[j].x = tail + j;
                    }
                }
                t.values = t.values.concat(targets[i].values);

                targets.splice(i, 1);
                break;
            }
        }
        if (!found) { notfoundIds.push(t.id); }
    });

    // Append null for not found targets
    $$.data.targets.forEach(function (t) {
        var i, j;
        for (i = 0; i < notfoundIds.length; i++) {
            if (t.id === notfoundIds[i]) {
                tail = t.values[t.values.length - 1].index + 1;
                for (j = 0; j < length; j++) {
                    t.values.push({
                        id: t.id,
                        index: tail + j,
                        x: $$.isTimeSeries() ? $$.getOtherTargetX(tail + j) : tail + j,
                        value: null
                    });
                }
            }
        }
    });

    // Generate null values for new target
    if ($$.data.targets.length) {
        targets.forEach(function (t) {
            var i, missing = [];
            for (i = $$.data.targets[0].values[0].index; i < tail; i++) {
                missing.push({
                    id: t.id,
                    index: i,
                    x: $$.isTimeSeries() ? $$.getOtherTargetX(i) : i,
                    value: null
                });
            }
            t.values.forEach(function (v) {
                v.index += tail;
                if (!$$.isTimeSeries()) {
                    v.x += tail;
                }
            });
            t.values = missing.concat(t.values);
        });
    }
    $$.data.targets = $$.data.targets.concat(targets); // add remained

    // check data count because behavior needs to change when it's only one
    dataCount = $$.getMaxDataCount();
    baseTarget = $$.data.targets[0];
    baseValue = baseTarget.values[0];

    // Update length to flow if needed
    if (utility.isDefined(args.to)) {
        length = 0;
        to = $$.isTimeSeries() ? $$.parseDate(args.to) : args.to;
        baseTarget.values.forEach(function (v) {
            if (v.x < to) { length++; }
        });
    } else if (utility.isDefined(args.length)) {
        length = args.length;
    }

    // If only one data, update the domain to flow from left edge of the chart
    if (!orgDataCount) {
        if ($$.isTimeSeries()) {
            if (baseTarget.values.length > 1) {
                diff = baseTarget.values[baseTarget.values.length - 1].x - baseValue.x;
            } else {
                diff = baseValue.x - $$.getXDomain($$.data.targets)[0];
            }
        } else {
            diff = 1;
        }
        domain = [baseValue.x - diff, baseValue.x];
        $$.updateXDomain(null, true, true, false, domain);
    } else if (orgDataCount === 1) {
        if ($$.isTimeSeries()) {
            diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
            domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
            $$.updateXDomain(null, true, true, false, domain);
        }
    }

    // Set targets
    $$.updateTargets($$.data.targets);

    // Redraw with new targets
    $$.redraw({
        flow: {
            index: baseValue.index,
            length: length,
            duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,
            done: args.done,
            orgDataCount: orgDataCount,
        },
        withLegend: true,
        withTransition: orgDataCount > 1,
        withTrimXDomain: false,
        withUpdateXAxis: true,
    });
};
API.prototype.selected = function (targetId) {
    var $$ = this.internal, d3 = $$.d3;
    return d3.merge(
        $$.main.selectAll('.' + $$.CLASS.shapes + $$.getTargetSelectorSuffix(targetId)).selectAll('.' + $$.CLASS.shape)
            .filter(function () { return d3.select(this).classed($$.CLASS.SELECTED); })
            .map(function (d) { return d.map(function (d) { var data = d.__data__; return data.data ? data.data : data; }); })
    );
};
API.prototype.select = function (ids, indices, resetOther) {
    var $$ = this.internal, d3 = $$.d3, config = $$.config;
    if (!config.data_selection_enabled) { return; }
    $$.main.selectAll('.' + $$.CLASS.shapes).selectAll('.' + $$.CLASS.shape).each(function (d, i) {
        var shape = d3.select(this), id = d.data ? d.data.id : d.id,
            toggle = $$.getToggle(this, d).bind($$),
            isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
            isTargetIndex = !indices || indices.indexOf(i) >= 0,
            isSelected = shape.classed($$.CLASS.SELECTED);
        // line/area selection not supported yet
        if (shape.classed($$.CLASS.line) || shape.classed($$.CLASS.area)) {
            return;
        }
        if (isTargetId && isTargetIndex) {
            if (config.data_selection_isselectable(d) && !isSelected) {
                toggle(true, shape.classed($$.CLASS.SELECTED, true), d, i);
            }
        } else if (utility.isDefined(resetOther) && resetOther) {
            if (isSelected) {
                toggle(false, shape.classed($$.CLASS.SELECTED, false), d, i);
            }
        }
    });
};
API.prototype.unselect = function (ids, indices) {
    var $$ = this.internal, d3 = $$.d3, config = $$.config;
    if (!config.data_selection_enabled) { return; }
    $$.main.selectAll('.' + $$.CLASS.shapes).selectAll('.' + $$.CLASS.shape).each(function (d, i) {
        var shape = d3.select(this), id = d.data ? d.data.id : d.id,
            toggle = $$.getToggle(this, d).bind($$),
            isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
            isTargetIndex = !indices || indices.indexOf(i) >= 0,
            isSelected = shape.classed($$.CLASS.SELECTED);
        // line/area selection not supported yet
        if (shape.classed($$.CLASS.line) || shape.classed($$.CLASS.area)) {
            return;
        }
        if (isTargetId && isTargetIndex) {
            if (config.data_selection_isselectable(d)) {
                if (isSelected) {
                    toggle(false, shape.classed($$.CLASS.SELECTED, false), d, i);
                }
            }
        }
    });
};

API.prototype.transform = function (type, targetIds) {
    var $$ = this.internal,
        options = ['pie', 'donut'].indexOf(type) >= 0 ? { withTransform: true } : null;
    $$.transformTo(targetIds, type, options);
};

API.prototype.groups = function (groups) {
    var $$ = this.internal, config = $$.config;
    if (utility.isUndefined(groups)) { return config.data_groups; }
    config.data_groups = groups;
    $$.redraw();
    return config.data_groups;
};

API.prototype.xgrids = function (grids) {
    var $$ = this.internal, config = $$.config;
    if (!grids) { return config.grid_x_lines; }
    config.grid_x_lines = grids;
    $$.redrawWithoutRescale();
    return config.grid_x_lines;
};
API.prototype.xgrids.add = function (grids) {
    var $$ = this.internal;
    return this.xgrids($$.config.grid_x_lines.concat(grids ? grids : []));
};
API.prototype.xgrids.remove = function (params) { // TODO: multiple
    var $$ = this.internal;
    $$.removeGridLines(params, true);
};

API.prototype.ygrids = function (grids) {
    var $$ = this.internal, config = $$.config;
    if (!grids) { return config.grid_y_lines; }
    config.grid_y_lines = grids;
    $$.redrawWithoutRescale();
    return config.grid_y_lines;
};
API.prototype.ygrids.add = function (grids) {
    var $$ = this.internal;
    return this.ygrids($$.config.grid_y_lines.concat(grids ? grids : []));
};
API.prototype.ygrids.remove = function (params) { // TODO: multiple
    var $$ = this.internal;
    $$.removeGridLines(params, false);
};

API.prototype.regions = function (regions) {
    var $$ = this.internal, config = $$.config;
    if (!regions) { return config.regions; }
    config.regions = regions;
    $$.redrawWithoutRescale();
    return config.regions;
};
API.prototype.regions.add = function (regions) {
    var $$ = this.internal, config = $$.config;
    if (!regions) { return config.regions; }
    config.regions = config.regions.concat(regions);
    $$.redrawWithoutRescale();
    return config.regions;
};
API.prototype.regions.remove = function (options) {
    var $$ = this.internal, config = $$.config,
        duration, classes, regions;

    options = options || {};
    duration = $$.getOption(options, "duration", config.transition_duration);
    classes = $$.getOption(options, "classes", [$$.CLASS.region]);

    regions = $$.main.select('.' + $$.CLASS.regions).selectAll(classes.map(function (c) { return '.' + c; }));
    (duration ? regions.transition().duration(duration) : regions)
        .style('opacity', 0)
        .remove();

    config.regions = config.regions.filter(function (region) {
        var found = false;
        if (!region['class']) {
            return true;
        }
        region['class'].split(' ').forEach(function (c) {
            if (classes.indexOf(c) >= 0) { found = true; }
        });
        return !found;
    });

    return config.regions;
};

API.prototype.data = function (targetIds) {
    var targets = this.internal.data.targets;
    return typeof targetIds === 'undefined' ? targets : targets.filter(function (t) {
        return [].concat(targetIds).indexOf(t.id) >= 0;
    });
};
API.prototype.data.shown = function (targetIds) {
    return this.internal.filterTargetsToShow(this.data(targetIds));
};
API.prototype.data.values = function (targetId) {
    var targets, values = null;
    if (targetId) {
        targets = this.data(targetId);
        values = targets[0] ? targets[0].values.map(function (d) { return d.value; }) : null;
    }
    return values;
};
API.prototype.data.names = function (names) {
    this.internal.clearLegendItemTextBoxCache();
    return this.internal.updateDataAttributes('names', names);
};
API.prototype.data.colors = function (colors) {
    return this.internal.updateDataAttributes('colors', colors);
};
API.prototype.data.axes = function (axes) {
    return this.internal.updateDataAttributes('axes', axes);
};
API.prototype.category = function (i, category) {
    var $$ = this.internal, config = $$.config;
    if (arguments.length > 1) {
        config.axis_x_categories[i] = category;
        $$.redraw();
    }
    return config.axis_x_categories[i];
};
API.prototype.categories = function (categories) {
    var $$ = this.internal, config = $$.config;
    if (!arguments.length) { return config.axis_x_categories; }
    config.axis_x_categories = categories;
    $$.redraw();
    return config.axis_x_categories;
};

// TODO: fix
API.prototype.color = function (id) {
    var $$ = this.internal;
    return $$.color(id); // more patterns
};

API.prototype.x = function (x) {
    var $$ = this.internal;
    if (arguments.length) {
        $$.updateTargetX($$.data.targets, x);
        $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true });
    }
    return $$.data.xs;
};
API.prototype.xs = function (xs) {
    var $$ = this.internal;
    if (arguments.length) {
        $$.updateTargetXs($$.data.targets, xs);
        $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true });
    }
    return $$.data.xs;
};
API.prototype.resize = function (size) {
    var $$ = this.internal, config = $$.config;
    config.size_width = size ? size.width : null;
    config.size_height = size ? size.height : null;
    this.flush();
};
API.prototype.flush = function (config) {
    var $$ = this.internal;
    $$.updateAndRedraw({ withLegend: true, withTransition: false, withTransitionForTransform: false });
};
API.prototype.destroy = function () {
    var $$ = this.internal;

    window.clearInterval($$.intervalForObserveInserted);
    window.onresize = null;

    $$.selectChart.classed('c3', false).html("");

    // MEMO: this is needed because the reference of some elements will not be released, then memory leak will happen.
    Object.keys($$).forEach(function (key) {
        $$[key] = null;
    });

    return null;
};
API.prototype.query = function(selector){
    return this.internal.main.selectAll(selector);
};
API.prototype.export = function () {
    var $$ = this.internal;

    var inlineAllStyles = function() {
        var chartStyle, selector;

        // Get rules from c3.css
        for (var i = 0; i <= document.styleSheets.length - 1; i++) {
            if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('c3.css') !== -1) {
                if (document.styleSheets[i].rules !== undefined) {
                    chartStyle = document.styleSheets[i].rules;
                } else {
                    chartStyle = document.styleSheets[i].cssRules;
                }
            }
        }

        if (chartStyle !== null && chartStyle !== undefined) {
        // SVG doesn't use CSS visibility and opacity is an attribute, not a style property. Change hidden stuff to "display: none"
        var changeToDisplay = function(){
          if (d3.select(this).style('visibility') === 'hidden' || d3.select(this).style('opacity') === '0') {
            d3.select(this).style('display', 'none');
          }
        };

        // Inline apply all the CSS rules as inline
        for (i = 0; i < chartStyle.length; i++) {
            if (chartStyle[i].type === 1) {
                selector = chartStyle[i].selectorText;
                styles = makeStyleObject(chartStyle[i]);
                d3.selectAll('svg *')
                    .each(changeToDisplay);
                d3.selectAll(selector)
                    .filter(':not(path)')
                    .each(function(){
                        var ele = this;
                        Object.keys(styles).forEach(function(key){
                            d3.select(ele).style(key, styles[key]);
                        });
                    });
            }

            /* C3 puts line colour as a style attribute, which gets overridden
             by the global ".c3 path, .c3 line" in c3.css. The .not() above
             prevents that, but now we need to set fill to "none" to prevent
             weird beziers.
             Which screws with pie charts and whatnot, ergo the is() callback.
            */
            $$.d3.selectAll('.c3-chart path')
                .filter(function(){
                  return d3.select(this).style('fill') === 'none';
                })
                .style('fill', 'none');
            $$.d3.selectAll('.c3-chart path')
                .filter(function(){
                  return !d3.select(this).style('fill') === 'none';
                })
                .style('fill', function(){
                  return d3.select(this).style('fill');
                });
            }
        }
    };
    // Create an object containing all the CSS styles.
    // TODO move into inlineAllStyles
    var makeStyleObject = function (rule) {
        var styleDec = rule.style;
        var output = {};
        var s;

        for (s = 0; s < styleDec.length; s++) {
            output[styleDec[s]] = styleDec[styleDec[s]];
        }
        return output;
    };
    // Create a SVG.
    var createSVGContent = function(svg) {
        /*
            Copyright (c) 2013 The New York Times
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        */

        //via https://github.com/NYTimes/svg-crowbar

        var prefix = {
            xmlns: "http://www.w3.org/2000/xmlns/",
            xlink: "http://www.w3.org/1999/xlink",
            svg: "http://www.w3.org/2000/svg"
        };
        var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

        svg.setAttribute("version", "1.1");

        // Disabled defs because it was screwing up PNG output
        //var defsEl = document.createElement("defs");
        //svg.insertBefore(defsEl, svg.firstChild); //TODO   .insert("defs", ":first-child")

        var styleEl = document.createElement("style");
        //defsEl.appendChild(styleEl);
        styleEl.setAttribute("type", "text/css");


        // removing attributes so they aren't doubled up
        svg.removeAttribute("xmlns");
        svg.removeAttribute("xlink");

        // These are needed for the svg
        if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
            svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
        }

        if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
            svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
        }

        var source = (new XMLSerializer()).serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
        // Quick 'n' shitty hacks to remove stuff that prevents AI from opening SVG
        source = source.replace(/\sfont-.*?: .*?;/gi, '');
        source = source.replace(/\sclip-.*?="url\(http:\/\/localhost:9000\/.*?\)"/gi, '');
        source = source.replace(/\stransform="scale\(2\)"/gi, '');
        // not needed but good so it validates
        source = source.replace(/<defs xmlns="http:\/\/www.w3.org\/1999\/xhtml">/gi, '<defs>');

        return doctype + source;
        // return {svg: svg, source: [doctype + source]};
    };

    // Copy CSS styles to Canvas
    inlineAllStyles();

    return createSVGContent(document.querySelector("svg"));
};

module.exports = new API();