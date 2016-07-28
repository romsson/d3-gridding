import {ordinal} from "d3-scale";

export default function() {
  var mode = "identity",
      layout = identity,
      size = [1, 1];

  function gridding(nodes) {
    return layout(nodes);
  }

  function identity(nodes) {
    return nodes;
  }

  gridding.size = function(value) {
    if (!arguments.length) return size;
    size = value;
    return gridding;
  }

  return gridding;
};
