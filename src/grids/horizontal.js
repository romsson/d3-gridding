import * as d3Array from "d3-array";

export default function(nodes, v) {

  v.rows = nodes.length;

  v.y.domain([0, v.rows]).range([0, v.size[1]]);

  var _valueY;

  if(!v.valueY) {
    _valueY = function() { return 1; }
    v.y.domain([0, nodes.length]).range([0, v.size[1]]);
  } else {
    _valueY = v.valueY;
    v.y.domain([0, d3Array.sum(nodes, _valueY)]).range([0, v.size[1]]);
  }

  if(typeof v.cellSize !== "undefined") {
    v.size[1] = v.cellSize[1] * v.rows;
  }

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, 1]).range([0, v.size[0]]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain(d3Array.extent(nodes, _valueWidth)).range([0, v.size[0]]);
  }

  nodes[0].y0 = 0;

  nodes.forEach(function(n, i) {

    n[v.__x] = 0 + v.offset[0];
    n[v.__y] = n.y0 + v.offset[1];

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
