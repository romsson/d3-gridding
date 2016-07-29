import * as d3Scale from 'd3-scale';

export default function() {

  var mode = "identity",
      modes = ["horizontal", "vertical", "central", "grid", "coordinate", "identity"],
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
      n.x = size[0] / 2;
      n.y = y(i);
    });
    return nodes;
  }

  function vertical(nodes) {
    x.domain([0, nodes.length]).range([0, size[0]]);
    nodes.forEach(function(n, i) {
      n.x = x(i);
      n.y = size[1] / 2;

    });
    return nodes;
  }

  function central(nodes) {
    nodes.forEach(function(n, i) {
      n.x = 0;
      n.y = 0;
      n.cx = size[0] / 2;
      n.cy = size[1] / 2;
      n.height = size[0];
      n.width = size[1];
    })
    return nodes;
  }

  function grid(nodes) {

    cols = Math.ceil(Math.sqrt(nodes.length));
    rows = Math.ceil(nodes.length / cols);

    x.domain([0, nodes.length]).range([0, size[0]]);
    y.domain([0, nodes.length]).range([0, size[1]]);

    nodes.forEach(function(n, i) {

      var col = i % cols;
      var row = Math.floor(i / cols);

      n.x = x(col);
      n.y = y(row);
    });

    return nodes;
  }

  function coordinate(nodes) {

    x.domain([0, 1]).range([0, size[0]]);
    y.domain([0, 1]).range([0, size[1]]);

    nodes.forEach(function(n, i) {
      n.x = x(Math.random());
      n.y = y(Math.random());
    })

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
