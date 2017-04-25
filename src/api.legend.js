var utility = require("./utility");

var APILegend = function () { };

APILegend.prototype.legend = {};

APILegend.prototype.legend.show = function (targetIds) {
    var $$ = this.internal;
    $$.showLegend($$.mapToTargetIds(targetIds));
    $$.updateAndRedraw({ withLegend: true });
};
APILegend.prototype.legend.hide = function (targetIds) {
    var $$ = this.internal;
    $$.hideLegend($$.mapToTargetIds(targetIds));
    $$.updateAndRedraw({ withLegend: true });
};

module.exports = new APILegend();