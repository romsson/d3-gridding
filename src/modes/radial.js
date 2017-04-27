import * as d3Shape from "d3-shape";

export default function(nodes, v) {

  if(!v.radius) {
    v.radius = Math.min(v.size[0], v.size[1]) - 2 * (v.size[1] / nodes.length);
  }

  var arc = d3Shape.arc()
      .outerRadius(v.radius)
      .innerRadius(0);

  var pie = d3Shape.pie()
      .sort(v.sort)
      .value(function() { return 1; });

  var arcs = pie(nodes);

  nodes.forEach(function(n, i) {

    n[v.__width] = v.size[0] / nodes.length;
    n[v.__height] = v.size[1] / nodes.length;

    // Must be after width & height
    n[v.__x] = arc.centroid(arcs[i])[0] + v.size[0] / 2 + v.offset[0] - n[v.__width] / 2 + v.padding;
    n[v.__y] = arc.centroid(arcs[i])[1] + v.size[1] / 2 + v.offset[1] - n[v.__height] / 2 + v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
