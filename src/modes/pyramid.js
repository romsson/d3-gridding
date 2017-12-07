export default function(nodes, v) {

  nodes.forEach(function(n, i) {

    if(v.orient == "bottom") {

      var shiftX = v.size[0] / (2 * nodes.length);
      var shiftY = v.size[1] / (2 * nodes.length);

      n[v.__x] = 0 + v.offset[0] + shiftX * i;
      n[v.__y] = 0 + v.offset[1] + shiftY * i * 2;

      n[v.__width] = v.size[0] - shiftX * i * 2;
      n[v.__height] = v.size[1] - shiftY * i * 2;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + shiftY;

    } else if(v.orient == "top") {

      var shiftX = v.size[0] / (2 * nodes.length);
      var shiftY = v.size[1] / (2 * nodes.length);

      n[v.__x] = 0 + v.offset[0] + shiftX * i;
      n[v.__y] = 0 + v.offset[1];

      n[v.__width] = v.size[0] - shiftX * i * 2;
      n[v.__height] = v.size[1] - shiftY * i * 2;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + shiftY * i * 2 + shiftY;

    } else { // central default

      var shiftX = v.size[0] / (2 * nodes.length);
      var shiftY = v.size[1] / (2 * nodes.length);

      n[v.__x] = 0 + v.offset[0] + shiftX * i;
      n[v.__y] = 0 + v.offset[1] + shiftY * i;

      n[v.__width] = v.size[0] - shiftX * i * 2;
      n[v.__height] = v.size[1] - shiftY * i * 2;

      n[v.__cx] = n[v.__x] + n[v.__width] / 2;
      n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    }
  });

  return nodes;
}
