import {max, sum} from "d3-array";
import {margin} from "../utils/margin.js";
import {constant} from "../utils/constant.js";
import rotate from "../utils/rotate";

export default function(nodes, v) {

  if(v.sort) {
    nodes = nodes.sort(v.sort);
  }

  var _valueHeight = v.valueHeight ? v.valueHeight : constant(1),
      _valueWidth = v.valueWidth ? v.valueWidth : constant(1),
      heights = nodes.map(_valueHeight),
      widths = nodes.map(_valueWidth);
  
  v.height.domain([0, max(heights)])
    .range([0, Math.max(1, v.size[1] - 2 * v.padding - (margin(v,"top") + margin(v,"bottom")))]);

  v.width.domain([0, sum(widths)])
    .range([0, Math.max(1, v.size[0] - 2 * v.padding - nodes.length * (margin(v, "left") + margin(v, "right")))]);


  let x0 = v.padding;

  nodes.forEach(function(n, i) {

    n[v.__x] = x0 + v.offset[0] + (i+1) * (margin(v, "left")) + i * margin(v, "right");

    if(v.orient === "down") {
      n[v.__y] = 0 + v.offset[1] + margin(v, "top") + v.padding;
    } else if(v.orient === "up") {
      n[v.__y] = v.size[1] - v.height(heights[i]) + v.offset[1] + margin(v, "bottom") - v.padding;
    } else if(v.orient === "center") {
      n[v.__y] = (v.size[1] / 2) - v.height(heights[i]) / 2 + v.offset[1] + margin(v, "top") - v.padding;
    } else { // defaut up
      n[v.__y] = v.size[1] - v.height(heights[i]) + v.offset[1] + margin(v, "bottom") - v.padding;
    }

    n[v.__height] = v.height(heights[i]);
    n[v.__width] = v.width(widths[i]);

    x0 += n[v.__width];

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
