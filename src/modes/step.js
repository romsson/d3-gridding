export default function(nodes, v) {

  var _shiftX = v.size[0] / (2 * nodes.length);

  nodes.forEach(function(n, i) {
    n[v.__x] = 0 + v.offset[0] + _shiftX * i  + v.padding;
    n[v.__y] = 0 + v.offset[1] + v.padding;

    n[v.__width] = v.size[0] - _shiftX * i * 2;
    n[v.__height] = v.size[1];

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
