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

  nodes.forEach(function(n, i) {
    n[v.__x] = packed.children[i].x + v.offset[0];
    n[v.__y] = packed.children[i].y + v.offset[1];

    n[v.__width] = packed.children[i].r;
    n[v.__height] = packed.children[i].r;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
