// https://github.com/romsson/d3-gridding Version 0.0.8. Copyright 2017 Romain Vuillemot.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-scale'), require('d3-array'), require('d3-hierarchy'), require('d3-shape')) :
  typeof define === 'function' && define.amd ? define('d3-gridding', ['exports', 'd3-scale', 'd3-array', 'd3-hierarchy', 'd3-shape'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3));
}(this, function (exports,d3Scale,d3Array,d3Hierarchy,d3Shape) { 'use strict';

  function brick(nodes, v) {

    v.cols = Math.ceil(Math.sqrt(nodes.length));
    v.rows = Math.ceil(nodes.length / v.cols);

    v.x.domain([0, v.cols + 1 / 2]).range([0, v.size[0]]);
    v.y.domain([0, v.rows]).range([0, v.size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % v.cols;
      var row = Math.floor(i / v.cols);

      n[v.__x] = v.x(col) + v.padding + v.offset[0];
      n[v.__y] = v.y(row) + v.padding + v.offset[1];

      n[v.__width] = v.size[0] / (v.cols + 1 / 2) - 2 * v.padding;
      n[v.__height] = v.size[1] / v.rows - 2 * v.padding;

      if(v.orient === "left") {
        if(row % 2 === 1) {
          n[v.__x] += n[v.__width] / 2;
        }
      } else {
        if(row % 2 === 0) {
          n[v.__x] += n[v.__width] / 2;
        }
      }

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function central(nodes, v) {

    v.cols = v.rows = 1;

    nodes.forEach(function(n) {
      n[v.__x] = 0 + v.padding + v.offset[0];
      n[v.__y] = 0 + v.padding + v.offset[1];

      n[v.__width] = v.size[0] - 2 * v.padding;
      n[v.__height] = v.size[1] - 2 * v.padding;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

      n[v.__tx] = n[v.__cx] / 2;
      n[v.__ty] = v.padding / 2;

      n[v.__lx] = n[v.__cx] + v.padding / 2;
      n[v.__ly] = 0;

      n[v.__rx] = n[v.__cx] - v.padding / 2;
      n[v.__ry] = n[v.__yx] / 2;

    });

    return nodes;
  }

  function cascade(nodes, v) {

    var shiftX = v.size[0] / (2 * nodes.length);
    var shiftY = v.size[1] / (2 * nodes.length);

    nodes.forEach(function(n, i) {
      n[v.__x] = 0 + v.offset[0] + shiftX * i;
      n[v.__y] = 0 + v.offset[1] + shiftY * i;

      n[v.__width] = v.size[0] - shiftX * nodes.length;
      n[v.__height] = v.size[1] - shiftY * nodes.length;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function coordinate(nodes, v) {

    // Create random data if no value function has been set
    if(!v.valueX) {
      v.valueX = function() { return Math.random(); }
      v.x.domain([0, 1]).range([v.padding, v.size[0] - 2 * v.padding]);
    } else {
      v.x.domain(d3Array.extent(nodes, v.valueX)).range([v.padding, v.size[0]  - 2 * v.padding]);
    }

    // Same as for X, create random data for vertical axis
    if(!v.valueY) {
      v.valueY = function() { return Math.random(); }
      v.y.domain([0, 1]).range([v.padding, v.size[1] - 2 * v.padding]);
    } else {
      v.y.domain(d3Array.extent(nodes, v.valueY)).range([v.padding, v.size[1] - 2 * v.padding]);
    }

    nodes.forEach(function(n) {
      n[v.__x] = v.x(v.valueX(n)) + v.offset[0];
      n[v.__y] = v.y(v.valueY(n)) + v.offset[1];

      n[v.__width] = v.cellSize ? v.cellSize[0]: v.size[0] / nodes.length;
      n[v.__height] = v.cellSize ? v.cellSize[1]: v.size[1] / nodes.length;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function corner(nodes, v) {

    var shiftX = v.size[0] / (2 * nodes.length);
    var shiftY = v.size[1] / (2 * nodes.length);

    nodes.forEach(function(n, i) {

      n[v.__width] = v.size[0] - shiftX * i * 2;
      n[v.__height] = v.size[1] - shiftY * i * 2;

      if(v.orient === "top right") {

        n[v.__x] = v.size[0] - n.width + v.offset[0];
        n[v.__y] = 0 + v.offset[1];

      } else if(v.orient === "bottom right") {

        n[v.__x] = v.size[0] - n[v.__width] + v.offset[0];
        n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

      } else if(v.orient === "bottom left") {

        n[v.__x] = 0 + v.offset[0];
        n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

      } else {

        n[v.__x] = 0 + v.offset[0];
        n[v.__y] = 0 + v.offset[1];

      }

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    });

    return nodes;
  }

  function diagonal(nodes, v) {

    v.x.domain([0, nodes.length]).range([0, v.size[0]]);
    v.y.domain([0, nodes.length]).range([0, v.size[1]]);

    nodes.forEach(function(n, i) {

      if(v.orient == "up") {
        n[v.__x] = v.x(i) + v.offset[0];
        n[v.__y] = v.size[1] - (v.y(i) + v.offset[1]) - v.size[1] / nodes.length;
      } else {
        n[v.__x] = v.x(i) + v.offset[0];
        n[v.__y] = v.y(i) + v.offset[1];
      }

      n[v.__width] = v.size[0] / nodes.length;
      n[v.__height] = v.size[1] / nodes.length;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function grid(nodes, v) {

    v.cols = Math.ceil(Math.sqrt(nodes.length));
    v.rows = Math.ceil(nodes.length / v.cols);

    if(typeof v.cellSize !== "undefined" && v.cellSize !== null) {
      v.size[0] = v.cellSize[0] * v.cols;
      v.size[1] = v.cellSize[1] * v.rows;
    }

    v.x.domain([0, v.cols]).range([0, v.size[0]]);
    v.y.domain([0, v.rows]).range([0, v.size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % v.cols;
      var row = Math.floor(i / v.cols);

      n[v.__x] = v.x(col) + v.padding + v.offset[0];
      n[v.__y] = v.y(row) + v.padding + v.offset[1];

      n[v.__width] = v.size[0] / v.cols - 2 * v.padding;
      n[v.__height] = v.size[1] / v.rows - 2 * v.padding;

      if(v.orient == "up") {
        n[v.__y] = v.size[1] - n[v.__y] - n[v.__height];
      }

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

      n.tx = n[v.__x] + n[v.__width] / 2;
      n.ty = v.padding / 2;

    });

    return nodes;
  }

  function horizontal(nodes, v) {

    v.rows = nodes.length;

    if(typeof v.cellSize !== "undefined" && v.cellSize !== null) {
      v.size[0] = v.cellSize[0] * 2;
      v.size[1] = v.cellSize[1] * v.rows;
    }

    v.y.domain([0, v.rows]).range([0, v.size[1] - 2 * v.padding]);

    var _valueY;

    if(!v.valueY) {
      _valueY = function() { return 1; }
      v.y.domain([0, nodes.length]).range([0, v.size[1] - 2 * v.padding]);
    } else {
      _valueY = v.valueY;
      v.y.domain([0, d3Array.sum(nodes, _valueY)]).range([0, v.size[1] - 2 * v.padding]);
    }

    var _valueWidth;

    if(!v.valueWidth) {
      _valueWidth = function() { return 1; }
      v.width.domain([0, 1]).range([0, v.size[0] - 2 * v.padding]);
    } else {
      _valueWidth = v.valueWidth;
      v.width.domain(d3Array.extent(nodes, _valueWidth)).range([0, v.size[0] - 2 * v.padding]);
    }

    nodes[0].y0 = 0;

    nodes.forEach(function(n, i) {
      n[v.__x] = 0 + v.padding + v.offset[0];
      n[v.__y] = n.y0 + v.padding + v.offset[1];

      n[v.__width] = v.width(_valueWidth(n));
      n[v.__height] = v.y(_valueY(n));

      // Updates the next node's y0 for all nodes but the last one
      if(i < nodes.length - 1) {
        nodes[i+1].y0 = n.y0 + n[v.__height];
      }

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function identity(nodes, v) {

    nodes.forEach(function(n) {
      n[v.__x] = n[v.__x] || 0;
      n[v.__y] = n[v.__y] || 0;

      n[v.__width] = n[v.__width] || v.size[0];
      n[v.__height] = n[v.__height] || v.size[1];

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function pack(nodes, v) {

    var pack = d3Hierarchy.pack()
        .size([v.size[0], v.size[1]])
        .padding(v.padding);

    var packed = pack(d3Hierarchy.stratify()
        .id(function(d, i) { return i; })
        .parentId(function(d, i) {
          return i === 0 ? "": 0;
        })([{}].concat(nodes))
          .sum(function() { return 1; })
        );

    nodes.forEach(function(n, i) {
      n[v.__x] = packed.children[i].x + v.offset[0];
      n[v.__y] = packed.children[i].y + v.offset[1];

      n[v.__width] = packed.children[i].r;
      n[v.__height] = packed.children[i].r;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function pyramid(nodes, v) {

    var shiftX = v.size[0] / (2 * nodes.length);
    var shiftY = v.size[1] / (2 * nodes.length);

    nodes.forEach(function(n, i) {

      n[v.__x] = 0 + v.offset[0] + shiftX * i;
      n[v.__y] = 0 + v.offset[1] + shiftY * i;

      n[v.__width] = v.size[0] - shiftX * i * 2;
      n[v.__height] = v.size[1] - shiftY * i * 2;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    });

    return nodes;
  }

  function radial(nodes, v) {

    if(!v.radius) {
      v.radius = Math.min(v.size[0], v.size[1]) - 2 * (v.size[1] / nodes.length);
    }

    var arc = d3Shape.arc()
        .outerRadius(v.radius)
        .innerRadius(0);

    var pie = d3Shape.pie()
        .sort(v.sort)
        .value(function() { return 1; });

    var arcs = pie(nodes);

    nodes.forEach(function(n, i) {
      n[v.__width] = v.size[0] / nodes.length;
      n[v.__height] = v.size[1] / nodes.length;

      // Must be after width & height
      n[v.__x] = arc.centroid(arcs[i])[0] + v.size[0] / 2 + v.offset[0] - n[v.__width] / 2;
      n[v.__y] = arc.centroid(arcs[i])[1] + v.size[1] / 2 + v.offset[1] - n[v.__height] / 2;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function stack(nodes, v) {

    var stack = d3Shape.stack()
        .keys(nodes.map(function(d, i) { return i + "_"; })) // Creates unique ids for nodes
        .value(function(d, key) { return nodes.indexOf(d[key]); });

    v.y.domain([0, d3Array.sum(d3Array.range(nodes.length)) + nodes.length]).range([0, v.size[1]]);

    var new_data = {};

    nodes.map(function(d, i) {
      new_data[i+"_"] = d;
    })

    var stacked = stack([new_data]);

    nodes.forEach(function(n, i) {
      var s = stacked[i][0];
      n[v.__x] = v.offset[0];
      n[v.__y] = v.y(s[1]) + v.offset[1];

      n[v.__width] = v.size[0];
      n[v.__height] = v.y(s[1]) - v.y(s[0]);

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function step(nodes, v) {

    var _shiftX = v.size[0] / (2 * nodes.length);

    nodes.forEach(function(n, i) {
      n[v.__x] = 0 + v.offset[0] + _shiftX * i;
      n[v.__y] = 0 + v.offset[1];

      n[v.__width] = v.size[0] - _shiftX * i * 2;
      n[v.__height] = v.size[1];

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function tree(nodes, v) {

    var treeData = d3Hierarchy.stratify()
        .id(v.id)
        .parentId(v.parentId)(nodes);

    var tree = d3Hierarchy.tree()
        .size([v.size[0], v.size[1] / 2])

    var treeLayout = d3Hierarchy.hierarchy(treeData, function(d) {
        return d.children;
      });

    treeLayout = tree(treeLayout);

    nodes.forEach(function(n, i) {

      n[v.__width] = v.cellSize ? v.cellSize[0]: v.size[0] / nodes.length;
      n[v.__height] = v.cellSize ? v.cellSize[1]: v.size[1] / nodes.length;

      n[v.__x] = treeLayout.descendants()[i].x + v.offset[0] - n[v.__width] / 2;
      n[v.__y] = treeLayout.descendants()[i].y + v.offset[1];

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    });

    return nodes;
  }

  function treemap(nodes, v) {

    var treemap = d3Hierarchy.treemap()
        .size([v.size[0], v.size[1]])
        .padding(v.padding);

    var stratify = d3Hierarchy.stratify()
        .id(v.id)
        .parentId(v.parentId);

    var root = stratify([{}].concat(nodes))
        .sum(function() { return 1; });

    var tree = treemap(root);

    nodes.forEach(function(n, i) {

      n[v.__x] = tree.descendants()[i].x0 + v.offset[0];
      n[v.__y] = tree.descendants()[i].y0 + v.offset[1];

      n[v.__width] = tree.descendants()[i].x1 - tree.descendants()[i].x0;
      n[v.__height] = tree.descendants()[i].y1 - tree.descendants()[i].y0;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    });

    return nodes;
  }

  function vertical(nodes, v) {

    v.cols = nodes.length;

    v.x.domain([0, v.cols]).range([v.padding, v.size[0] - v.padding]);

    var _valueHeight;

    if(!v.valueHeight) {
      _valueHeight = function() { return 1; }
      v.height.domain([0, 1]).range([0, v.size[1] - 2 * v.padding]);
    } else {

      _valueHeight = v.valueHeight
      v.height.domain([0, d3Array.max(nodes, _valueHeight)]).range([0, v.size[1] - 2 * v.padding]);
    }

    var _valueWidth;

    if(!v.valueWidth) {
      _valueWidth = function() { return 1; }
      v.width.domain([0, nodes.length]).range([0, v.size[0] - 2 * v.padding]);
    } else {
      _valueWidth = v.valueWidth;
      v.width.domain([0, d3Array.sum(nodes, _valueWidth)]).range([0, v.size[0] - 2 * v.padding]);
    }

    nodes[0].x0 = 0;

    nodes.forEach(function(n, i) {

      n[v.__x] = n.x0 + v.offset[0] + v.padding;

      if(v.orient == "down") {
        n[v.__y] = 0 + v.offset[1] + v.padding;
      } else if(v.orient === "up") {
        n[v.__y] = v.size[1] - (v.height(_valueHeight(n)) + v.offset[0]) + v.padding;
      } else {
        n[v.__y] = 0 + v.offset[1] + v.padding;
      }

   //   n[v.__width] = (v.size[0] - 2 * v.padding) / v.cols;
      n[v.__width] = v.width(_valueWidth(n));
      n[v.__height] = v.height(_valueHeight(n));

      // Updates the next node's y0 for all nodes but the last one
      if(i < nodes.length - 1) {
        nodes[i+1].x0 = n.x0 + n[v.__width];
      }

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;
    });

    return nodes;
  }

  function gridding() {

    var vars = {
      __prefix: "",
      __x: "",
      __y: "",
      __width: "",
      __height: "",
      __cx: "",
      __cy: "",
      cellSize: null,
      cols: null,
      height: d3Scale.scaleLinear(),
      id: function(d, i) { return i; },
      layout: identity,
      mode: "identity",
      modes: {
        "brick": {
          "layout": brick,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "cascade": {
          "layout": cascade,
          "properties": [
          ]
        },
        "central": {
          "layout": central,
          "properties": [
          ]
        },
        "coordinate": {
          "layout": coordinate,
          "properties": [
            {"key": "valueX", "value": null},
            {"key": "valueY", "value": null}
          ]
        },
        "corner": {
          "layout": corner,
          "properties": [
            {"key": "orient", "value": "top right"}
          ]
        },
        "diagonal": {
          "layout": diagonal,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "grid": {
          "layout": grid,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "horizontal": {
          "layout": horizontal,
          "properties": [
            {"key": "valueY", "value": null},
            {"key": "valueWidth", "value": null}
          ]
        },
        "pack": {
          "layout": pack,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "pyramid": {
          "layout": pyramid,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "radial": {
          "layout": radial,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "stack": {
          "layout": stack,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "step": {
          "layout": step,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "tree": {
          "layout": tree,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "treemap": {
          "layout": treemap,
          "properties": [
            {"key": "orient", "value": "top"}
          ]
        },
        "vertical": {
          "layout": vertical,
          "properties": [
            {"key": "orient", "value": "top"},
            {"key": "orient", "value": "left"},
            {"key": "orient", "value": "right"},
            {"key": "valueHeight", "value": null},
            {"key": "valueY", "value": null}
          ]
        }
      },
      offset: [0, 0],
      orient: "down",
      parentId: function(d, i) { return i === 0 ? null: 0; },
      padding: 0,
      radius: null,
      rows: null,
      size: [1, 1],
      sort: function(a, b) { return a - b; },
      value: function(d) { return d; },
      valueHeight: null,
      valueWidth: null,
      valueX: null,
      valueY: null,
      width: d3Scale.scaleLinear(),
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear()
    };

    function gridding(nodes) {

      vars.__x = vars.__prefix + "x";
      vars.__y = vars.__prefix + "y";
      vars.__width = vars.__prefix + "width";
      vars.__height = vars.__prefix + "height";
      vars.__cx = vars.__prefix + "cx";
      vars.__cy = vars.__prefix + "cy";

      if(typeof nodes === "undefined" || nodes === "" || nodes === null) {

        nodes = [];

      } if(typeof vars.value(nodes) === "undefined" || vars.value(nodes) === "" || vars.value(nodes) === null) {

        nodes = [];

      } else if(typeof vars.value(nodes)[0] !== "object") {

        nodes = Array.prototype.map.call(nodes, function(d, i) {
          return {"__value": d, "__index": i};
        });

      } else {

        nodes = vars.value(nodes);
      }

      return vars.layout(nodes, vars);
    }

    gridding.mode = function(value) {

      if (!arguments.length) return vars.mode;
      vars.mode = value;

      if(vars.mode === "identity") {
        vars.layout = identity;
      } else if(Object.keys(vars.modes).indexOf(value) >= 0) {
        vars.layout = vars.modes[vars.mode].layout;
      }

      return gridding;
    }

    gridding.modes = function(_mode) {
      if(arguments.length === 1) return vars.modes[_mode].properties;
      return Object.keys(vars.modes);
    }

    gridding.size = function(_size) {
      if(!arguments.length) return vars.size;
      vars.size = _size;
      return gridding;
    }

    gridding.cellSize = function(_cellSize) {
      if(!arguments.length) return vars.cellSize;
      vars.cellSize = _cellSize;
      return gridding;
    }

    gridding.value = function(_value) {
      if(!arguments.length) return vars.value;
      vars.value = _value;
      return gridding;
    }

    gridding.valueX = function(_valueX) {
      if(!arguments.length) return vars.valueX;
      if(typeof _valueX === "string") {
        vars.valueX = function(d) { return d[_valueX]; }
      } else {
        vars.valueX = _valueX;
      }
      return gridding;
    }

    gridding.valueY = function(_valueY) {
      if(!arguments.length) return vars.valueY;
      if(typeof _valueY === "string") {
        vars.valueY = function(d) { return d[_valueY]; }
      } else {
        vars.valueY = _valueY;
      }
      return gridding;
    }

    gridding.valueHeight = function(_valueHeight) {
      if(!arguments.length) return vars.valueHeight;
      if(typeof _valueHeight === "string") {
        vars.valueHeight = function(d) { return d[_valueHeight]; }
      } else {
        vars.valueHeight = _valueHeight;
      }
      return gridding;
    }

    gridding.valueWidth = function(_valueWidth) {
      if(!arguments.length) return vars.valueWidth;
      if(typeof _valueWidth === "string") {
        vars.valueWidth = function(d) { return d[_valueWidth]; }
      } else {
        vars.valueWidth = _valueWidth;
      }
      return gridding;
    }

    gridding.sort = function(_sort) {
      if(!arguments.length) return vars.sort;
      vars.sort = _sort;
      return gridding;
    }

    gridding.padding = function(_padding) {
      if(!arguments.length) return vars.padding;
      vars.padding = _padding;
      return gridding;
    }

    gridding.offset = function(_offset) {
      if(!arguments.length) return vars.offset;
      vars.offset = _offset;
      return gridding;
    }

    gridding.orient = function(_orient) {
      if(!arguments.length) return vars.orient;
      vars.orient = _orient;
      return gridding;
    }

    gridding.cols = function(_cols) {
      if(!arguments.length) return vars.cols;
      vars.cols = _cols;
      return gridding;
    }

    gridding.rows = function(_rows) {
      if(!arguments.length) return vars.rows;
      vars.rows = _rows;
      return gridding;
    }

    gridding.radius = function(_radius) {
      if(!arguments.length) return vars.radius;
      vars.radius = _radius;
      return gridding;
    }

    gridding.prefix = function(_prefix) {
      if(!arguments.length) return vars.__prefix;
      vars.__prefix = _prefix;
      return gridding;
    }

    gridding.id = function(_id) {
      if(!arguments.length) return vars.id;
      vars.id = _id;
      return gridding;
    }

    gridding.parentId = function(_parentId) {
      if(!arguments.length) return vars.parentId;
      vars.parentId = _parentId;
      return gridding;
    }

    return gridding;
  }

  exports.gridding = gridding;

  Object.defineProperty(exports, '__esModule', { value: true });

}));