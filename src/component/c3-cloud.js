var cloud = require("d3-cloud");
var c3 = require("../c3"),
    utility = require("../utility"),
    Tooltip = require("../tooltip"),
    Text = require("../text");

function C3Cloud() {
    var self = this;

    return {
        initCloud: function(){
            var $$ = this,
                fontSizeMin = $$.config.cloud_size_min,
                fontSizeMax = $$.config.cloud_size_max,
                domainMin = $$.config.cloud_domain_min || d3.min(this.data.origin, function(obj){return obj.count}),
                domainMax = $$.config.cloud_domain_max || d3.max(this.data.origin, function(obj){return obj.count}),
                fontSize;

            if((domainMax - domainMin) <= (fontSizeMax - fontSizeMin)){
                fontSizeMax = parseInt((fontSizeMax - fontSizeMin)/2 + fontSizeMin + (domainMax - domainMin)/2);
                fontSizeMin = parseInt((fontSizeMax - fontSizeMin)/2 + fontSizeMin + (domainMax - domainMin)/2);
            }

            fontSize = d3.scale.log().domain([domainMin, domainMax]).range([fontSizeMin, fontSizeMax])

            $$.main.select('.' + $$.CLASS.chart)
                .append("g")
                .attr("class", this.CLASS.chartCloud);
                // .attr("transform", "translate(" + $$.currentWidth/2 + "," + $$.currentHeight/2 + ")");
            $$.cloud = cloud()
                .timeInterval(10)
                .rotate(function(d) {
                    // if(d.count > 60)
                    //     return 0;
                    // else
                    //     return 0 - ~~(Math.random()*2) * 90;
                    return Math.round(Math.random()) * 90;
                })
                .font($$.config.cloud_label_font)
                .fontSize(function(d,i) { return fontSize(d.count); })
                .text(function(d) { return d.lemma; });
        },
        hasCloudType: function(targets){
            return this.hasType('cloud', targets);
        },
        iscloudType: function (d) {
            var id = this.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'Cloud';
        },
        classChartCloud: function (d) {
            return this.CLASS.chartCloud + this.classTarget(d.id);
        },
        updateTargetsForCloud: function(targets){

        },
        redrawCloud: function(){
            var $$ = this,
                ratio = ($$.data.origin.length - 10) * 0.01 + 0.45,
                width = $$.currentWidth - $$.getCurrentPaddingLeft() - $$.getCurrentPaddingRight(),
                height = $$.currentHeight - $$.getCurrentPaddingTop() - $$.getCurrentPaddingBottom(),
                main = $$.main;

            if($$.config.cloud_ratio){
                ratio = $$.config.cloud_ratio;
            }else{
                if($$.data.origin.length <= 10)
                    ratio = .7;
                else if($$.data.origin.length > 85)
                    ratio = 1;
            }

            main
                .select("." + this.CLASS.chartCloud)
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

            console.log($$.data.origin)
            $$.cloud
                .size([width * ratio, height * ratio])
                .words($$.data.origin)
                .on("end", function(words) {
                    var enterG, enterText, enterRect, batchSize = 20;

                    if(!words)return;

                    main.select('.' + $$.CLASS.chartCloud).selectAll('.' + $$.CLASS.chartCloudNode).remove();

                    enterG = main.select('.' + $$.CLASS.chartCloud)
                        .selectAll('.' + $$.CLASS.chartCloudNode)
                        .data(words)
                        .enter().append("g")
                        .attr('class', $$.CLASS.chartCloudNode)
                        .style('cursor', 'pointer');
                    // enterRect = enterG.append("rect")
                    //     .style('cursor', 'pointer')
                    //     .style('fill', 'transparent');
                    enterText = enterG.append("text")
                        .style("font-family", function(d) { return d.font; })
                        .style("font-size", function(d) { return d.size + "px"; })
                        .style("fill", function(d) {
                            return $$.config.cloud_label_color ? $$.config.cloud_label_color.call($$, d) : $$.color(d.lemma);
                        })
                        .attr("text-anchor", "middle")
                        .text(function(d) { return d.text; })
                        .on("click", function(d){
                            if ($$.config.data_onclick) {
                                $$.config.data_onclick.call($$, d, this);
                            }
                        });
                    // if($$.config.cloud_title_show)
                    //     enterText.append("title").text(function(d){return d.count});
                    // updateText = $$.main.select('.' + $$.CLASS.chartCloud)
                    //     .selectAll('.' + $$.CLASS.chartCloudNode)
                    //     .transition()
                    //     .duration(450)
                    //     .attr("transform", function(d) {
                    //         return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
                    //     });

                    function drawBatch(batchNumber) {
                        return function() {
                            var startIndex = batchNumber * batchSize;
                            var stopIndex = Math.min(words.length, startIndex + batchSize);
                            var updateTextSelection = d3.selectAll(enterText[0].slice(startIndex, stopIndex));
                            // var updateRectSelection = d3.selectAll(enterRect[0].slice(startIndex, stopIndex));

                            updateTextSelection
                                .attr("transform", function(d) {
                                    return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
                                })
                                .each(function(){
                                    if($$.config.cloud_label_highlight_color && $$.config.cloud_label_highlight_text.indexOf(this.innerHTML) > -1)
                                        this.style.fill = $$.config.cloud_label_highlight_color;
                                });
                            // updateRectSelection
                            //     .attr("transform", function(d) {
                            //         return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
                            //     })
                            //     .attr("width", function(){
                            //         var box = this.nextElementSibling.getBBox();
                            //         return box.width;
                            //     })
                            //     .attr("height", function(){
                            //         var box = this.nextElementSibling.getBBox();
                            //         return box.height;
                            //     })
                            //     .attr('x', function(){
                            //         return 0 - parseFloat(this.getAttribute("width"))/2;
                            //     })
                            //     .attr('y', function(){
                            //         return 0 - parseFloat(this.getAttribute("height"))/2 - 4;
                            //     });

                            if (stopIndex >= words.length) {
                            } else {
                                setTimeout(drawBatch(batchNumber + 1), 0);
                            }
                        };
                    }

                    setTimeout(drawBatch(0), 0);
                })
                .start();
        }
    }
}
C3Cloud.prototype = {
    "filter": function(text){
        if(text.length && typeof text == "string")
            text = [text];
    }
};

c3.register("cloud", [Tooltip, Text], {
    CLASS: {
        chartCloud: "c3-chart-cloud",
        chartCloudNode: "c3-chart-cloud-word"
    },
    config: {
        cloud: {
            ratio: 1,
            size: {
                min: 12,
                max: 40
            },
            domain: {
                min: null,
                max: null
            },
            label: {
                font: "monospace",
                color: null,
                highlight: {
                    text: null,
                    color: null
                }
            }
        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Cloud);

module.exports = c3;