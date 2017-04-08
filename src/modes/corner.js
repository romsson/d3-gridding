import * as d3Array from "d3-array";

export default function(nodes, v) {

  var shiftX = v.size[0] / (2 * nodes.length);
  var shiftY = v.size[1] / (2 * nodes.length);

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function(d, i) { return i; }
    v.width.domain([0, nodes.length]).range([0, v.size[0] - 2 * v.padding]);
  } else if(typeof v.valueWidth === "number") {
    _valueWidth = function() { return v.valueWidth; }
    v.width.domain([0, v.size[0]]).range([0, v.size[0] - 2 * v.padding]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain([0, d3Array.max(nodes, _valueWidth)]).range([0, v.size[0] - 2 * v.padding]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function(d, i) { return i; }
    v.height.domain([0, nodes.length]).range([0, v.size[1] - 2 * v.padding]);
  } else if(typeof v.valueHeight === "number") {
    _valueHeight = function() { return v.valueHeight; }
    v.height.domain([0, v.size[1]]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain([0, d3Array.max(nodes, _valueHeight)]).range([0, v.size[1] - 2 * v.padding]);
  }

  nodes.forEach(function(n, i) {

    n[v.__width] = v.size[0] - shiftX * i * 2;
    n[v.__height] = v.size[1] - shiftY * i * 2;

    if(v.orient === "top right") {

      n[v.__x] = v.size[0] - n.width + v.offset[0];
      n[v.__y] = 0 + v.offset[1];

    } else if(v.orient === "bottom right") {

      n[v.__x] = v.size[0] - n[v.__width] + v.offset[0];
      n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

    } else if(v.orient === "bottom left") {

      n[v.__x] = 0 + v.offset[0];
      n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

    } else if(v.orient === "top") {

      n[v.__width] = v.width(_valueWidth(n, i)) - 2 * v.margin;
      n[v.__height] = v.height(_valueHeight(n, i)) - 2 * v.margin;

      n[v.__x] = 0 + v.offset[0] + (v.size[0] / 2) - (n[v.__width] / 2) + v.padding;
      n[v.__y] = 0 + v.offset[1] + v.padding;

    } else if(v.orient === "bottom") {

      n[v.__width] = v.width(_valueWidth(n, i)) - 2 * v.margin;
      n[v.__height] = v.size[1] - 10 - 3*i;// v.height(_valueHeight(n, i)) - 2 * v.margin;

      n[v.__x] = 0 + v.offset[0] + (v.size[0] / 2) - (n[v.__width] / 2) + 2 * i;
      n[v.__y] = 0 + v.offset[1] + v.size[1] - n[v.__height];

    } else if(v.orient === "middle") {

      n[v.__width] = v.width(_valueWidth(n, i)) - 2 * v.margin;
      n[v.__height] = v.height(_valueHeight(n, i)) - 2 * v.margin;

      n[v.__x] = 0 + v.offset[0] + (v.size[0] / 2) - (n[v.__width] / 2);
      n[v.__y] = 0 + v.offset[1] + (v.size[1] / 2) - (n[v.__height] / 2);

    } else { // default top

      n[v.__x] = 0 + v.offset[0];
      n[v.__y] = 0 + v.offset[1];
      n[v.__width] = v.width(_valueWidth(n, i)) - 2 * v.margin;
      n[v.__height] = v.height(_valueHeight(n, i)) - 2 * v.margin;

    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

  });

  return nodes;
}
