import * as d3Scale from 'd3-scale';
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Hierarchy from "d3-hierarchy";

export default function() {

  var mode = "identity",
      modes = {
        "horizontal": horizontal,
        "vertical": vertical,
        "central": central,
        "grid": grid,
        "coordinate": coordinate,
        "radial": radial,
        "treemap": treemap,
        "pack": pack,
        "stack": stack,
        "diagonal": diagonal,
        "cascade": cascade,
        "corner": corner,
        "pyramid": pyramid,
        "brick": brick
      },
      layout = identity,
      size = [1, 1],
      cellSize,
      offset = [0, 0],
      cols,
      rows,
      radius,
      padding = 1,
      sort = function(a, b) { return a - b; },
      value = function(d) { return d; },
      valueX, valueY, valueHeight,
      __prefix = "",
      __x, __y, __width, __height, __cx, __cy,
      orient = "down",
      x = d3Scale.scaleLinear(),
      y = d3Scale.scaleLinear(),
      height = d3Scale.scaleLinear();

  function gridding(nodes) {

      __x = __prefix + "x";
      __y = __prefix + "y";
      __width = __prefix + "width";
      __height = __prefix + "height";
      __cx = __prefix + "cx";
      __cy = __prefix + "cy";

    if(typeof nodes[0] !== "object") {

      nodes = Array.prototype.map.call(nodes, function(d, i) {
        return {"__value": d, "__index": i};
      });

      value = function(d) { return d.__value.toLowerCase(); }

    }

    return layout(nodes);
  }

  function identity(nodes) {

    nodes.forEach(function(n) {
      n[__x] = n[__x] || 0;
      n[__y] = n[__y] || 0;
      n[__width] = n[__width] || size[0];
      n[__height] = n[__height] || size[1];
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function horizontal(nodes) {

    var _valueY;

    if(!valueY) {
      _valueY = function() { return 1; }
      y.domain([0, nodes.length]).range([0, size[1]]);
    } else {
      _valueY = valueY;
      y.domain([0, d3Array.sum(nodes, _valueY)]).range([0, size[1]]);
    }

    rows = nodes.length;

    nodes[0].y0 = 0 + offset[0];

    nodes.forEach(function(n, i) {

      n[__x] = 0 + offset[0];
      n[__y] = n.y0 + offset[1];

      n[__width] = size[0];
      n[__height] = y(_valueY(n));

      if(i < nodes.length - 1) {
        nodes[i+1].y0 = n.y0 + n.height;
      }

      n[__cx] = n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function vertical(nodes) {

    cols = nodes.length;
    x.domain([0, cols]).range([0, size[0]]);

    var _valueHeight;

    if(!valueHeight) {
      _valueHeight = function() { return 1; }
      height.domain([0, 1]).range([0, size[1]]);
    } else {
      _valueHeight = valueHeight
      height.domain(d3Array.extent(nodes, _valueHeight)).range([0, size[1]]);
    }

    nodes.forEach(function(n, i) {

      n[__x] = x(i) + offset[0];

      if(orient == "down") {
        n[__y] = 0 + offset[1];
      } else if(orient === "up") {
        n[__y] = size[1] - (height(_valueHeight(n)) + offset[0]);
      }

      n[__width] = size[0] / cols;
      n[__height] = height(_valueHeight(n));
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__height] / 2;
    });

    return nodes;
  }

  function central(nodes) {

    cols = rows = 1;

    nodes.forEach(function(n) {
      n[__x] = 0 + offset[0];
      n[__y] = 0 + offset[1];
      n[__width] = size[0];
      n[__height] = size[1];
      n[__cx] = n[__width] / 2;
      n[__cy] = n[__height] / 2;
    });

    return nodes;
  }

  function grid(nodes) {

    cols = Math.ceil(Math.sqrt(nodes.length));
    rows = Math.ceil(nodes.length / cols);

    if(typeof cellSize !== "undefined") {
      size[0] = cellSize[0] * cols;
      size[1] = cellSize[1] * rows;
    }

    x.domain([0, cols]).range([0, size[0]]);
    y.domain([0, rows]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % cols;
      var row = Math.floor(i / cols);

      n[__x] = x(col) + padding + offset[0];
      n[__y] = y(row) + padding + offset[1];
      n[__width] = size[0] / cols - 2 * padding;
      n[__height] = size[1] / rows - 2 * padding;

      if(orient == "up") {
        n[__y] = size[1] - n[__y] - n[__height];
      }

      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;


    });

    return nodes;
  }

  function coordinate(nodes) {

    // Create random data if no value function has been set
    if(!valueX) {
      valueX = function() { return Math.random(); }
      x.domain([0, 1]).range([0, size[0]]);
    } else {
      x.domain(d3Array.extent(nodes, valueX)).range([0, size[0]]);
    }

    if(!valueY) {
      valueY = function() { return Math.random(); }
      y.domain([0, 1]).range([0, size[1]]);
    } else {
      y.domain(d3Array.extent(nodes, valueY)).range([0, size[1]]);
    }

    nodes.forEach(function(n) {
      n[__x] = x(valueX(n)) + offset[0];
      n[__y] = y(valueY(n)) + offset[1];
      n[__width] = cellSize ? cellSize[0]: size[0] / nodes.length;
      n[__height] = cellSize ? cellSize[1]: size[1] / nodes.length;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function radial(nodes) {

    if(!radius) {
      radius = Math.min(size[0], size[1]) - 2 * (size[1] / nodes.length);
    }

    var arc = d3Shape.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var pie = d3Shape.pie()
        .sort(sort)
        .value(function() { return 1; });

    var arcs = pie(nodes);

    nodes.forEach(function(n, i) {
      n[__width] = size[0] / nodes.length;
      n[__height] = size[1] / nodes.length;
      n[__x] = arc.centroid(arcs[i])[0] + size[0] / 2 + offset[0] - n[__width] / 2;
      n[__y] = arc.centroid(arcs[i])[1] + size[1] / 2 + offset[1] - n[__height] / 2;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function treemap(nodes) {

    var treemap = d3Hierarchy.treemap()
        .size([size[0], size[1]])
        .padding(padding);

    var tree = treemap(d3Hierarchy.stratify()
        .id(function(d, i) { return i; })
        .parentId(function(d, i) {
          return i === 0 ? "": 0;
        })([{}].concat(nodes))
          .sum(function() { return 1; })
        );

    nodes.forEach(function(n, i) {
      n[__x] = tree.children[i].x0 + offset[0];
      n[__y] = tree.children[i].y0 + offset[1];
      n[__width] = tree.children[i].x1 - tree.children[i].x0;
      n[__height] = tree.children[i].y1 - tree.children[i].y0;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function pack(nodes) {

    var pack = d3Hierarchy.pack()
        .size([size[0], size[1]])
        .padding(padding);

    var packed = pack(d3Hierarchy.stratify()
        .id(function(d, i) { return i; })
        .parentId(function(d, i) {
          return i === 0 ? "": 0;
        })([{}].concat(nodes))
          .sum(function() { return 1; })
        );

    nodes.forEach(function(n, i) {
      n[__x] = packed.children[i].x + offset[0];
      n[__y] = packed.children[i].y + offset[1];
      n[__width] = packed.children[i].r;
      n[__height] = packed.children[i].r;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function stack(nodes) {

    var stack = d3Shape.stack()
        .keys(nodes.map(function(d, i) { return i + "_"; })) // Creates unique ids for nodes
        .value(function(d, key) { return nodes.indexOf(d[key]); });

    y.domain([0, d3Array.sum(d3Array.range(nodes.length)) + nodes.length]).range([0, size[1]]);

    var new_data = {};

    nodes.map(function(d, i) {
      new_data[i+"_"] = d;
    })

    var stacked = stack([new_data]);

    nodes.forEach(function(n, i) {
      var s = stacked[i][0];
      n[__x] = offset[0];
      n[__y] = y(s[1]) + offset[1];
      n[__width] = size[0];
      n[__height] = y(s[1]) - y(s[0]);
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function diagonal(nodes) {

    x.domain([0, nodes.length]).range([0, size[0]]);
    y.domain([0, nodes.length]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      if(orient == "up") {
        n[__x] = x(i) + offset[0];
        n[__y] = size[1] - (y(i) + offset[1]) - size[1] / nodes.length;
      } else {
        n[__x] = x(i) + offset[0];
        n[__y] = y(i) + offset[1];
      }

      n[__width] = size[0] / nodes.length;
      n[__height] = size[1] / nodes.length;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function cascade(nodes) {

    var spacing = size[0] * 2;

    x.domain([0, nodes.length]).range([0, spacing / nodes.length]);
    y.domain([0, nodes.length]).range([0, spacing / nodes.length]);

    nodes.forEach(function(n, i) {

      n[__x] = x(i) + offset[0];
      n[__y] = y(i) + offset[1];
      n[__width] = size[0] - spacing / nodes.length;
      n[__height] = size[1] - spacing / nodes.length;
      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;
    });

    return nodes;
  }

  function corner(nodes) {

    var shiftX = size[0] / (2 * nodes.length);
    var shiftY = size[1] / (2 * nodes.length);

    nodes.forEach(function(n, i) {

      n[__width] = size[0] - shiftX * i * 2;
      n[__height] = size[1] - shiftY * i * 2;

      if(orient === "top right") {

        n[__x] = size[0] - n.width + offset[0];
        n[__y] = 0 + offset[1];

      } else if(orient === "bottom right") {

        n[__x] = size[0] - n[__width] + offset[0];
        n[__y] = size[1] - n[__height] + offset[1];

      } else if(orient === "bottom left") {

        n[__x] = 0 + offset[0];
        n[__y] = size[1] - n[__height] + offset[1];

      } else {

        n[__x] = 0 + offset[0];
        n[__y] = 0 + offset[1];

      }

      n[__cx] = n[__width] / 2 + n[__x];
      n[__cy] = n[__height] / 2 + shiftY * i;

    });

    return nodes;
  }

  function pyramid(nodes) {

    var shiftX = size[0] / (2 * nodes.length);
    var shiftY = size[1] / (2 * nodes.length);

    nodes.forEach(function(n, i) {

      n[__x] = 0 + offset[0] + shiftX * i;
      n[__y] = 0 + offset[1] + shiftY * i;
      n[__width] = size[0] - shiftX * i * 2;
      n[__height] = size[1] - shiftY * i * 2;
      n[__cx] = n[__width] / 2 + shiftX * i;
      n[__cy] = n[__height] / 2+ shiftY * i;

    });

    return nodes;
  }

  function brick(nodes) {

    cols = Math.ceil(Math.sqrt(nodes.length));
    rows = Math.ceil(nodes.length / cols);

    x.domain([0, cols + 1 / 2]).range([0, size[0]]);
    y.domain([0, rows]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % cols;
      var row = Math.floor(i / cols);

      n[__x] = x(col) + padding + offset[0];
      n[__y] = y(row) + padding + offset[1];

      n[__width] = size[0] / (cols + 1 / 2) - 2 * padding;
      n[__height] = size[1] / rows - 2 * padding;

      if(orient === "left") {
        if(row % 2 === 1) {
          n[__x] += n[__width] / 2;
        }
      } else {
        if(row % 2 === 0) {
          n[__x] += n[__width] / 2;
        }
      }

      n[__cx] = n[__x] + n[__width] / 2;
      n[__cy] = n[__y] + n[__height] / 2;

    });

    return nodes;
  }

  gridding.mode = function(value) {

    if (!arguments.length) return mode;
    mode = value;

    if(mode === "identity") {
      layout = identity;
    } else if(Object.keys(modes).indexOf(value) >= 0) {
      layout = modes[mode];
    }

    return gridding;
  }

  gridding.modes = function() {
    return Object.keys(modes);
  }

  gridding.size = function(_size) {
    if(!arguments.length) return size;
    size = _size;
    return gridding;
  }

  gridding.cellSize = function(_cellSize) {
    if(!arguments.length) return cellSize;
    cellSize = _cellSize;
    return gridding;
  }

  gridding.value = function(_value) {
    if(!arguments.length) return value;
    value = _value;
    return gridding;
  }

  gridding.valueX = function(_valueX) {
    if(!arguments.length) return valueX;
    if(typeof _valueX === "string") {
      valueX = function(d) { return d[_valueX]; }
    } else {
      valueX = _valueX;
    }
    return gridding;
  }

  gridding.valueY = function(_valueY) {
    if(!arguments.length) return valueY;
    if(typeof _valueY === "string") {
      valueY = function(d) { return d[_valueY]; }
    } else {
      valueY = _valueY;
    }
    return gridding;
  }

  gridding.valueHeight = function(_valueHeight) {
    if(!arguments.length) return valueHeight;
    if(typeof _valueHeight === "string") {
      valueHeight = function(d) { return d[_valueHeight]; }
    } else {
      valueHeight = _valueHeight;
    }
    return gridding;
  }

  gridding.sort = function(_sort) {
    if(!arguments.length) return sort;
    sort = _sort;
    return gridding;
  }

  gridding.padding = function(_padding) {
    if(!arguments.length) return padding;
    padding = _padding;
    return gridding;
  }

  gridding.offset = function(_offset) {
    if(!arguments.length) return offset;
    offset = _offset;
    return gridding;
  }

  gridding.orient = function(_orient) {
    if(!arguments.length) return orient;
    orient = _orient;
    return gridding;
  }

  gridding.cols = function(_cols) {
    if(!arguments.length) return cols;
    cols = _cols;
    return gridding;
  }

  gridding.rows = function(_rows) {
    if(!arguments.length) return rows;
    rows = _rows;
    return gridding;
  }

  gridding.radius = function(_radius) {
    if(!arguments.length) return radius;
    radius = _radius;
    return gridding;
  }

  gridding.prefix = function(_prefix) {
    if(!arguments.length) return __prefix;
    __prefix = _prefix;
    return gridding;
  }

  return gridding;
}
