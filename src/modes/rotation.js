export default function(nodes, v) {

  v.cols = v.rows = 1;

  var shiftRotate = v.rotate / nodes.length;

  var shiftX = v.size[0]/4, shiftY = v.size[1]/4;

  nodes.forEach(function(n, i) {

    n[v.__x] = shiftX + v.padding + v.offset[0];
    n[v.__y] = shiftY + v.padding + v.offset[1];

    n[v.__width] = v.size[0] - 2 * v.padding - 2 * shiftX;
    n[v.__height] = v.size[1] - 2 * v.padding - 2 * shiftY;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    n[v.__r] = shiftRotate * i;
  });

  return nodes;
}
