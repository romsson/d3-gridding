import * as d3Scale from 'd3-scale';
import * as d3Shape from "d3-shape";
import * as d3Hierarchy from "d3-hierarchy";

export default function() {

  var mode = "identity",
      modes = {"horizontal": horizontal, "vertical": vertical, "central": central, "grid": grid, "coordinate": coordinate, "radial": radial, "treemap": treemap, "pack": pack,"identity": identity},
      layout = identity,
      size = [1, 1],
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
      n.x = 0;
      n.y = y(i);
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
      n.x = x(i);
      n.y = 0;
      n.width = size[0] / nodes.length;
      n.height = size[1];
      n.cx = n.x + n.width / 2;
      n.cy = n.height / 2;
    });

    return nodes;
  }

  function central(nodes) {

    nodes.forEach(function(n, i) {
      n.x = 0;
      n.y = 0;
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

      n.x = x(col) + padding;
      n.y = y(row) + padding;
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
      n.x = x(Math.random());
      n.y = y(Math.random());
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
        .innerRadius(0)

    var pie = d3Shape.pie()
        .sort(sort)
        .value(function(d) { return 1; });

    var arcs = pie(nodes);

    nodes.forEach(function(n, i) {
      n.x = n.cx = arc.centroid(arcs[i])[0] + r;
      n.y = n.cy = arc.centroid(arcs[i])[1] + r;
      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
      n.cx = n.x + n.width / 2;
      n.cy = n.y + n.height / 2;

    });

    return nodes;
  }


  function treemap(nodes) {

    var treemap = d3.treemap()
        .size([width, height])
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

        n.x = tree.children[i].x0;
        n.y = tree.children[i].y0;
        n.width = tree.children[i].x1 - n.x;
        n.height = tree.children[i].y1 - n.y;
        n.cx = n.x + n.width / 2;
        n.cy = n.y + n.height / 2;

    });

    return nodes;
  }

  function pack(nodes) {

    var pack = d3.pack()
        .size([width, height])
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

        n.x = packed.children[i].x;
        n.y = packed.children[i].y;
        n.width = packed.children[i].r;
        n.height = packed.children[i].r;
        n.cx = n.x + n.width / 2;
        n.cy = n.y + n.height / 2;
    });

    return nodes;
  }

  gridding.mode = function(value) {

    if (!arguments.length) return mode;
    mode = value;

    layout = modes[mode];

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

  return gridding;
};
