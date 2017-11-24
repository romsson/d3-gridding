import * as d3Array from "d3-array";

export default function(nodes, v) {

  var _valueX, _valueXmax;

  // Create random data if no value function has been set
  if(!v.valueX) {
    _valueX = function() { return Math.random(); }
    _valueXmax = 1;
  } else if(typeof v.valueX === "string") {
    _valueX = function(d) { return d[v.valueX]; }
    _valueXmax = d3Array.max(nodes, _valueX);
  } else {
    _valueX = v.valueX;
    _valueXmax = d3Array.max(nodes, _valueX);
  }

  v.x.domain([0, _valueXmax]).range([0, v.size[0]]);

  var _valueY, _valueYmax;

  // Same as for X, create random data for vertical axis
  if(!v.valueY) {
    _valueY = function() { return Math.random(); }
    _valueYmax = 1;
  } else if(typeof v.valueY === "string") {
    _valueY = function(d) { return d[v.valueY]; }
    _valueYmax = d3Array.max(nodes, _valueY)
  } else {
    _valueY = v.valueY;
    _valueYmax = d3Array.max(nodes, v.valueY);
  }

  v.y.domain([0, _valueYmax]).range([0, v.size[1]]);

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
  } else { // function
    _valueWidth = v.valueWidth;
    v.width.domain([0, _valueXmax]).range([0, v.size[0]]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, nodes.length]).range([0, v.size[1]]);
  } else if(typeof v.valueWidth === "string") { // pixels
    _valueHeight = function() { return +v.valueHeight; }
    v.height.domain([0, 1]).range([0, 1]);
  } else if(typeof v.valueWidth === "number") { // proportion
    _valueHeight = function() { return v.valueHeight; }
    v.height.domain([0, v.size[0]]).range([0, v.size[1] - 2 * v.padding]);
  } else { // function
    _valueHeight = v.valueHeight;
    v.height.domain([0, _valueYmax]).range([0, v.size[1]]);
  }

  // Preveting overflows
  // v.x.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);
  // v.width.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);
  // v.y.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);
  // v.height.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);

  nodes.forEach(function(n) {
    n[v.__x] = v.x(_valueX(n)) + v.offset[0] + v.padding;
    n[v.__y] = v.y(_valueY(n)) + v.offset[1] + v.padding;

    n[v.__width] = v.width(_valueWidth(n)) - 2 * v.padding;
    n[v.__height] = v.height(_valueHeight(n)) - 2 * v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
