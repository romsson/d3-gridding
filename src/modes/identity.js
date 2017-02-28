export default function(nodes, v) {

  nodes.forEach(function(n) {
    n[v.__x] = n[v.__x] || 0;
    n[v.__y] = n[v.__y] || 0;

    n[v.__width] = n[v.__width] || v.size[0];
    n[v.__height] = n[v.__height] || v.size[1];

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
