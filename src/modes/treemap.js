import * as d3Hierarchy from "d3-hierarchy";

export default function(nodes, v) {

  var treemap = d3Hierarchy.treemap()
      .size([v.size[0], v.size[1]])
      .padding(v.padding);

  var stratify = d3Hierarchy.stratify()
      .id(function(d, i) { return i; })
      .parentId(function(d, i) {
        return i === 0 ? "": 0;
      });

  var r = stratify([{}].concat(nodes)).sum(function() { return 1; });

  var tree = treemap(r);

  nodes.forEach(function(n, i) {
    n[v.__x] = tree.children[i].x0 + v.offset[0];
    n[v.__y] = tree.children[i].y0 + v.offset[1];

    n[v.__width] = tree.children[i].x1 - tree.children[i].x0;
    n[v.__height] = tree.children[i].y1 - tree.children[i].y0;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
