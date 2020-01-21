import {max, sum} from "d3-array";
import {margin} from "../utils/margin.js";
import {constant} from "../utils/constant.js";

export default function(nodes, v) {

  if (v.sort) {
    nodes = nodes.sort(v.sort);
  }

  var _valueHeight = v.valueHeight ? v.valueHeight : constant(1),
      _valueWidth = v.valueWidth ? v.valueWidth : constant(1),
      heights = nodes.map(_valueHeight),
      widths = nodes.map(_valueWidth);
  
  v.height.domain([0, sum(heights)])
    .range([0, max([1, v.size[1] - 2 * v.padding - nodes.length * (margin(v,"top") + margin(v,"bottom"))])]);

  v.width.domain([0, max(widths)])
    .range([0, max([1, v.size[0] - 2 * v.padding - (margin(v, "left") + margin(v, "right"))])]);

  if (nodes.length > 0) {
    nodes[0].y0 = v.padding;
  }

  nodes.forEach(function(n, i) {

    n[v.__y] = n.y0 + v.offset[1] + (i+1) * (margin(v, "top")) + i * margin(v, "bottom");

    if(v.orient === "right") {
      n[v.__x] = 0 + v.offset[0] + v.padding + margin(v, "left");
    } else if(v.orient === "left") {
      n[v.__x] = v.size[0] - v.width(widths[i])  + v.offset[0] - v.padding + margin(v, "right");
   } else if(v.orient === "up") {
      n[v.__x] = 0 + v.offset[0] + v.padding + margin(v, "left");
     // n[v.__y] = v.size[1] - n.y0 - v.height(heights[i]) - v.offset[1] - margin(v, "top");
    } else if(v.orient === "center") {
      n[v.__x] = (v.size[0] / 2) - v.width(widths[i]) / 2 + v.offset[0] + margin(v, "left");
    } else { // defaut right
      n[v.__x] = 0 + v.offset[0] + v.padding + margin(v, "left");
    }

    n[v.__width] = v.width(widths[i]);
    n[v.__height] = v.height(heights[i]);

    // Updates the next node's y0 for all nodes but the last one
    if(i < nodes.length - 1) {
      nodes[i+1].y0 = n.y0 + n[v.__height];
    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

  });

  return nodes;
}
