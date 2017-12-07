export default function(nodes, v) {

  nodes.forEach(function(n) {

    n[v.__x] = 0 + v.padding + v.offset[0];
    n[v.__y] = 0 + v.padding + v.offset[1];

    n[v.__width] = v.size[0] - 2 * v.padding;
    n[v.__height] = v.size[1] - 2 * v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    n[v.__tx] = n[v.__cx] / 2;
    n[v.__ty] = v.padding / 2;

    n[v.__lx] = n[v.__cx] + v.padding / 2;
    n[v.__ly] = 0;

    n[v.__rx] = n[v.__cx] - v.padding / 2;
    n[v.__ry] = n[v.__yx] / 2;
  });

  return nodes;
}
