var _ = require("underscore");
var utility = require("./utility");

function Grid(owner){
    owner.config = _.extend(owner.config, owner.convert({
        grid: {
            x: {
                show: false,
                type: 'tick',
                lines: [],
            },
            y: {
                show: false,
                lines: [],
                ticks: 10,
            },
            focus: {
                show: true
            },
            lines: {
                front: true
            }
        }
    }));
    owner.CLASS = _.extend(owner.CLASS, {
        grid: 'c3-grid',
        gridLines: 'c3-grid-lines',
        xgrid: 'c3-xgrid',
        xgrids: 'c3-xgrids',
        xgridLine: 'c3-xgrid-line',
        xgridLines: 'c3-xgrid-lines',
        xgridFocus: 'c3-xgrid-focus',
        ygrid: 'c3-ygrid',
        ygrids: 'c3-ygrids',
        ygridLine: 'c3-ygrid-line',
        ygridLines: 'c3-ygrid-lines',
    });

    this.__proto__.chartGrid = this;
    this.draw = function(fn){
        if(utility.isFunction(fn))
            this.draw = fn;
        return this;
    };
}

Grid.prototype.initGrid = function () {
    var $$ = this, config = $$.config, d3 = $$.d3;
    $$.grid = $$.main.append('g')
        .attr("clip-path", $$.clipPathForGrid)
        .attr('class', $$.CLASS.grid);
    if (config.grid_x_show) {
        $$.grid.append("g").attr("class", $$.CLASS.xgrids);
    }
    if (config.grid_y_show) {
        $$.grid.append('g').attr('class', $$.CLASS.ygrids);
    }
    if (config.grid_focus_show) {
        $$.grid.append('g')
            .attr("class", $$.CLASS.xgridFocus)
            .append('line')
            .attr('class', $$.CLASS.xgridFocus);
    }
    $$.xgrid = d3.selectAll([]);
    if (!config.grid_lines_front) { $$.initGridLines(); }
};
Grid.prototype.initGridLines = function () {
    var $$ = this, d3 = $$.d3;
    $$.gridLines = $$.main.append('g')
        .attr("clip-path", $$.clipPathForGrid)
        .attr('class', $$.CLASS.grid + ' ' + $$.CLASS.gridLines);
    $$.gridLines.append('g').attr("class", $$.CLASS.xgridLines);
    $$.gridLines.append('g').attr('class', $$.CLASS.ygridLines);
    $$.xgridLines = d3.selectAll([]);
};
Grid.prototype.gridTextDx = function (d) {
    return d.position === 'start' ? 4 : d.position === 'middle' ? 0 : -4;
};
Grid.prototype.xGridTextX = function (d) {
    return d.position === 'start' ? -this.height : d.position === 'middle' ? -this.height / 2 : 0;
};
Grid.prototype.yGridTextX = function (d) {
    return d.position === 'start' ? 0 : d.position === 'middle' ? this.width / 2 : this.width;
};
Grid.prototype.updateGrid = function (duration) {
    var $$ = this, main = $$.main, config = $$.config,
        xgridLine, ygridLine, yv;

    // hide if arc type
    $$.grid.style('visibility', $$.hasArcType && $$.hasArcType() ? 'hidden' : 'visible');

    main.select('line.' + $$.CLASS.xgridFocus).style("visibility", "hidden");
    if (config.grid_x_show) {
        $$.updateXGrid();
    }
    $$.xgridLines = main.select('.' + $$.CLASS.xgridLines).selectAll('.' + $$.CLASS.xgridLine)
        .data(config.grid_x_lines);
    // enter
    xgridLine = $$.xgridLines.enter().append('g')
        .attr("class", function (d) { return $$.CLASS.xgridLine + (d['class'] ? ' ' + d['class'] : ''); });
    xgridLine.append('line')
        .style("opacity", 0);
    xgridLine.append('text')
        .attr("text-anchor", $$.gridTextAnchor)
        .attr("transform", config.axis_rotated ? "" : "rotate(-90)")
        .attr('dx', $$.gridTextDx)
        .attr('dy', -5)
        .style("opacity", 0);
    // udpate
    // done in d3.transition() of the end of this function
    // exit
    $$.xgridLines.exit().transition().duration(duration)
        .style("opacity", 0)
        .remove();

    // Y-Grid
    if (config.grid_y_show) {
        $$.updateYGrid();
    }
    $$.ygridLines = main.select('.' + $$.CLASS.ygridLines).selectAll('.' + $$.CLASS.ygridLine)
        .data(config.grid_y_lines);
    // enter
    ygridLine = $$.ygridLines.enter().append('g')
        .attr("class", function (d) { return $$.CLASS.ygridLine + (d['class'] ? ' ' + d['class'] : ''); });
    ygridLine.append('line')
        .style("opacity", 0);
    ygridLine.append('text')
        .attr("text-anchor", $$.gridTextAnchor)
        .attr("transform", config.axis_rotated ? "rotate(-90)" : "")
        .attr('dx', $$.gridTextDx)
        .attr('dy', -5)
        .style("opacity", 0);
    // update
    yv = $$.yv.bind($$);
    $$.ygridLines.select('line')
      .transition().duration(duration)
        .attr("x1", config.axis_rotated ? yv : 0)
        .attr("x2", config.axis_rotated ? yv : $$.width)
        .attr("y1", config.axis_rotated ? 0 : yv)
        .attr("y2", config.axis_rotated ? $$.height : yv)
        .style("opacity", 1);
    $$.ygridLines.select('text')
      .transition().duration(duration)
        .attr("x", config.axis_rotated ? $$.xGridTextX.bind($$) : $$.yGridTextX.bind($$))
        .attr("y", yv)
        .text(function (d) { return d.text; })
        .style("opacity", 1);
    // exit
    $$.ygridLines.exit().transition().duration(duration)
        .style("opacity", 0)
        .remove();

    //自定义
    $$.grid.call($$.chartGrid.draw);
};
Grid.prototype.redrawGrid = function (withTransition) {
    var $$ = this, config = $$.config, xv = $$.xv.bind($$),
        lines = $$.xgridLines.select('line'),
        texts = $$.xgridLines.select('text');

    return [
        (withTransition ? lines.transition() : lines)
            .attr("x1", config.axis_rotated ? 0 : xv)
            .attr("x2", config.axis_rotated ? $$.width : xv)
            .attr("y1", config.axis_rotated ? xv : 0)
            .attr("y2", config.axis_rotated ? xv : $$.height)
            .style("opacity", 1),
        (withTransition ? texts.transition() : texts)
            .attr("x", config.axis_rotated ? $$.yGridTextX.bind($$) : $$.xGridTextX.bind($$))
            .attr("y", xv)
            .text(function (d) { return d.text; })
            .style("opacity", 1)
    ];
};
Grid.prototype.showXGridFocus = function (selectedData) {
    var $$ = this, config = $$.config,
        dataToShow = selectedData.filter(function (d) { return d && utility.isValue(d.value); }),
        focusEl = $$.main.selectAll('line.' + $$.CLASS.xgridFocus),
        xx = $$.xx.bind($$);

    if (!config.tooltip_show || !config.tooltip_focusline_show) { return; }
    // Hide when scatter plot exists
    if ($$.hasType('scatter') || $$.hasType('arc')) { return; }
    focusEl
        .style("visibility", "visible")
        .data([dataToShow[0]])
        .attr(config.axis_rotated ? 'y1' : 'x1', xx)
        .attr(config.axis_rotated ? 'y2' : 'x2', xx);
    $$.smoothLines(focusEl, 'grid');
};
Grid.prototype.hideXGridFocus = function () {
    this.main.select('line.' + this.CLASS.xgridFocus).style("visibility", "hidden");
};
Grid.prototype.updateXgridFocus = function () {
    var $$ = this, config = $$.config;

    $$.main.select('line.' + $$.CLASS.xgridFocus)
        .attr("x1", config.axis_rotated ? 0 : -10)
        .attr("x2", config.axis_rotated ? $$.width : -10)
        .attr("y1", config.axis_rotated ? -10 : 0)
        .attr("y2", config.axis_rotated ? -10 : $$.height);
};
Grid.prototype.generateGridData = function (type, scale) {
    var $$ = this,
        gridData = [], xDomain, firstYear, lastYear, i,
        tickNum = $$.main.select("." + $$.CLASS.axisX).selectAll('.tick').size();

    if (type === 'year') {
        xDomain = $$.getXDomain();
        firstYear = xDomain[0].getFullYear();
        lastYear = xDomain[1].getFullYear();
        for (i = firstYear; i <= lastYear; i++) {
            gridData.push(new Date(i + '-01-01 00:00:00'));
        }
    } else {
        gridData = scale.ticks(10);
        if (gridData.length > tickNum) { // use only int
            gridData = gridData.filter(function (d) { return ("" + d).indexOf('.') < 0; });
        }
        if(gridData[gridData.length - 1] != scale.domain()[1]){ //修正当XGRID的最后一个线与X轴最大值不吻合的情况
            gridData = $$.xAxis.tickValues();
        }
    }
    return gridData;
};
Grid.prototype.getGridFilterToRemove = function (params) {
    return params ? function (line) {
        var found = false;
        [].concat(params).forEach(function (param) {
            if ((('value' in param && line.value === param.value) || ('class' in param && line['class'] === param['class']))) {
                found = true;
            }
        });
        return found;
    } : function () { return true; };
};
Grid.prototype.removeGridLines = function (params, forX) {
    var $$ = this, config = $$.config,
        toRemove = $$.getGridFilterToRemove(params),
        toShow = function (line) { return !toRemove(line); },
        classLines = forX ? $$.CLASS.xgridLines : $$.CLASS.ygridLines,
        classLine = forX ? $$.CLASS.xgridLine : $$.CLASS.ygridLine;
    $$.main.select('.' + classLines).selectAll('.' + classLine).filter(toRemove)
        .transition().duration(config.transition_duration)
        .style('opacity', 0).remove();
    if (forX) {
        config.grid_x_lines = config.grid_x_lines.filter(toShow);
    } else {
        config.grid_y_lines = config.grid_y_lines.filter(toShow);
    }
};
Grid.prototype.updateXGrid = function (withoutUpdate) {
    var $$ = this, config = $$.config, d3 = $$.d3,
        xgridData = $$.generateGridData(config.grid_x_type, $$.x),
        tickOffset = $$.isCategorized() ? $$.xAxis.tickOffset() : 0;

    $$.xgridAttr = config.axis_rotated ? {
        'x1': 0,
        'x2': $$.width,
        'y1': function (d) { return $$.x(d) - tickOffset; },
        'y2': function (d) { return $$.x(d) - tickOffset; }
    } : {
        'x1': function (d) { return $$.x(d) + tickOffset; },
        'x2': function (d) { return $$.x(d) + tickOffset; },
        'y1': 0,
        'y2': $$.height
    };

    $$.xgrid = $$.main.select('.' + $$.CLASS.xgrids).selectAll('.' + $$.CLASS.xgrid)
        .data(xgridData);
    $$.xgrid.enter().append('line').attr("class", $$.CLASS.xgrid);
    if (!withoutUpdate) {
        $$.xgrid.attr($$.xgridAttr)
            .style("opacity", function () { return +d3.select(this).attr(config.axis_rotated ? 'y1' : 'x1') === (config.axis_rotated ? $$.height : 0) ? 0 : 1; });
    }
    $$.xgrid.exit().remove();
};
Grid.prototype.updateYGrid = function () {
    var $$ = this, config = $$.config,
        gridValues = $$.yAxis.tickValues() || $$.y.ticks(config.grid_y_ticks);

    $$.ygrid = $$.main.select('.' + $$.CLASS.ygrids).selectAll('.' + $$.CLASS.ygrid)
        .data(gridValues.slice(1));
    $$.ygrid.enter().append('line')
        .attr('class', $$.CLASS.ygrid);
    $$.ygrid.attr("x1", config.axis_rotated ? $$.y : 0)
        .attr("x2", config.axis_rotated ? $$.y : $$.width)
        .attr("y1", config.axis_rotated ? 0 : $$.y)
        .attr("y2", config.axis_rotated ? $$.height : $$.y);
    $$.ygrid.exit().remove();
    $$.smoothLines($$.ygrid, 'grid');
};
Grid.prototype.gridTextAnchor = function (d) {
    return d.position ? d.position : "end";
};

module.exports = Grid;