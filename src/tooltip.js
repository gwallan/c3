var _ = require("underscore");
var utility = require("./utility");

var config = {
    show: true,
    grouped: true,
    position: undefined,
    contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
        return this.getTooltipContent ? this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) : '';
    },
    focusline: {
        show: false,
    },
    format: {
        title: undefined,
        name: undefined,
        value: undefined,
    },
    init: {
        show: false,
        x: 0,
        position: { top: '0px', left: '50px' }
    }
};
var CLASS = {
    tooltipContainer: 'c3-tooltip-container',
    tooltip: 'c3-tooltip',
    tooltipName: 'c3-tooltip-name',
};

function Tooltip(owner){
    owner.config = _.extend(owner.config, owner.convert({tooltip: config}));
    owner.CLASS = _.extend(owner.CLASS, CLASS);
}

Tooltip.prototype.initTooltip = function () {
    var $$ = this, config = $$.config, i;

    $$.tooltip = $$.selectChart
        .style("position", "relative")
        .append("div")
        .attr('class', CLASS.tooltipContainer)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("display", "none");

    // Show tooltip if needed
    if (config.tooltip_init_show) {
        if ($$.isTimeSeries() && isString(config.tooltip_init_x)) {
            config.tooltip_init_x = $$.parseDate(config.tooltip_init_x);
            for (i = 0; i < $$.data.targets[0].values.length; i++) {
                if (($$.data.targets[0].values[i].x - config.tooltip_init_x) === 0) { break; }
            }
            config.tooltip_init_x = i;
        }
        $$.tooltip.html(config.tooltip_contents.call($$, $$.data.targets.map(function (d) {
            return $$.addName(d.values[config.tooltip_init_x]);
        }), $$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType()), $$.color));
        $$.tooltip.style("top", config.tooltip_init_position.top)
            .style("left", config.tooltip_init_position.left)
            .style("display", "block");
    }
};
Tooltip.prototype.getTooltipContent = function (d, defaultTitleFormat, defaultValueFormat, color) {
    var $$ = this, config = $$.config,
        titleFormat = config.tooltip_format_title || defaultTitleFormat,
        nameFormat = config.tooltip_format_name || function (name) { return name; },
        valueFormat = config.tooltip_format_value || defaultValueFormat,
        text, i, title, value, name, bgcolor;

    //排序points内容数据
    d = d3.nest()
        .key(function (d) { return d && d.index ? d.index : 0; })
        .sortValues(function (a, b) { return b.value - a.value; })
        .entries(d)
        .reduce(function (a, b) {
            return a.concat(b.values);
        }, []);

    for (i = 0; i < d.length; i++) {
        if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }

        if (!text) {
            title = titleFormat ? titleFormat(d[i].x) : d[i].x;
            text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
        }

        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
        if (value !== undefined) {
            name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
            bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

            text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
            text += "<td class='name'><svg width='12' height='12'><g>";
            text += "<path transform='translate(6,6)' style='stroke: #fff;shape-rendering: crispEdges;fill:" + bgcolor + "' d='" + $$.symbol[config.legend_shape || "square"] + "'></path>";
            text += "</g></svg>&nbsp;" + name + "</td>";
            text += "<td class='value'>" + value + "</td>";
            text += "</tr>";
        }
    }
    return text + "</table>";
};
Tooltip.prototype.tooltipPosition = function (dataToShow, tWidth, tHeight, element) {
    var $$ = this, config = $$.config, d3 = $$.d3;
    var svgLeft, tooltipLeft, tooltipRight, tooltipTop, chartRight;
    var forArc = $$.hasType("arc") || $$.hasType("tree"),
        forMap = $$.hasMapType && $$.hasMapType(),
        forTreeMap = $$.hasTreeMapType && $$.hasTreeMapType(),
        forCloud = $$.hasCloudType && $$.hasCloudType(),
        mouse = d3.mouse(element);

    //TODO:新增图形后需要在此处添加逻辑判断，待实现动态的处理tooltip坐标计算方式

    // Determin tooltip position
    if (forArc) {
        tooltipLeft = (($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2) + mouse[0];
        tooltipTop = ($$.height / 2) + mouse[1] + 20;

        if (config.pie_split) {
            tooltipLeft += d3.transform(d3.select(element.parentElement.parentElement).attr("transform")).translate[0];
        }
    } else if (forMap || forTreeMap || forCloud){
        tooltipLeft = mouse[0] + tWidth / 2;
        tooltipTop = mouse[1] + 20;
    } else {
        svgLeft = $$.getSvgLeft(true);
        if (config.axis_rotated) {
            tooltipLeft = svgLeft + mouse[0] + 100;
            tooltipRight = tooltipLeft + tWidth;
            chartRight = $$.currentWidth - $$.getCurrentPaddingRight();
            tooltipTop = $$.x(dataToShow[0].x) + 20;
        } else {
            tooltipLeft = svgLeft + $$.getCurrentPaddingLeft(true) + $$.x(dataToShow[0].x) + 20;
            tooltipRight = tooltipLeft + tWidth;
            chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight();
            tooltipTop = mouse[1] + 15;
        }

        if (tooltipRight > chartRight) {
            // 20 is needed for Firefox to keep tooletip width
            tooltipLeft -= tooltipRight - chartRight + 20;
        }
        if (tooltipTop + tHeight > $$.currentHeight) {
            tooltipTop -= tHeight + 30;
        }
    }
    if (tooltipTop < 0) {
        tooltipTop = 0;
    }
    return { top: tooltipTop, left: tooltipLeft };
};
Tooltip.prototype.showTooltip = function (selectedData, element) {
    var $$ = this, config = $$.config;
    var tWidth, tHeight, position;
    var forArc = $$.hasType("arc"),
        dataToShow = selectedData.filter(function (d) { return d && utility.isValue(d.value); }),
        positionFunction = config.tooltip_position || $$.tooltipPosition;

    if (dataToShow.length === 0 || !config.tooltip_show) {
        return;
    }
    $$.tooltip.html(config.tooltip_contents.call($$, selectedData, $$.axis ? $$.axis.getXAxisTickFormat() : null, $$.getYFormat(forArc), $$.color)).style("display", "block");

    // Get tooltip dimensions
    tWidth = $$.tooltip.property('offsetWidth');
    tHeight = $$.tooltip.property('offsetHeight');

    position = positionFunction.call(this, dataToShow, tWidth, tHeight, element);
    // Set tooltip
    $$.tooltip
        .style("top", position.top + "px")
        .style("left", position.left + 'px');
};
Tooltip.prototype.hideTooltip = function () {
    this.tooltip.style("display", "none");
};

module.exports = Tooltip;