var c3 = require("../c3"),
    utility = require("../utility"),
    Legend = require("../legend"),
    Tooltip = require("../tooltip"),
    Text = require("../text");

function C3Radar() {
    var self = this;

    return {
        initRadar: function(){
            var $$ = this;

            $$.main.select('.' + $$.CLASS.chart)
                .append("g")
                .attr("class", $$.CLASS.chartRadar)
            $$.main.select('.' + $$.CLASS.chartRadar)
                .append("g")
                .attr("class", $$.CLASS.chartRadarCoorWrapper);
            $$.main.select('.' + $$.CLASS.chartRadar)
                .append("g")
                .attr("class", $$.CLASS.chartRadarModelWrapper);
        },
        hasRadarType: function(targets){
            return this.hasType('radar', targets);
        },
        isradarType: function (d) {
            var id = this.isString(d) ? d : d.id;
            return this.config.data_types[id] === 'Radar';
        },
        classChartRadar: function (d) {
            return this.CLASS.chartRadar + this.classTarget(d.id);
        },
        updateTargetsForRadar: function(targets){

        },
        redrawRadar: function(){
            var $$ = this;
            var key = $$.config.data_keys.value[0],
                maxValue = Math.max($$.config.radar_max, d3.max($$.data.origin, function(i){return d3.max(i.info.map(function(o){return o.value;}))})),
                allAxis = ($$.data.origin[0][key].map(function(i, j){return i.axis})), //Names of each axis
                total = allAxis.length,                 //The number of different axes
                radius = Math.min($$.currentWidth/2, $$.height/2) / $$.config.radar_labelFactor,    //Radius of the outermost circle
                Format = d3.format('.2'),                //Percentage formatting
                angleSlice = Math.PI * 2 / total;       //The width in radians of each "slice"
            var rScale = d3.scale.linear()
                .range([0, radius])
                .domain([0, maxValue - $$.config.radar_min]);
            var radarLine = d3.svg.line.radial()
                .interpolate("linear-closed")
                .radius(function(d) { return rScale(d.value - $$.config.radar_min); })
                .angle(function(d,i) {  return i*angleSlice; });

            //饼、地理位置、雷达图的位置一致
            $$.main.select('.' + $$.CLASS.chartRadar).attr("transform", $$.getTranslate("arc"));

            var coorWrap = $$.main.select('.' + $$.CLASS.chartRadarCoorWrapper);
            var coorGrids = coorWrap.selectAll("." + $$.CLASS.chartRadarCoorGrid).data(d3.range(0,($$.config.radar_levels+1)).reverse())
                .enter()
                .append("g")
                .attr("class", $$.CLASS.chartRadarCoorGrid);
            var coorGridCircle = coorGrids.selectAll("." + $$.CLASS.chartRadarCoorGridCircle)
                .data(function(d){
                    return [d];
                })
                .enter()
                .append("circle")
                .attr("class", $$.CLASS.chartRadarCoorGridCircle)
                .style("fill", "#CDCDCD")
                .style("stroke", "#CDCDCD")
                .style("fill-opacity", $$.config.radar_opacityCircles);
            coorWrap.selectAll("." + $$.CLASS.chartRadarCoorGridCircle)
                .attr("r", function(d, i){return radius/$$.config.radar_levels*d;});
            var coorGridTicket = coorGrids.selectAll("." + $$.CLASS.chartRadarCoorGridTicket)
                .data(function(d){
                    return [d];
                })
                .enter()
                .append("text")
                .attr("class", $$.CLASS.chartRadarCoorGridTicket)
                .style("font-size", "10px")
                .attr("fill", "#737373")
                .text(function(d,i) {
                    var val = (maxValue - $$.config.radar_min)/$$.config.radar_levels*d + $$.config.radar_min;

                    if($$.config.radar_coor_labelFormat && $$.isFunction($$.config.radar_coor_labelFormat))
                        return $$.config.radar_coor_labelFormat.call(this, val)
                    return Format(val);
                });
            coorWrap.selectAll("." + $$.CLASS.chartRadarCoorGridTicket)
                .attr("x", 5)
                .attr("y", function(d){return -d*radius/$$.config.radar_levels + 4;});
                // .attr("y", function(d){return -d*radius/$$.config.radar_levels;})
                // .attr("dy", "0.4em");
            var coorAxis = coorWrap.selectAll("." + $$.CLASS.chartRadarCoorAxis).data(allAxis)
                .enter()
                .append("g")
                .attr("class", $$.CLASS.chartRadarCoorAxis);
            var coorAxisLine = coorAxis.selectAll("." + $$.CLASS.chartRadarCoorAxisLine)
                .data(function(d){
                    return [d];
                })
                .enter()
                .append("line")
                .attr("class", $$.CLASS.chartRadarCoorAxisLine)
                .style("stroke", "#c6c6c6")
                .style("stroke-width", "2px");
            coorWrap.selectAll("." + $$.CLASS.chartRadarCoorAxisLine)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", function(d, i, j){ return rScale((maxValue - $$.config.radar_min)*1.05) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("y2", function(d, i, j){ return rScale((maxValue - $$.config.radar_min)*1.05) * Math.sin(angleSlice*i - Math.PI/2); });
            var coorAxisLabel = coorAxis.selectAll("." + $$.CLASS.chartRadarCoorAxisLabel)
                .data(function(d){
                    return [d];
                })
                .enter()
                .append("text")
                .attr("class", $$.CLASS.chartRadarCoorAxisLabel)
                .style("font-size", "11px")
                .attr("text-anchor", function(d, i, j){
                    if(360/total*j > 180 && 360/total*j < 360){
                        return "end";
                    }else if(360/total*j > 0 && 360/total*j < 180){
                        return "right";
                    }else{
                        return "middle";
                    }
                })
                .text(function(d){return d});
            coorWrap.selectAll("." + $$.CLASS.chartRadarCoorAxisLabel)
                .attr("x", function(d, i, j){ return rScale((maxValue - $$.config.radar_min) * $$.config.radar_labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("y", function(d, i, j){ return rScale((maxValue - $$.config.radar_min) * $$.config.radar_labelFactor) * Math.sin(angleSlice*i - Math.PI/2) + 4; })
                // .attr("y", function(d, i, j){ return rScale((maxValue - $$.config.radar_min) * $$.config.radar_labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
                // .attr("dy", "0.35em");

            //Create a wrapper for the blobs
            var modelWrap = $$.main.select('.' + $$.CLASS.chartRadarModelWrapper);
            var model = $$.main.select('.' + $$.CLASS.chartRadarModelWrapper).selectAll("." + $$.CLASS.chartRadarModel)
                .data($$.data.origin)
                .enter()
                .append("g")
                .attr("class", function(d){
                    return $$.CLASS.chartRadarModel + " " + $$.CLASS.target + " " + ($$.CLASS.target + "-" + d[$$.config.data_x]);
                })
                .append("path")
                .attr("class", $$.CLASS.chartRadarModelArea)
                .style("fill", function(d,i) { return $$.color(d[$$.config.data_x]); })
                .style("fill-opacity", $$.config.radar_opacityArea)
                .style("stroke-width", $$.config.radar_strokeWidth + "px")
                .style("stroke", function(d,i) { return $$.color(d[$$.config.data_x]); })
                .on('mouseover', function (d,i){
                    //Dim all blobs
                    d3.selectAll("."+ $$.CLASS.chartRadarModelArea)
                        .transition().duration(200)
                        .style("fill-opacity", 0.1);
                    //Bring back the hovered over blob
                    d3.select(this)
                        .transition().duration(200)
                        .style("fill-opacity", 0.7);
                })
                .on('mouseout', function(){
                    //Bring back all blobs
                    d3.selectAll("."+ $$.CLASS.chartRadarModelArea)
                        .transition().duration(200)
                        .style("fill-opacity", $$.config.radar_opacityArea);
                });
            modelWrap.selectAll("." + $$.CLASS.chartRadarModelArea)
                .each(function(d, i){
                    var outline;

                    d.outline = radarLine(d[key]);
                    // outline = d.outline.split(",").map(function(p, i){
                    //     if(i == 0)
                    //         return "M0";
                    //     else if(i == d.outline.split(",").length - 1)
                    //         return "0Z";
                    //     else
                    //         return "0L0";
                    // });
                    outline = d.outline.split("L").map(function(p, i){
                        if(i == 0)
                            return p;
                        else
                            return d.outline.split("L")[0].replace("M", "");
                    });
                    this.setAttribute("d", outline.join(","));
                })
                .transition().duration($$.config.transition_enabled ? $$.config.transition_duration : 0)
                .attr("d", function(d,i) { return radarLine(d[key]); });
            //Append the circles
            modelWrap.selectAll("." + $$.CLASS.chartRadarModel).selectAll(".radarCircle")
                .data(function(d,i) { return d["info"]; })
                .enter().append("circle")
                .attr("class", "radarCircle")
                .attr("r", $$.config.radar_dotRadius)
                .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                .style("fill", function(d,i,j) { return $$.color(this.parentNode.__data__[$$.config.data_x]); })
                .style("fill-opacity", 0.8)
                .style("stroke", function(d,i,j) { return this.style.fill.replace(')', ', 0.45)').replace('rgb', 'rgba'); })
                .style("stroke-width", 7);
        }
    }
}
C3Radar.prototype = {

};

c3.register("radar", [Legend, Tooltip, Text], {
    CLASS: {
        chartRadar: "c3-chart-radar",
        chartRadarCoorWrapper: "c3-chart-radar-coor-wrapper",
        chartRadarCoorAxis: "radar-coor-axis",
        chartRadarCoorAxisLine: "radar-coor-axis-line",
        chartRadarCoorAxisLabel: "radar-coor-axis-label",
        chartRadarCoorGrid: "radar-coor-grid",
        chartRadarCoorGridCircle: "radar-coor-grid-circle",
        chartRadarCoorGridTicket: "radar-coor-grid-ticket",
        chartRadarModelWrapper: "c3-chart-radar-model-wrapper",
        chartRadarModel: "radar-model",
        chartRadarModelArea: "radar-model-area"
    },
    config: {
        radar: {
            coor: {
                labelFormat: null
            },
            levels: 4,              //How many levels or inner circles should there be drawn
            min: 4,
            max: 5,           //What is the value that the biggest circle will represent
            labelFactor: 1.2,     //How much farther than the radius of the outer circle should the labels be placed
            wrapWidth: 60,         //The number of pixels after which a label needs to be given a new line
            opacityArea: 0.35,     //The opacity of the area of the blob
            dotRadius: 4,          //The size of the colored circles of each blog
            opacityCircles: 0.1,   //The opacity of the circles of each blob
            strokeWidth: 2,        //The width of the stroke around each blob
        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Radar);

module.exports = c3;