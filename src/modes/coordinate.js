import * as d3Array from "d3-array";

export default function(nodes, v) {

  // var _valueX;

  // Create random data if no value function has been set
  if(!v.valueX) {
    v.valueX = function() { return Math.random(); }
    v.x.domain([0, 1]).range([0, v.size[0]]);
  } else {
    v.x.domain([0, d3Array.max(nodes, v.valueX)]).range([0, v.size[0]]);
  }

  // var _valueY;

  // Same as for X, create random data for vertical axis
  if(!v.valueY) {
    v.valueY = function() { return Math.random(); }
    v.y.domain([0, 1]).range([0, v.size[1]]);
  } else {
    v.y.domain([0, d3Array.max(nodes, v.valueY)]).range([0, v.size[1]]);
  }

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, nodes.length]).range([0, v.size[0]]);
  } else if(typeof v.valueWidth === "string") { // pixels
    _valueWidth = function() { return +v.valueWidth; }
    v.width.domain([0, 1]).range([0, 1]);
  } else if(typeof v.valueWidth === "number") { // proportion
    _valueWidth = function() { return v.valueWidth; }
    v.width.domain([0, v.size[0]]).range([0, v.size[0] - 2 * v.padding]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain(d3Array.extent(nodes, v.valueX)).range([0, v.size[0]]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, nodes.length]).range([0, v.size[1]]);
  } else if(typeof v.valueHeight === "string") { // pixels
    _valueHeight = function() { return +v.valueHeight; }
    v.height.domain([0, 1]).range([0, 1]);
  } else if(typeof v.valueHeight === "number") { // proportion
    _valueHeight = function() { return v.valueHeight; }
    v.height.domain([0, v.size[1]]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain(d3Array.extent(nodes, v.valueY)).range([0, v.size[1]]);
  }

  // Preveting overflows
  v.x.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);
  v.width.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);

  v.y.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);
  v.height.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);

  nodes.forEach(function(n) {
    n[v.__x] = v.x(v.valueX(n)) + v.offset[0] + v.padding;
    n[v.__y] = v.y(v.valueY(n)) + v.offset[1] + v.padding;

    n[v.__width] = v.width(_valueWidth(n)) - 2 * v.padding;
    n[v.__height] = v.height(_valueHeight(n)) - 2 * v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
