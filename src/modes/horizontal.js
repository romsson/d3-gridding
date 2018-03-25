import * as d3Array from "d3-array";

export default function(nodes, v) {

  if(v.sort) {
    nodes = nodes.sort(v.sort);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, nodes.length]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain([0, d3Array.sum(nodes, _valueHeight)]).range([0, v.size[1] - 2 * v.padding]);
  }

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, 1]).range([0, v.size[0] - 2 * v.padding]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain([0, d3Array.max(nodes, _valueWidth)]).range([0, v.size[0] - 2 * v.padding]);
  }

  if(nodes.length > 0) {
    nodes[0].y0 = v.padding;
  }

  nodes.forEach(function(n, i) {

    n[v.__y] = n.y0 + v.offset[1] + v.margin;

    if(v.orient === "right") {
      n[v.__x] = 0 + v.offset[0] + v.padding + v.margin;
    } else if(v.orient === "left") {
      n[v.__x] = v.size[0] - v.width(_valueWidth(n))  + v.offset[0] - v.padding + v.margin;
   } else if(v.orient === "up") {
      n[v.__x] = 0 + v.offset[0] + v.padding + v.margin;
     // n[v.__y] = v.size[1] - n.y0 - v.height(_valueHeight(n)) - v.offset[1] - v.margin;
    } else if(v.orient === "center") {
      n[v.__x] = (v.size[0] / 2) - v.width(_valueWidth(n)) / 2 + v.offset[0] + v.margin;
    } else { // defaut right
      n[v.__x] = 0 + v.offset[0] + v.padding + v.margin;
    }

    n[v.__width] = v.width(_valueWidth(n)) - 2 * v.margin;
    n[v.__height] = v.height(_valueHeight(n));

    // Updates the next node's y0 for all nodes but the last one
    if(i < nodes.length - 1) {
      nodes[i+1].y0 = n.y0 + n[v.__height];
    }

    n[v.__height] -= 2 * v.margin;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
