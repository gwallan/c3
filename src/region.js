var _ = require("underscore");
var utility = require("./utility");

function Region(owner){
    owner.config = _.extend(owner.config, owner.convert({
        regions: {}
    }));
    owner.CLASS = _.extend(owner.CLASS, {
        region: 'c3-region',
        regions: 'c3-regions',
    });
}

Region.prototype.initRegion = function () {
    var $$ = this;
    $$.region = $$.main.append('g')
        .attr("clip-path", $$.clipPath)
        .attr("class", $$.CLASS.regions);
};
Region.prototype.updateRegion = function (duration) {
    var $$ = this, config = $$.config, data = config.regions;

    if(data && !data.length){
        data = this.getOtherTargetXs();
        data = data.map(function(v, i){
            if(config.regions["odd"] && i%2 == 1)
                return $$.isCategorized() ? {start: v - 0.5, end: v - 0.5 + 1, class: config.regions["odd"]} : {start: v, end: data[i + 1], class: config.regions["odd"]};
            else if(config.regions["even"] && i%2 == 0)
                return $$.isCategorized() ? {start: v - 0.5, end: v - 0.5 + 1, class: config.regions["even"]} : {start: v, end: data[i + 1], class: config.regions["even"]}
        }).filter(function(o){
            return o;
        });
    }

    // hide if arc type
    $$.region.style('visibility', $$.hasType("arc") ? 'hidden' : 'visible');

    $$.mainRegion = $$.main.select('.' + $$.CLASS.regions).selectAll('.' + $$.CLASS.region)
        .data(data);
    $$.mainRegion.enter().append('g')
        .attr('class', $$.classRegion.bind($$))
      .append('rect')
        .style("fill-opacity", 0);
    $$.mainRegion.exit().transition().duration(duration)
        .style("opacity", 0)
        .remove();
};
Region.prototype.redrawRegion = function (withTransition) {
    var $$ = this,
        regions = $$.mainRegion.selectAll('rect'),
        x = $$.regionX.bind($$),
        y = $$.regionY.bind($$),
        w = $$.regionWidth.bind($$),
        h = $$.regionHeight.bind($$);

    return [
        (withTransition ? regions.transition() : regions)
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h)
            .style("fill-opacity", function (d) { return utility.isValue(d.opacity) ? d.opacity : 0.1; })
    ];
};
Region.prototype.regionX = function (d) {
    var $$ = this, config = $$.config,
        xPos, yScale = d.axis === 'y' ? $$.y : $$.y2;

    if (d.axis === 'y' || d.axis === 'y2') {
        xPos = config.axis_rotated ? ('start' in d ? yScale(d.start) : 0) : 0;
    } else {
        xPos = config.axis_rotated ? 0 : ('start' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0);
    }
    return xPos;
};
Region.prototype.regionY = function (d) {
    var $$ = this, config = $$.config,
        yScale = d.axis === 'y' ? $$.y : $$.y2, offset = config.axis_y_label ? !config.axis_rotated ? $$.yMax : $$.xMax : $$.yMax, yPos;

    if (d.axis === 'y' || d.axis === 'y2') {
        yPos = config.axis_rotated ? 0 : ('end' in d ? yScale(d.end) : 0);
    } else {
        yPos = config.axis_rotated ? ('start' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0 + offset) : 0 + offset;
    }
    return yPos;
};
Region.prototype.regionWidth = function (d) {
    var $$ = this, config = $$.config,
        start = $$.regionX(d), end, yScale = d.axis === 'y' ? $$.y : $$.y2;

    if (d.axis === 'y' || d.axis === 'y2') {
        end = config.axis_rotated ? ('end' in d ? yScale(d.end) : $$.width) : $$.width;
    } else {
        end = config.axis_rotated ? $$.width : ('end' in d && d['end'] ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.width);
    }
    return end < start ? 0 : end - start;
};
Region.prototype.regionHeight = function (d) {
    var $$ = this, config = $$.config,
        start = this.regionY(d), end, yScale = d.axis === 'y' ? $$.y : $$.y2, offset = config.axis_y_label ? 10 : 0;

    if (d.axis === 'y' || d.axis === 'y2') {
        end = config.axis_rotated ? $$.height : ('start' in d ? yScale(d.start) : $$.height);
    } else {
        end = config.axis_rotated ? ('end' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.height) : $$.height;
    }
    return end < start ? 0 : end - start;
};
Region.prototype.isRegionOnX = function (d) {
    return !d.axis || d.axis === 'x';
};
Region.prototype.classRegion = function (d, i) {
    return this.generateClass(this.CLASS.region, i) + ' ' + ('class' in d ? d['class'] : '');
};

module.exports = Region;