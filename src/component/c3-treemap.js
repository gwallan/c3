var c3 = require("./../c3"),
    Tooltip = require("./../tooltip"),
    Text = require("./../text");

function C3Treemap() {
    var self = this, treemapNodes, currentInfo;

    function toThousands(num) {
        var num = (num || 0).toString();

        if(num.indexOf(".") == -1)
            return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        else
            return num.substr(0, num.split(".")[0].length).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + num.split(".")[1];
    }

    this.getTreemapNodes = function(){
        return treemapNodes;
    };
    this.name = function(d) {
        var k = [], p = d;
        while (p.depth) k.push(p.name), p = p.parent;
        if(d.depth == 0)
            return d.name;
        return k.reverse().join("-");
    };
    this.root = function(d, depth){
        var p = d.parent;

        !depth && (depth = 0);
        if(p && p.parent && p.depth > depth)
            return this.root(p, depth);
        else if(p)
            return depth == d.depth ? d : p.depth <= depth ? p : null;
        return null;
    };
    this.reverse = function(d){
        if(d.parent && d.parent.parent){
            return this.reverse(d.parent);
        }else
            return d.name;
    };
    this.setCurrentInfo = function(key){
        currentInfo = key;
    };
    this.getCurrentInfo = function(key){
        return currentInfo;
    };

    return {
        initTreeMap: function(){
            var $$ = this;

            self.setCurrentInfo(null);

            $$.main.select('.' + $$.CLASS.chart)
                .append("g")
                .attr("class", this.CLASS.chartTreeMap);
        },
        hasTreeMapType: function(targets){
            return this.hasType('treemap', targets);
        },
        isTreeMapType: function (d) {
            var id = this.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'treemap';
        },
        classChartTreeMap: function (d) {
            return this.CLASS.chartTreeMap + this.classTarget(d.id);
        },
        updateTargetsForTreeMap: function(targets){

        },
        redrawTreeMap: function(){
            var $$ = this,
                data = self.getCurrentInfo() || $$.data.origin,
                treemapEnter;

            $$.treemap = d3.layout.treemap()
                .size([$$.currentWidth - $$.margin.left - $$.margin.right, $$.currentHeight - $$.margin.top - $$.margin.bottom])
                .sticky(false)
                .value(function(d) { return d.value; });

            treemapNodes = $$.main.select("." + this.CLASS.chartTreeMap)
                .selectAll("." + this.CLASS.chartTreeMapNode)
                .data($$.treemap(data), function(d) { return d.name + d.value; });

            treemapEnter = treemapNodes.enter().append("g")
                .attr("class", function(d){
                    return $$.CLASS.chartTreeMapNode + " " + self.name(d);
                })
                .style("visibility", function(d){
                    if(typeof $$.config.treemap_hierarchy_show == "boolean")
                        return "visible";
                    else if(typeof $$.config.treemap_hierarchy_show == "number" && $$.config.treemap_hierarchy_show > 0)
                        return d.depth == $$.config.treemap_hierarchy_show || (!d.children && d.depth <= $$.config.treemap_hierarchy_show) ? "visible" : "hidden";
                    else
                        "hidden";
                })
                .each(function(d, i){
                    var r = self.root(d);
                    d.id = d.name;
                    d.percentage = r ? (100 * d.value / r.value).toPrecision(2) + "%" : "100%";
                });
            treemapEnter.on('mouseover', function (d) {
            }).on('mousemove', function (d) {
                $$.showTooltip([d], this);
            }).on('mouseout', function (d) {
                $$.hideTooltip();
            }).on("click", function(d){
                $$.config.data_onclick && $$.config.data_onclick.apply($$.api, arguments);
            });

            treemapEnter.append("rect");
            var treemapRectEnter = treemapNodes.select("rect");
            var treemapRectUpdate = treemapNodes.select("rect");
            treemapRectEnter
                .attr("fill", function(d) {
                    var r = self.root(d, 1);

                    if(d.depth == 0)return null;
                    if($$.d3.select(this.parentElement).style("visibility") == "hidden")
                        return $$.color(self.reverse(d));
                    return $$.color(r ? r.name : d.parent.name);
                })
                .style("stroke", "white")
                .style("stroke-width", 1);
            treemapRectUpdate
                .attr("width", 0)
                .attr("height", 0)
                .transition()
                .duration($$.config.transition_enabled ? $$.config.transition_duration : 0)
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("width", function(d) { return d.dx; })
                .attr("height", function(d) { return d.dy; })
                .each("end", function(argument) {
                    var textRect = this.nextSibling.getBBox(),
                        containerRect = this.getBBox();

                        if(containerRect.width - textRect.width < 6 || containerRect.height - textRect.height < 6)
                            d3.select(this.nextSibling).style("opacity", 0).style("visibility", "hidden");
                        else
                            d3.select(this.nextSibling).style("opacity", 1).style("visibility", "visible");
                });

            var treemapTextEnter = treemapEnter.append("text");
            var treemapTextUpdate = treemapNodes.select("text");

            if(!$$.config.treemap_label_multiline){
                treemapTextEnter
                    .attr("fill", $$.config.treemap_label_color)
                    .text(function (d) {
                        return d.name + ":" + parseFloat(d.percentage) + "%";
                    })
                    .each(function(d){
                        var textRect = this.getBBox(),
                            containerRect = this.previousSibling.getBBox();

                        if(textRect.width >= containerRect.width || textRect.height >= containerRect.height)
                            d3.select(this).style("opacity", 0).style("visibility", "hidden");
                    });
                treemapTextUpdate
                    .attr("x", function(d) {
                        return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5;
                    })
                    .attr("y", function(d) {
                        return $$.config.treemap_label_center ? d.y + d.dy/2 + 6 : d.y + this.getBBox().height;
                    });
            }else{
                treemapTextEnter
                    .append("tspan")
                    .attr("class", $$.CLASS.chartTreeMapNodeTextByName)
                    .attr("fill", $$.config.treemap_label_color)
                    .text(function (d) {
                        return d.name;
                    });
                var treemapTextByNameUpdate = treemapNodes.select("." + $$.CLASS.chartTreeMapNodeTextByName);
                treemapTextByNameUpdate
                    .attr("x", function(d) {
                        return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5;
                    })
                    // .attr("y", function(d) {
                    //     return $$.config.treemap_label_center ? d.y + d.dy/2 : d.y + this.getBBox().height;
                    // })
                    .attr("dy", function(d) {
                        return 0;
                    });

                treemapTextEnter
                    .append("tspan")
                    .attr("class", $$.CLASS.chartTreeMapNodeTextByPercentage)
                    .attr("fill", $$.config.treemap_label_color)
                    .html(function (d) {
                        return "&#165;" + toThousands(d.value) + "W";
                    });
                var treemapTextByPercentageUpdate = treemapNodes.select("." + $$.CLASS.chartTreeMapNodeTextByPercentage);
                treemapTextByPercentageUpdate
                    .attr("x", function(d) {
                        return d3.select(this.previousSibling).attr("x");
                    })
                    // .attr("y", function(d) {
                    //     return $$.config.treemap_label_center ? d.y + d.dy/2 : d.y + this.getBBox().height;
                    // })
                    .attr("dy", function(d) {
                        return 14 + 5;
                    });

                treemapTextEnter
                    .append("tspan")
                    .attr("class", $$.CLASS.chartTreeMapNodeTextByValue)
                    .attr("fill", $$.config.treemap_label_color)
                    .text(function (d) {
                        return parseFloat(d.percentage) + "%";
                    });
                var treemapTextByValueUpdate = treemapNodes.select("." + $$.CLASS.chartTreeMapNodeTextByValue);
                treemapTextByValueUpdate
                    .attr("x", function(d) {
                        return d3.select(this.previousSibling).attr("x");
                    })
                    // .attr("y", function(d) {
                    //     return $$.config.treemap_label_center ? d.y + d.dy/2 : d.y + this.getBBox().height;
                    // })
                    .attr("dy", function(d) {
                        return 14 + 5;
                    });

                treemapTextUpdate
                     .attr("x", function(d) {
                        return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5;
                    })
                    .attr("y", function(d) {
                        return $$.config.treemap_label_center ? d.y + d.dy/2 - this.getBBox().height/4 : d.y + this.getBBox().height;
                    })
                    .each(function(d){
                        var textRect = this.getBBox(),
                            containerRect = this.previousSibling.getBBox();

                        d3.select(this).selectAll("tspan").attr("x", function(d) {
                            return $$.config.treemap_label_center ? d.x + d.dx/2 - textRect.width/2 : d.x + 5;
                        })
                        // .attr("y", function(d) {
                        //     return $$.config.treemap_label_center ? d.y + d.dy/2 - 14 : d.y + 5;
                        // });
                        if(containerRect.width - textRect.width < 6 || containerRect.height - textRect.height < 6)
                            d3.select(this).style("opacity", 0).style("visibility", "hidden");
                    });
            }
        }
    }
}
C3Treemap.prototype = {
    "level": function(data, depth, draw){
        var $$ = this.internal, self = this, treemapNodes = this.getTreemapNodes(), isRoot;

        if($$.isString(data)){
            if(data.indexOf(".") == -1)
                data = "." + data;
            data = $$.d3.select(data).data()[0];
        }
        if(!data || !data.children)
            return;

        self.setCurrentInfo(data);

        //重置颜色创建函数
        $$.color = $$.generateColor();

        isRoot = !data.parent ? true : false
        treemapNodes = $$.main.selectAll("." + $$.CLASS.chartTreeMapNode)
            .data($$.treemap(data).slice(1), function(d) { return d.name + d.value; });

        treemapNodes
            .each(function(d, i){
                var r = self.root(d);
                d.id = d.name;
                d.percentage = r ? (100 * d.value / r.value).toPrecision(2) + "%" : "100%";
            })
            .style("visibility", function(d){
                if(typeof depth == "boolean")
                    return "visible";
                else if(typeof depth == "number" && depth > 0)
                    return d.depth == depth || (!d.children && d.depth <= depth) ? "visible" : "hidden";
                else
                    "hidden";
            });
        treemapNodes.exit().style("visibility", "hidden")
            .selectAll("text").style("opacity", 0).style("visibility", "hidden");

        treemapNodes.selectAll("rect")
            .attr("fill", function(d) {
                var r = self.root(d, 1),
                    name = self.reverse(data);

                return $$.color(r ? r.name : d.parent.name);
                // if($$.d3.select(this.parentElement).style("visibility") != "hidden"){
                //     return $$.color(r ? r.name : d.parent.name);
                // }else{
                //     return $$.color(r ? r.name : d.parent.name);
                // }
                // return $$.color(isRoot ? r ? r.name : d.parent.name : name);
            })
            .attr("width", 0)
            .attr("height", 0)
            .transition()
            .duration(750)
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.dx; })
            .attr("height", function(d) { return d.dy; })
            .style("stroke", "white")
            .style("stroke-width", 1)
            .each("end", function(d){
                if(!$$.config.treemap_label_multiline){
                    d3.select(this.nextSibling)
                        .attr("x", function() {
                            return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5; })
                        .attr("y", function() {
                            return $$.config.treemap_label_center ? d.y + d.dy/2 + 6 : d.y + this.getBBox().height; })
                        .each(function(){
                            var textRect = this.getBBox(),
                                containerRect = this.previousSibling.getBBox();

                            if(textRect.width <= containerRect.width && textRect.height <= containerRect.height)
                                d3.select(this).style("opacity", 1).style("visibility", "visible");
                        });
                    }else{
                        treemapNodes
                            .selectAll("." + $$.CLASS.chartTreeMapNodeTextByName)
                            .attr("x", function(d) {
                                return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5;
                            })
                            .attr("y", function(d) {
                                return $$.config.treemap_label_center ? d.y + d.dy/2 - 10 : d.y + this.getBBox().height;
                            });
                        treemapNodes
                            .selectAll("." + $$.CLASS.chartTreeMapNodeTextByPercentage)
                            .attr("x", function(d) {
                                return d3.select(this.previousSibling).attr("x");
                            })
                            .attr("y", function(d) {
                                return $$.config.treemap_label_center ? d.y + d.dy/2 - 10 : d.y + this.getBBox().height;
                            });
                        treemapNodes
                            .selectAll("." + $$.CLASS.chartTreeMapNodeTextByValue)
                            .attr("x", function(d) {
                                return d3.select(this.previousSibling).attr("x");
                            })
                            .attr("y", function(d) {
                                return $$.config.treemap_label_center ? d.y + d.dy/2 - 10 : d.y + this.getBBox().height;
                            });
                        d3.select(this.nextSibling)
                            .attr("x", function() {
                                return $$.config.treemap_label_center ? d.x + d.dx/2 - this.getBBox().width/2 : d.x + 5; })
                            .each(function(d){
                                var textRect = this.getBBox(),
                                    containerRect = this.previousSibling.getBBox();

                                d3.select(this).selectAll("tspan").attr("x", function(d) {
                                    return $$.config.treemap_label_center ? d.x + d.dx/2 - textRect.width/2 : d.y + 5;
                                }).attr("y", function(d) {
                                    return $$.config.treemap_label_center ? d.y + d.dy/2 - 14 : d.y + 5;
                                });
                                if(textRect.width + 6 <= containerRect.width && textRect.height + 6 <= containerRect.height)
                                    if(d3.select(this.parentElement).style("visibility") == "visible")
                                        d3.select(this).style("opacity", 1).style("visibility", "visible");
                                // else
                                //     d3.select(this).style("opacity", 0).style("visibility", "hidden");
                            });
                    }
            });

        treemapNodes.selectAll("text").style("opacity", 0).style("visibility", "hidden");

        return self.getCurrentInfo();
    }
};

c3.register("treemap", [Tooltip, Text], {
    CLASS: {
        chartTreeMap: "c3-chart-treemap",
        chartTreeMapNode: "c3-chart-treemap-node",
        chartTreeMapNodeTextByName: "node-name",
        chartTreeMapNodeTextByPercentage: "node-percentage",
        chartTreeMapNodeTextByValue: "node-value"
    },
    config: {
        treemap: {
            label: {
                show: true,
                center: true,//标签居中展示
                format: null,
                multiline: false,
                color: "#000"
            },
            hierarchy: {
                show: false//显示层级
            }
        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Treemap);

module.exports = c3;