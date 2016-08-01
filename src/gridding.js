import * as d3Scale from 'd3-scale';

export default function() {

  var mode = "identity",
      modes = ["horizontal", "vertical", "central", "grid", "coordinate", "radial", "identity"],
      layout = identity,
      size = [1, 1],
      cols,
      rows,
      x = d3Scale.scaleLinear(),
      y = d3Scale.scaleLinear();

  function gridding(nodes) {
    return layout(nodes);
  }

  function identity(nodes) {
    return nodes;
  }

  function horizontal(nodes) {
    y.domain([0, nodes.length]).range([0, size[1]]);
    nodes.forEach(function(n, i) {
      n.x = 0;
      n.y = n.cy = y(i);
      n.cx = size[0] / 2;
      n.width = size[0];
      n.height = size[1] / nodes.length;
    });
    return nodes;
  }

  function vertical(nodes) {
    x.domain([0, nodes.length]).range([0, size[0]]);
    nodes.forEach(function(n, i) {
      n.x = x(i);
      n.y = 0;
      n.cx = x(i) + (size[0] / nodes.length) / 2;
      n.cy = size[1] / 2;
      n.width = size[0] / nodes.length;
      n.height = size[1];
    });

    return nodes;
  }

  function central(nodes) {

    nodes.forEach(function(n, i) {
      n.x = 0;
      n.y = 0;
      n.cx = size[0] / 2;
      n.cy = size[1] / 2;
      n.width = size[0];
      n.height = size[1];
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

      n.x = x(col);
      n.cx = x(col) + (size[0] / cols) / 2;
      n.y = y(row);
      n.cy = y(row) + (size[1] / rows) / 2;
      n.width = size[0] / cols;
      n.height = size[1] / rows;
    });

    return nodes;
  }

  function coordinate(nodes) {

    x.domain([0, 1]).range([0, size[0]]);
    y.domain([0, 1]).range([0, size[1]]);

    nodes.forEach(function(n, i) {
      n.x = n.cx = x(Math.random());
      n.y = n.cy = y(Math.random());
      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
    });

    return nodes;
  }

  function radial(nodes) {

    var r = Math.min(size[0], size[1]);

    var arc = d3.arc()
        .outerRadius(r)
        .innerRadius(0)

    var pie = d3.pie()
        .value(function(d) { return 1; });

    var arcs = pie(nodes);

    nodes.forEach(function(n, i) {
      n.x = n.cx = arc.centroid(arcs[i])[0] + r / 2;
      n.y = n.cy = arc.centroid(arcs[i])[1] + r / 2;
      n.width = size[0] / nodes.length;
      n.height = size[1] / nodes.length;
    });

    return nodes;

  }

  gridding.mode = function(value) {
    if (!arguments.length) return mode;
    mode = value;
    switch(mode) {
      case "horizontal":
        layout = horizontal;
      break;
      case "vertical":
        layout = vertical;
      break;
      case "central":
        layout = central;
      break;
      case "grid":
        layout = grid;
      break;
      case "coordinate":
        layout = coordinate;
      break;
      case "radial":
        layout = radial;
      break;
      case "identity":
      default:
        layout = identity;
      break;
    }
    return gridding;
  }

  gridding.modes = function() {
    return modes;
  }

  gridding.size = function(value) {
    if (!arguments.length) return size;
    size = value;
    return gridding;
  }

  return gridding;
};
