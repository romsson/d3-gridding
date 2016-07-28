import * as d3Scale from 'd3-scale';

export default function() {
  var mode = "identity",
      layout = identity,
      size = [1, 1],
      x = d3Scale.scaleOrdinal();

  function gridding(nodes) {
    return layout(nodes);
  }

  function identity(nodes) {
    return nodes;
  }

  function horizontal(nodes) {
    //x.domain(d3.range(nodes.length)).range(size);
    nodes.forEach(function(n, i) {
     // n.x = x(i);
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
      case "identity":
      default:
        layout = identity;
      break;
    }
    return grid;
  }

  gridding.size = function(value) {
    if (!arguments.length) return size;
    size = value;
    return gridding;
  }

  return gridding;
};
