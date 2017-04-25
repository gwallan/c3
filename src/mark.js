var _ = require("underscore"),
    utility = require("./utility");

var config = {
    max: {
        show: false,
        position: "top",
        text: {
            color: null,
            size: null,
            content: null
        },
        outline: null
    },
    min: {
        show: false,
        position: "top",
        text: {
            color: null,
            size: null,
            content: null
        },
        outline: null
    }
};
var CLASS = {
    markContainer: "c3-mark-container",
    mark: "c3-mark"
};

function Mark(owner) {
    this.owner = owner;

    owner.MergeRecursive(owner.config, owner.convert({mark: config}));
    owner.MergeRecursive(owner.CLASS, CLASS);

    owner.mark = this;
}
Mark.prototype = {
    init: function(){
        var $$ = this.owner, config = $$.config, main = $$.main;

        this.markContainer = $$.svg
            .append("g")
            .attr('class', CLASS.markContainer)
            .style("pointer-events", "none")
            .style("display", "none");
    },
    redraw: function(){
        var self = this, $$ = this.owner, config = $$.config, main = $$.main;
        var hasMax = config.mark_max_show, hasMin = config.mark_min_show, max = [], min = [], group;

        //不支持非二维坐标系下图形的mark绘制
        if(!$$.data.origin.length)
            return;

        if(_.keys($$.data.xs).length > 1){
            group = $$.data.origin.map(function(obj, i){
                var data = main.selectAll("circle.c3-shape-" + i).data(),
                    sum = _.reduce(data, function(a, b){ return a + b.value; }, 0);

                return {
                    sum: sum,
                    data: data,
                    index: i
                };
            });

            if(hasMax){
                max = _.max(group, function(obj){return obj.sum});
                max = max.data.map(function(d){d.type = "max";return d;});
            }
            if(hasMin){
                min = _.min(group, function(obj){return obj.sum});
                min = min.data.map(function(d){d.type = "min";return d;});
            }
        }else{
            main.selectAll(".c3-circles").each(function(d, i){
                if(hasMax){
                    max.push(_.max(d.values, function(circle){ return circle.value; }));
                    max.forEach(function(d){
                        d.type = "max";
                    });
                }
                if(hasMin){
                    min.push(_.min(d.values, function(circle){ return circle.value; }));
                    max.forEach(function(d){
                        d.type = "min";
                    });
                }
            });
        }

        if(max.length || min.length){
            this.markContainer.style("display", "block");
        }

        $$.selectChart.select('.' + CLASS.markContainer)
            .selectAll('.' + CLASS.mark)
        	.data(max.concat(min))
        	.enter()
        	.append("text")
        	.attr('class', CLASS.mark)
            .call(function(selection){
                selection
                    .style("color", function(d){
                        if(d.type == "max" && hasMax){
                            return config.mark_max_text_color;
                        }else{
                            return config.mark_min_text_color;
                        }
                    })
                    .style("font-size", function(d){
                        if(d.type == "max" && hasMax){
                            return config.mark_max_text_size;
                        }else{
                            return config.mark_min_text_size;
                        }
                    })
                    .text(function(d){
                        if(d.type == "max" && hasMax){
                            return utility.isFunction(config.mark_max_text_content) ? config.mark_max_text_content.call(null, d) : config.mark_max_text_content;
                        }else{
                            return utility.isFunction(config.mark_min_text_content) ? config.mark_min_text_content.call(null, d) : config.mark_min_content;
                        }
                    })
            });
        $$.selectChart.selectAll('.' + CLASS.mark)
            .each(function(d){
                var ele = main.selectAll(".c3-circles-" + d.id).select(".c3-circle-" + d.index),
                    rectCircle = ele.node().getBoundingClientRect(),
                    rectSvg = $$.svg.node().getBoundingClientRect(),
                    rect = this.getBoundingClientRect(),
                    x = 0, y = 0;

                if(!rectCircle || !rectSvg)return;

                if(d.type == "max"){
                    x = (config.mark_max_position == "left" ? rectCircle.left - rectSvg.left - rect.width : config.mark_max_position == "right" ? rectCircle.left - rectSvg.left + rect.width/2 : rectCircle.left - rectSvg.left - rect.width/2) + "px";
                    y = (config.mark_max_position == "top" ? rectCircle.top - rectSvg.top - 5 : config.mark_max_position == "bottom" ? rectCircle.top - rectSvg.top + 20 : rectCircle.top - rectSvg.top + rect.height/2) + "px";
                }
                if(d.type == "min"){
                    x = (config.mark_min_position == "left" ? rectCircle.left - rectSvg.left - rect.width : config.mark_min_position == "right" ? rectCircle.left - rectSvg.left + rect.width/2 : rectCircle.left - rectSvg.left - rect.width/2) + "px";
                    y = (config.mark_min_position == "top" ? rectCircle.top - rectSvg.top - 5 : config.mark_min_position == "bottom" ? rectCircle.top - rectSvg.top + 20 : rectCircle.top - rectSvg.top + rect.height/2) + "px";
                }

                this.setAttribute("x", x);
                this.setAttribute("y", y);
            });
    }
};

module.exports = Mark;