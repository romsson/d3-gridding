import * as d3Array from "d3-array";
import * as d3Hierarchy from "d3-hierarchy";

export default function(nodes, v) {

  var pack = d3Hierarchy.pack()
      .size([v.size[0], v.size[1]])
      .padding(v.padding);

  var packed = pack(d3Hierarchy.stratify()
      .id(function(d, i) { return i; })
      .parentId(function(d, i) {
        return i === 0 ? "": 0;
      })([{}].concat(nodes))
        .sum(function() { return 1; })
      );

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function(_, i) { return packed.children[i].r; }
    v.width.domain([0, 1]).range([0, 1]);
  } else if(typeof v.valueWidth === "number") {
    _valueWidth = function() { return v.valueWidth; }
    v.width.domain([0, v.size[0]]).range([0, v.size[0] - 2 * v.padding]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain(d3Array.extent(nodes, v.valueX)).range([0, v.size[0]]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function(_, i) { return packed.children[i].r; }
    v.width.domain([0, 1]).range([0, 1]);
  } else if(typeof v.valueHeight === "number") {
    _valueHeight = function() { return v.valueHeight; }
    v.height.domain([0, v.size[1]]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain(d3Array.extent(nodes, v.valueY)).range([0, v.size[1]]);
  }

  nodes.forEach(function(n, i) {
    n[v.__x] = packed.children[i].x + v.offset[0];
    n[v.__y] = packed.children[i].y + v.offset[1];

    //n[v.__width] = packed.children[i].r;
    //n[v.__height] = packed.children[i].r;

    n[v.__width] = v.width(_valueWidth(n, i));
    n[v.__height] = v.height(_valueHeight(n, i));


    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
