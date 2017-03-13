import * as d3Hierarchy from "d3-hierarchy";

export default function(nodes, v) {

  var treeData = d3Hierarchy.stratify()
      .id(v.id)
      .parentId(v.parentId)(nodes);

  var tree = d3Hierarchy.tree()
      .size([v.size[0], v.size[1] / 2])

  var treeLayout = d3Hierarchy.hierarchy(treeData, function(d) {
      return d.children;
    });

  treeLayout = tree(treeLayout);

  nodes.forEach(function(n, i) {

    n[v.__width] = v.cellSize ? v.cellSize[0]: v.size[0] / nodes.length;
    n[v.__height] = v.cellSize ? v.cellSize[1]: v.size[1] / nodes.length;

    n[v.__x] = treeLayout.descendants()[i].x + v.offset[0] - n[v.__width] / 2;
    n[v.__y] = treeLayout.descendants()[i].y + v.offset[1];

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

  });

  return nodes;
}
