var utility = require("./utility");

var APIAxis = function () { };

APIAxis.prototype.axis = {};

APIAxis.prototype.axis.labels = function (labels) {
    var $$ = this.internal;
    if (arguments.length) {
        Object.keys(labels).forEach(function (axisId) {
            $$.axis.setLabelText(axisId, labels[axisId]);
        });
        $$.axis.updateLabels();
    }
    // TODO: return some values?
};
APIAxis.prototype.axis.max = function (max) {
    var $$ = this.internal, config = $$.config;
    if (arguments.length) {
        if (typeof max === 'object') {
            if (utility.isValue(max.x)) { config.axis_x_max = max.x; }
            if (utility.isValue(max.y)) { config.axis_y_max = max.y; }
            if (utility.isValue(max.y2)) { config.axis_y2_max = max.y2; }
        } else {
            config.axis_y_max = config.axis_y2_max = max;
        }
        $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true });
    } else {
        return {
            x: config.axis_x_max,
            y: config.axis_y_max,
            y2: config.axis_y2_max
        };
    }
};
APIAxis.prototype.axis.min = function (min) {
    var $$ = this.internal, config = $$.config;
    if (arguments.length) {
        if (typeof min === 'object') {
            if (utility.isValue(min.x)) { config.axis_x_min = min.x; }
            if (utility.isValue(min.y)) { config.axis_y_min = min.y; }
            if (utility.isValue(min.y2)) { config.axis_y2_min = min.y2; }
        } else {
            config.axis_y_min = config.axis_y2_min = min;
        }
        $$.redraw({ withUpdateOrgXDomain: true, withUpdateXDomain: true });
    } else {
        return {
            x: config.axis_x_min,
            y: config.axis_y_min,
            y2: config.axis_y2_min
        };
    }
};
APIAxis.prototype.axis.range = function (range) {
    if (arguments.length) {
        if (utility.isDefined(range.max)) { this.axis.max(range.max); }
        if (utility.isDefined(range.min)) { this.axis.min(range.min); }
    } else {
        return {
            max: this.axis.max(),
            min: this.axis.min()
        };
    }
};

module.exports = new APIAxis();