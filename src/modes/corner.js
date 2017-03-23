export default function(nodes, v) {

  var shiftX = v.size[0] / (2 * nodes.length);
  var shiftY = v.size[1] / (2 * nodes.length);

  nodes.forEach(function(n, i) {

    n[v.__width] = v.size[0] - shiftX * i * 2;
    n[v.__height] = v.size[1] - shiftY * i * 2;

    if(v.orient === "top right") {

      n[v.__x] = v.size[0] - n.width + v.offset[0];
      n[v.__y] = 0 + v.offset[1];

    } else if(v.orient === "bottom right") {

      n[v.__x] = v.size[0] - n[v.__width] + v.offset[0];
      n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

    } else if(v.orient === "bottom left") {

      n[v.__x] = 0 + v.offset[0];
      n[v.__y] = v.size[1] - n[v.__height] + v.offset[1];

    } else if(v.orient === "top") {

      n[v.__x] = v.size[0] - n.width + v.offset[0];
      n[v.__y] = 0 + v.offset[1];

    } else {

      n[v.__x] = 0 + v.offset[0];
      n[v.__y] = 0 + v.offset[1];

    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

  });

  return nodes;
}
