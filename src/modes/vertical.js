import * as d3Array from "d3-array";
import rotate from "../utils/rotate";

export default function(nodes, v) {

  if(v.sort) {
    nodes = nodes.sort(v.sort);
  }

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, nodes.length]).range([0, v.size[0] - 2 * v.padding]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain([0, d3Array.sum(nodes, _valueWidth)]).range([0, v.size[0] - 2 * v.padding]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, 1]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain([0, d3Array.max(nodes, _valueHeight)]).range([0, v.size[1] - 2 * v.padding]);
  }

  if(nodes.length > 0) {
    nodes[0].x0 = v.padding;
  }

  nodes.forEach(function(n, i) {

    n[v.__x] = n.x0 + v.offset[0] + v.margin;

    if(v.orient === "down") {
      n[v.__y] = 0 + v.offset[1] + v.margin + v.padding;
    } else if(v.orient === "up") {
      n[v.__y] = v.size[1] - v.height(_valueHeight(n)) + v.offset[1] + v.margin - v.padding;
    } else if(v.orient === "center") {
      n[v.__y] = (v.size[1] / 2) - v.height(_valueHeight(n)) / 2 + v.offset[1] + v.margin - v.padding;
    } else { // defaut up
      n[v.__y] = v.size[1] - v.height(_valueHeight(n)) + v.offset[1] + v.margin - v.padding;
    }

    n[v.__height] = v.height(_valueHeight(n)) - 2 * v.margin;
    n[v.__width] = v.width(_valueWidth(n));

    // Updates the next node's y0 for all nodes but the last one
    if(i < nodes.length - 1) {
      nodes[i+1].x0 = n.x0 + n[v.__width];
    }

    n[v.__width] -= 2 * v.margin;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    if(v.rotate !==null) {
      n["__p"] = [];
      n["__p"].push(rotate(v.size[0] / 2, v.size[1] / 2, n[v.__x], n[v.__y], v.rotate));
      n["__p"].push(rotate(v.size[0] / 2, v.size[1] / 2, n[v.__x] + n[v.__width], n[v.__y], v.rotate));
      n["__p"].push(rotate(v.size[0] / 2, v.size[1] / 2, n[v.__x] + n[v.__width], n[v.__y] + n[v.__height], v.rotate));
      n["__p"].push(rotate(v.size[0] / 2, v.size[1] / 2, n[v.__x], n[v.__y] + n[v.__height], v.rotate));
      n["__p"].push(rotate(v.size[0] / 2, v.size[1] / 2, n[v.__x], n[v.__y], v.rotate));
    }

  });

  return nodes;
}
