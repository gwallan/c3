var _ = require("underscore"),
    utility = require("./utility");

function Text(owner){
    owner.config = _.extend(owner.config, owner.convert({

    }));
    owner.CLASS = _.extend(owner.CLASS, {
        chartText: 'c3-chart-text',
        chartTexts: 'c3-chart-texts',
        text: 'c3-text',
        texts: 'c3-texts'
    });
}

Text.prototype.initText = function () {
    var $$ = this;

    $$.main
        .select('.' + $$.CLASS.chart).append("g")
        .attr("class", $$.CLASS.chartTexts);
    $$.mainText = $$.d3.selectAll([]);
};
Text.prototype.updateTargetsForText = function (targets) {
    var $$ = this, mainTextUpdate, mainTextEnter,
        classChartText = $$.classChartText.bind($$),
        classTexts = $$.classTexts.bind($$),
        classFocus = $$.classFocus.bind($$);

    mainTextUpdate = $$.main.select('.' + $$.CLASS.chartTexts).selectAll('.' + $$.CLASS.chartText)
        .data(targets)
        .attr('class', function (d) { return classChartText(d) + classFocus(d); });
    mainTextEnter = mainTextUpdate.enter().append('g')
        .attr('class', classChartText)
        .style('opacity', 0)
        .style("pointer-events", "none");
    mainTextEnter.append('g')
        .attr('class', classTexts);
};
Text.prototype.updateText = function (durationForExit) {
    var $$ = this, config = $$.config,
        barOrLineData = $$.barOrLineData.bind($$),
        classText = $$.classText.bind($$);

    $$.mainText = $$.main.selectAll('.' + $$.CLASS.texts).selectAll('.' + $$.CLASS.text)
        .data(barOrLineData);
    $$.mainText.enter().append('text')
        .attr("class", classText)
        .attr('text-anchor', function (d) { return config.axis_rotated ? (d.value < 0 ? 'end' : 'start') : 'middle'; })
        .style("stroke", 'none')
        .style("fill", function (d) { return $$.color(d); })
        .style("fill-opacity", 0);
    $$.mainText
        .text(function (d, i, j) { return $$.dataLabelFormat(d.id)(d.value, d.id, i, j); });
    $$.mainText.exit()
        .transition().duration(durationForExit)
        .style('fill-opacity', 0)
        .remove();
};
Text.prototype.redrawText = function (xForText, yForText, forFlow, withTransition) {
    var $$ = this, config = $$.config;

    return [
        (withTransition ? this.mainText.transition() : this.mainText)
            .attr('x', xForText)
            .attr('y', yForText)
            .style("fill", config.data_labels.color || this.color)
            .style("fill-opacity", forFlow ? 0 : this.opacityForText.bind(this))
    ];
};
Text.prototype.getTextRect = function (text, cls) {
    var dummy = this.d3.select('body').append('div').classed('c3', true),
        svg = dummy.append("svg").style('visibility', 'hidden').style('position', 'fixed').style('top', 0).style('left', 0),
        rect;

    svg.selectAll('.dummy')
        .data([text])
      .enter().append('text')
        .classed(cls ? cls : "", true)
        .text(text)
      .each(function () { rect = this.getBoundingClientRect(); });
    dummy.remove();
    return rect;
};
Text.prototype.generateXYForText = function (areaIndices, barIndices, lineIndices, forX) {
    var $$ = this,
        getAreaPoints = $$.generateGetAreaPoints && $$.generateGetAreaPoints(areaIndices, false),
        getBarPoints = $$.generateGetBarPoints && $$.generateGetBarPoints(barIndices, false),
        getLinePoints = $$.generateGetLinePoints && $$.generateGetLinePoints(lineIndices, false),
        getter = forX ? $$.getXForText : $$.getYForText;

    return function (d, i) {
        var getPoints = $$.isType(d, "area") ? getAreaPoints : $$.isType(d, "bar") ? getBarPoints : getLinePoints;
        return getter.call($$, getPoints(d, i), d, this);
    };
};
Text.prototype.getXForText = function (points, d, textElement) {
    var $$ = this,
        box = textElement.getBoundingClientRect(), xPos, padding;

    if ($$.config.axis_rotated) {
        padding = $$.isBarType(d) ? 4 : 6;

        if($$.isBarType(d) && $$.config.data_labels.position == "center"){
            xPos = (points[2][1] - points[0][1])/2 - box.width/2 + points[0][1];
        }else{
            xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
        }
    } else {
        xPos = $$.hasType('bar') ? (points[2][0] + points[0][0]) / 2 : points[0][0];
    }
    // show labels regardless of the domain if value is null
    if (d.value === null) {
        if (xPos > $$.width) {
            xPos = $$.width - box.width;
        } else if (xPos < 0) {
            xPos = 4;
        }
    }
    return xPos;
};
Text.prototype.getYForText = function (points, d, textElement) {
    var $$ = this,
        box = textElement.getBoundingClientRect(),
        yPos;
    if ($$.config.axis_rotated) {
        yPos = (points[0][0] + points[2][0] + box.height * 0.6) / 2;
    } else {
        yPos = points[2][1];
        if (d.value < 0) {
            yPos += box.height;
            if ($$.isType(d, "bar") && $$.isSafari()) {
                yPos -= 3;
            }
            else if (!$$.isType(d, "bar") && $$.isChrome()) {
                yPos += 3;
            }
        } else {
            yPos += $$.isType(d, "bar") ? -3 : -6;
        }
    }
    // show labels regardless of the domain if value is null
    if (d.value === null && !$$.config.axis_rotated) {
        if (yPos < box.height) {
            yPos = box.height;
        } else if (yPos > this.height) {
            yPos = this.height - 4;
        }
    }
    return yPos;
};
Text.prototype.opacityForText = function () {
    return this.hasDataLabel() ? 1 : 0;
};
Text.prototype.classText = function (d) {
    return this.generateClass(this.CLASS.text, d.index);
};
Text.prototype.classTexts = function (d) {
    return this.generateClass(this.CLASS.texts, d.id);
};

module.exports = Text;