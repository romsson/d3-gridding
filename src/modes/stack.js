import * as d3Array from "d3-array";
import * as d3Shape from "d3-shape";

export default function(nodes, v) {

  var stack = d3Shape.stack()
      .keys(nodes.map(function(d, i) { return i + "_"; })) // Creates unique ids for nodes
      .value(function(d, key) { return nodes.indexOf(d[key]); });

  v.y.domain([0, d3Array.sum(d3Array.range(nodes.length)) + nodes.length]).range([0, v.size[1]]);

  var new_data = {};

  nodes.map(function(d, i) {
    new_data[i+"_"] = d;
  })

  var stacked = stack([new_data]);

  nodes.forEach(function(n, i) {
    var s = stacked[i][0];

    n[v.__x] = v.offset[0] + v.padding;
    n[v.__y] = v.y(s[1]) + v.offset[1] + v.padding;

    n[v.__width] = v.size[0];
    n[v.__height] = v.y(s[1]) - v.y(s[0]);

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
