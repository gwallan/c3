var c3 = require("./../c3"),
    utility = require("./../utility"),
    Tooltip = require("./../tooltip"),
    Text = require("./src/text");

function C3Tree() {
    return {
        initTree: function () {
            var $$ = this, d3 = $$.d3, radius = (Math.min($$.width, $$.height) / 2) - 10;

            $$.partition = d3.layout.partition()
                .size([2 * Math.PI, radius])
                .value(function(d) { return d.size; });
            $$.trees = $$.main.select('.' + $$.CLASS.chart).append("g")
                .attr("class", $$.CLASS.chartTree)
                .attr("transform", $$.getTranslate('arc'));
        },
        hasTreeType: function (targets) {
            return this.hasType('tree', targets);
        },
        redrawTree: function (duration, durationForExit, withTransform) {
            var $$ = this, d3 = $$.d3, config = $$.config, main = this.main, mainTree;
            var formatNumber = d3.format(",d");
            var radius = (Math.min($$.width, $$.height) / 2) - 10;
            var arc = d3.svg.arc()
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx ; })
                .innerRadius(function(d) { return radius / 4 * d.depth; })
                .outerRadius(function(d) { return radius / 4 * (d.depth + 1); });
            var totalSize, data, nodes;

            function fill(d) {
                var p = d, c;

                while (p.depth > 1)
                    p = p.parent;

                if(d.depth == 0 || d.parent.depth == 0)
                    return $$.color(p.name);
                else{
                    c = d3.lab($$.color(p.name));
                    c.l = (1 + d.depth*1.5/10) * c.l;

                    return c;
                }
            }
            function key(d) {
                var k = [], p = d;
                while (p.depth) k.push(p.name + "|" + p.id), p = p.parent;
                return k.reverse().join(".");
            }
            function arcTween(b) {
                var i = d3.interpolate(this._current, b);

                this._current = i(0);
                return function(t) {
                    return arc(i(t));
                };
            }
            function updateArc(d) {
                return {depth: d.depth, x: d.x, dx: d.dx};
            }
            function zoom(root, p) {
                // if (document.documentElement.__transition__) return;

                // Rescale outside angles to match the new layout.
                var enterArc,
                    exitArc,
                    outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

                function insideArc(d) {
                    return p.key > d.key
                      ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
                      ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
                      : {depth: 0, x: 0, dx: 2 * Math.PI};
                }
                function outsideArc(d) {
                    return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
                }

                main.selectAll('.' + $$.CLASS.chartTree)
                    .selectAll('.' + $$.CLASS.treeRoot)
                    .datum(root);

                // When zooming in, arcs enter from the outside and exit to the inside.
                // Entering outside arcs start from the old layout.
                if (root === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);
                // When zooming out, arcs enter from the inside and exit to the outside.
                // Exiting outside arcs transition to the new layout.
                if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

                mainTree = main.selectAll('.' + $$.CLASS.chartTree).selectAll("path");
                mainTree = mainTree.data($$.partition.nodes(root).slice(1), function(d) { return d.key; });
                d3.transition().duration(1500).each(function() {
                    mainTree.exit().transition()
                        .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
                        .remove();
                    mainTree.enter().append("path")
                        .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
                        .style("fill", function(d) { return d.fill; })
                        .on("click", function(p){
                            if (p.depth > 1) p = p.parent;
                            if (!p.children) return;
                            zoom(p, p);

                            $$.legend
                                .selectAll('.' + $$.CLASS.legendItem)
                                .attr("style","visibility: visible; cursor: pointer;")
                                .classed($$.CLASS.legendItemHidden, function (id) { return id !== p.key.split(".")[0].split("|")[0]; });
                        })
                        .on("mouseover", over)
                        .each(function(d) { this._current = enterArc(d); })
                        .attr("class", function(d){
                            return $$.CLASS.treeNode + " " + d.key.split(".")[0].split("|")[0];
                        });
                    mainTree.transition()
                        .style("fill-opacity", 1)
                        .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
                });
            }
            function over(d){
                var percentage = (100 * d.value / nodes[0].sum).toPrecision(3);
                var percentageString = percentage + "%";
                var sequenceArray = getAncestors(d);

                function getAncestors(node) {
                    var path = [];
                    var current = node;

                    while (current.parent) {
                        path.unshift(current);
                        current = current.parent;
                    }

                    return path;
                }

                if (percentage < 0.1) {
                    percentageString = "< 0.1%";
                }
                d.ratio = percentageString;

                // Fade all the segments.
                mainTree
                    .style("opacity", 0.3)
                    .filter(function(node) {
                        return (sequenceArray.indexOf(node) >= 0);
                    })
                    .style("opacity", 1);

                $$.showTooltip([d], this);
                $$.config.data_onmouseover();
            }

            nodes = $$.partition.nodes($$.data.origin);
            nodes.forEach(function(d) {
                d._children = d.children;
                d.id = d.id || d.name;
                d.sum = d.value;
                d.key = key(d);
                d.fill = fill(d);
            });

            if(duration){
                if($$.hiddenTargetIds.length){
                    data = $$.data.origin["children"].filter(function(target){
                        return $$.hiddenTargetIds.indexOf(target.name) > -1 ? false : true;
                    })[0];

                    zoom(data, data);
                }else
                    zoom($$.data.origin, $$.data.origin["children"][0]);
                return;
            }

            //绘制最内部同心圆并定义点击事件
            if(main.select($$.CLASS.treeRoot).length && main.select($$.CLASS.treeRoot)[0]) {
                main.selectAll('.' + $$.CLASS.chartTree)
                    .on("mouseleave", function(){
                        mainTree.style("opacity", 1);

                        $$.hideTooltip();
                        $$.config.data_onmouseout(this);
                    })
                    .append("circle")
                    .attr("r", radius / 2)
                    .attr("class", $$.CLASS.treeRoot)
                    .style("fill", "#fff")
                    .on("click", function(p){
                        if (!p || !p.parent)
                            return;
                        zoom(p.parent, p);

                        $$.legend
                            .selectAll('.' + $$.CLASS.legendItem)
                            .attr("style","visibility: visible; cursor: pointer;")
                            .classed($$.CLASS.legendItemHidden, function (id) {
                                if(p.parent.key)
                                    return id !== p.key.split(".")[0].split("|")[0];
                                return false;
                            });
                        if(!p.parent.key)
                            $$.hiddenTargetIds = [];
                    });
            }

            zoom($$.data.origin, $$.data.origin["children"][0]);
        }
    }
}

c3.register("tree", [Tooltip, Text], {
    CLASS: {
        chartTree: 'c3-chart-tree'
    },
    config: {
        tree: {

        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Tree);

module.exports = c3;