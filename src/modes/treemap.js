import * as d3Hierarchy from "d3-hierarchy";

export default function(nodes, v) {

  var treemap = d3Hierarchy.treemap()
      .size([v.size[0], v.size[1]])
      .padding(v.padding);

  var stratify = d3Hierarchy.stratify()
      .parentId(function(d) { return d.___parent_id; });

  nodes.forEach(function(d, i) {
    d.id = "_" + i;
    d.___parent_id = "_x";
  })

  var extra = [{"id": "_x", "___parent_id": ""}];

  var root = stratify(nodes.concat(extra))
      .sum(function(d) { return d.___parent_id === "" ? 0: 1; });

  if(v.valueHeight) {
    root.sum(function(d) { return v.valueHeight(d); });
  }

  if(v.sort) {
    if(v.sortAsc) {
      root.sort(function(a, b) { return a.value - b.value; });
    } else {
      root.sort(function(a, b) { return b.value - a.value; });
    }
  }

  var tree = treemap(root);

  tree.leaves().forEach(function(t, i) {
    t.data[v.__x] = t.x0 + v.offset[0];
    t.data[v.__y] = t.y0 + v.offset[1];

    t.data[v.__width] = t.x1 - t.x0;
    t.data[v.__height] = t.y1 - t.y0;

    t.data[v.__cx] = nodes[i][v.__x] + nodes[i][v.__width] / 2;
    t.data[v.__cy] = nodes[i][v.__y] + nodes[i][v.__height] / 2;
  });

  return nodes;
}
