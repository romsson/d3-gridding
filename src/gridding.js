import * as d3Scale from 'd3-scale';

export default function() {

  var mode = "identity",
      layout = identity,
      size = [1, 1],
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
    })
    return nodes;
  }

  function vertical(nodes) {
    x.domain([0, nodes.length]).range([0, size[0]]);
    nodes.forEach(function(n, i) {
      n.x = x(i);
      n.y = size[1] / 2;
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
      case "identity":
      default:
        layout = identity;
      break;
    }
    return gridding;
  }

  gridding.size = function(value) {
    if (!arguments.length) return size;
    size = value;
    return gridding;
  }

  return gridding;
};
