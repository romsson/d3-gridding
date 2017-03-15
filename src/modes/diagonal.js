export default function(nodes, v) {

  v.x.domain([0, nodes.length]).range([0, v.size[0]]);
  v.y.domain([0, nodes.length]).range([0, v.size[1]]);

  nodes.forEach(function(n, i) {

    if(v.orient == "up") {
      n[v.__x] = v.x(i) + v.offset[0] + v.padding;
      n[v.__y] = v.size[1] - (v.y(i) + v.offset[1]) - v.size[1] / nodes.length + v.padding;
    } else {
      n[v.__x] = v.x(i) + v.offset[0] + v.padding;
      n[v.__y] = v.y(i) + v.offset[1] + v.padding;
    }

    n[v.__width] = v.size[0] / nodes.length - 2 * v.padding;
    n[v.__height] = v.size[1] / nodes.length - 2 * v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
