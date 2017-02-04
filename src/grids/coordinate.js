import * as d3Array from "d3-array";

export default function(nodes, v) {

  // Create random data if no value function has been set
  if(!v.valueX) {
    v.valueX = function() { return Math.random(); }
    v.x.domain([0, 1]).range([v.padding, v.size[0] - 2 * v.padding]);
  } else {
    v.x.domain(d3Array.extent(nodes, v.valueX)).range([v.padding, v.size[0]  - 2 * v.padding]);
  }

  // Same as for X, create random data for vertical axis
  if(!v.valueY) {
    v.valueY = function() { return Math.random(); }
    v.y.domain([0, 1]).range([v.padding, v.size[1] - 2 * v.padding]);
  } else {
    v.y.domain(d3Array.extent(nodes, v.valueY)).range([v.padding, v.size[1] - 2 * v.padding]);
  }

  nodes.forEach(function(n) {
    n[v.__x] = v.x(v.valueX(n)) + v.offset[0];
    n[v.__y] = v.y(v.valueY(n)) + v.offset[1];

    n[v.__width] = v.cellSize ? v.cellSize[0]: v.size[0] / nodes.length;
    n[v.__height] = v.cellSize ? v.cellSize[1]: v.size[1] / nodes.length;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
