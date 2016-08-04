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
        "diagonal": diagonal
      },
      layout = identity,
      size = [1, 1],
      offset = [0, 0],
      cols,
      rows,
      r,
      padding = 1,
      sort = function(a, b) { return a - b; },
      value = function(d) { return d; },
      x = d3Scale.scaleLinear(),
      y = d3Scale.scaleLinear();

  function gridding(nodes) {

    nodes.sort(function(a, b) {
      return sort(value(a), value(b));
    });

    return layout(nodes);
  }

  function identity(nodes) {

    return nodes;
  }

  function horizontal(nodes) {

    y.domain([0, nodes.length]).range([0, size[1]]);

    nodes.forEach(function(n, i) {
      n.x = 0 + offset[0];
      n.y = y(i) + offset[1];
      n.width = size[0];
      n.height = size[1] / nodes.length;
      n.cx = n.width / 2;
      n.cy = y(i) + n.height / 2;
    });

    return nodes;
  }

  function vertical(nodes) {

    x.domain([0, nodes.length]).range([0, size[0]]);

    nodes.forEach(function(n, i) {
      n.x = x(i) + offset[0];
      n.y = 0 + offset[1];
      n.width = size[0] / nodes.length;
      n.height = size[1];
      n.cx = n.x + n.width / 2;
      n.cy = n.height / 2;
    });

    return nodes;
  }

  function central(nodes) {

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
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function coordinate(nodes) {

    x.domain([0, 1]).range([0, size[0]]);
    y.domain([0, 1]).range([0, size[1]]);

    nodes.forEach(function(n, i) {
      n.x = x(Math.random()) + offset[0];
      n.y = y(Math.random()) + offset[1];
      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  function radial(nodes) {

    r = Math.min(size[0], size[1]) / 2;

    var arc = d3Shape.arc()
        .outerRadius(r)
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

  function diagonal(nodes) {

    x.domain([0, nodes.length]).range([0, size[0]]);
    y.domain([0, nodes.length]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

        n.x = x(i) + offset[0];
        n.y = y(i) + offset[1];
        n.width = size[0] / nodes.length;
        n.height = size[1] / nodes.length;
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
    } else {
      layout = modes[mode];
    }

    return gridding;
  }

  gridding.modes = function() {
    return d3.keys(modes);
  }

  gridding.size = function(value) {
    if(!arguments.length) return size;
    size = value;
    return gridding;
  }

  gridding.value = function(_value) {
    if(!arguments.length) return value;
    value = _value;
    return gridding;
  }

  gridding.sort = function(_sort) {
    if(!arguments.length) return _sort;
    sort = _sort;
    return gridding;
  }

  gridding.padding = function(_padding) {
    if(!arguments.length) return _padding;
    padding = _padding;
    return gridding;
  }

  gridding.offset = function(_offset) {
    if(!arguments.length) return _offset;
    offset = _offset;
    return gridding;
  }

  return gridding;
};
