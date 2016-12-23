import * as d3Scale from 'd3-scale';
import * as d3Shape from "d3-shape";
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
      valueX,
      valueY,
      orient = "down",
      x = d3Scale.scaleLinear(),
      y = d3Scale.scaleLinear();

  function gridding(nodes) {

    if(typeof nodes[0] === "string") {
      nodes = Array.prototype.map.call(nodes, function(d) { return {"__value": d}; });
      value = function(d) { return d.__value.toLowerCase(); }
    } else if(typeof nodes[0] !== "object") {
      nodes = Array.apply(null, Array(nodes.length)).map(function() { return new Object(); });
    }

    nodes.sort(function(a, b) {
      return sort(value(a), value(b));
    });

    return layout(nodes);
  }

  function identity(nodes) {

    nodes.forEach(function(n, i) {
      n.x = n.x || 0;
      n.y = n.y || 0;
      n.width = n.width || size[0];
      n.height = n.height || size[1];
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function horizontal(nodes) {

    rows = nodes.length;
    y.domain([0, rows]).range([0, size[1]]);

    nodes.forEach(function(n, i) {
      n.x = 0 + offset[0];
      n.y = y(i) + offset[1];
      n.width = size[0];
      n.height = size[1] / rows;
      n.cx = n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function vertical(nodes) {

    cols = nodes.length;
    x.domain([0, cols]).range([0, size[0]]);

    nodes.forEach(function(n, i) {
      n.x = x(i) + offset[0];
      n.y = 0 + offset[1];
      n.width = size[0] / cols;
      n.height = size[1];
      n.cx = n.x + n.width / 2;
      n.cy = n.height / 2;
    });

    return nodes;
  }

  function central(nodes) {

    cols = rows = 1;

    nodes.forEach(function(n, i) {
      n.x = 0 + offset[0];
      n.y = 0 + offset[1];
      n.width = size[0];
      n.height = size[1];
      n.cx = n.width / 2;
      n.cy = n.height / 2;
    });

    return nodes;
  }

  function grid(nodes) {

    cols = Math.ceil(Math.sqrt(nodes.length));
    rows = Math.ceil(nodes.length / cols);

    x.domain([0, cols]).range([0, size[0]]);
    y.domain([0, rows]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % cols;
      var row = Math.floor(i / cols);

      n.x = x(col) + padding + offset[0];
      n.y = y(row) + padding + offset[1];
      n.width = size[0] / cols - 2 * padding;
      n.height = size[1] / rows - 2 * padding;

      if(orient == "up") {
        n.y = height - n.y - n.height;
      }

      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;

    });

    return nodes;
  }

  function coordinate(nodes) {

    // Create random data if no value function has been set
    if(!valueX) {
      valueX = function() { return Math.random(); }
      x.domain([0, 1]).range([0, size[0]]);
    } else {
      x.domain(d3.extent(nodes, valueX)).range([0, size[0]]);
    }

    if(!valueY) {
      valueY = function() { return Math.random(); }
      y.domain([0, 1]).range([0, size[1]]);
    } else {
      y.domain(d3.extent(nodes, valueY)).range([0, size[1]]);
    }

    nodes.forEach(function(n, i) {
      n.x = x(valueX(n)) + offset[0];
      n.y = y(valueY(n)) + offset[1];
      n.width = cellSize ? cellSize[0]: size[0] / nodes.length;
      n.height = cellSize ? cellSize[1]: size[1] / nodes.length;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
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
        .value(function(d) { return 1; });

    var arcs = pie(nodes);

    nodes.forEach(function(n, i) {
      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
      n.x = arc.centroid(arcs[i])[0] + size[0] / 2 + offset[0] - n.width / 2;
      n.y = arc.centroid(arcs[i])[1] + size[1] / 2 + offset[1] - n.height / 2;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function treemap(nodes) {

    var treemap = d3.treemap()
        .size([size[0], size[1]])
        .padding(padding);

    var tree = treemap(d3.stratify()
        .id(function(d, i) { return i; })
        .parentId(function(d, i) {
          return i === 0 ? "": 0;
        })
        ([{}].concat(nodes))
          .sum(function(d, i) { return 1; })
        );

    nodes.forEach(function(n, i) {
      n.x = tree.children[i].x0 + offset[0];
      n.y = tree.children[i].y0 + offset[1];
      n.width = tree.children[i].x1 - tree.children[i].x0;
      n.height = tree.children[i].y1 - tree.children[i].y0;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function pack(nodes) {

    var pack = d3.pack()
        .size([size[0], size[1]])
        .padding(padding);

    var packed = pack(d3.stratify()
        .id(function(d, i) { return i; })
        .parentId(function(d, i) {
          return i === 0 ? "": 0;
        })
        ([{}].concat(nodes))
          .sum(function(d, i) { return 1; })
        );

    nodes.forEach(function(n, i) {
      n.x = packed.children[i].x + offset[0];
      n.y = packed.children[i].y + offset[1];
      n.width = packed.children[i].r;
      n.height = packed.children[i].r;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function stack(nodes) {

    var stack = d3.stack()
        .keys(nodes.map(function(d, i) { return i + "_"; })) // Creates unique ids for nodes
        .value(function(d, key) { return nodes.indexOf(d[key]); });

    y.domain([0, d3.sum(d3.range(nodes.length)) + nodes.length]).range([0, size[1]]);

    var new_data = {};

    nodes.map(function(d, i) {
      new_data[i+"_"] = d;
    })

    var stacked = stack([new_data]);

    nodes.forEach(function(n, i) {
      var s = stacked[i][0];
      n.x = offset[0];
      n.y = y(s[1]) + offset[1];
      n.width = size[0];
      n.height = y(s[1]) - y(s[0]);
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function diagonal(nodes) {

    x.domain([0, nodes.length]).range([0, size[0]]);
    y.domain([0, nodes.length]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      if(orient == "up") {
        n.x = x(i) + offset[0];
        n.y = height - (y(i) + offset[1]) - size[1] / nodes.length;
      } else {
        n.x = x(i) + offset[0];
        n.y = y(i) + offset[1];
      }

      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function cascade(nodes) {

    var spacing = size[0] * 2;

    x.domain([0, nodes.length]).range([0, spacing / nodes.length]);
    y.domain([0, nodes.length]).range([0, spacing / nodes.length]);

    nodes.forEach(function(n, i) {

      n.x = x(i) + offset[0];
      n.y = y(i) + offset[1];
      n.width = size[0] - spacing / nodes.length;
      n.height = size[1] - spacing / nodes.length;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
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

      n.x = x(col) + padding + offset[0];
      n.y = y(row) + padding + offset[1];

      n.width = size[0] / (cols + 1 / 2) - 2 * padding;
      n.height = size[1] / rows - 2 * padding;

      if(orient === "left") {
        if(row % 2 === 1) {
          n.x += n.width / 2;
        }
      } else {
        if(row % 2 === 0) {
          n.x += n.width / 2;
        }
      }

      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;

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
    valueX = _valueX;
    return gridding;
  }

  gridding.valueY = function(_valueY) {
    if(!arguments.length) return valueY;
    valueY = _valueY;
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

  return gridding;
};
