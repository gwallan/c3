var _ = require("underscore");

module.exports = {
    isValue: function (v) {
        return v || v === 0;
    },
    isFunction: function (o) {
        return typeof o === 'function';
    },
    isString: function (o) {
        return typeof o === 'string';
    },
    isNumber: function (o) {
        return typeof o === 'number';
    },
    isUndefined: function (v) {
        return typeof v === 'undefined';
    },
    isDefined: function (v) {
        return typeof v !== 'undefined';
    },
    ceil10: function (v) {
        return Math.ceil(v / 10) * 10;
    },
    asHalfPixel: function (n) {
        return Math.ceil(n) + 0.5;
    },
    diffDomain: function (d) {
        return d[1] - d[0];
    },
    isEmpty: function (o) {
        return !o || (this.isString(o) && o.length === 0) || (typeof o === 'object' && Object.keys(o).length === 0);
    },
    notEmpty: function (o) {
        if(typeof o !== "object")
            return false;
        return _.keys(o).length > 0;
    },
    getOption: function (options, key, defaultValue) {
        return this.isDefined(options[key]) ? options[key] : defaultValue;
    },
    hasValue: function (dict, value) {
        var found = false;
        Object.keys(dict).forEach(function (key) {
            if (dict[key] === value) { found = true; }
        });
        return found;
    },
    getPathBox: function (path) {
        var box = path.getBoundingClientRect(),
            items = [path.pathSegList.getItem(0), path.pathSegList.getItem(1)],
            minX = items[0].x, minY = Math.min(items[0].y, items[1].y);
        return { x: minX, y: minY, width: box.width, height: box.height };
    },
    mergeRecursive: function(obj1, obj2) {
      for (var p in obj2) {
        try {
          if (obj2[p].constructor == Object) {
            obj1[p] = this.MergeRecursive(obj1[p], obj2[p]);
          } else {
            obj1[p] = obj2[p];
          }
        } catch (e) {
          obj1[p] = obj2[p];
        }
      }

      return obj1;
    },
    pointsToArray: function(d){
        var commands = d.split(/(?=[LMC])/);

        return commands.map(function(d){
            var pointsArray = d.slice(1, d.length).split(',');
            var pairsArray = [];
            for(var i = 0; i < pointsArray.length; i += 2){
                pairsArray.push(+pointsArray[i]);
                pairsArray.push(+pointsArray[i+1]);
            }
            return pairsArray;
        });
    }
};