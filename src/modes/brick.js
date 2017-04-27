export default function(nodes, v) {

  var shiftX = 1/2;
  var shiftY = 1/2;

  v.cols = Math.ceil(Math.sqrt(nodes.length));
  v.rows = Math.ceil(nodes.length / v.cols);

  v.x.domain([0, v.cols + shiftX]).range([0, v.size[0]]);
  v.y.domain([0, v.rows + shiftY]).range([0, v.size[1]]);

  nodes.forEach(function(n, i) {

    var col = i % v.cols;
    var row = Math.floor(i / v.cols);

    n[v.__x] = v.x(col) + v.offset[0] + v.padding;
    n[v.__y] = v.y(row) + v.offset[1] + v.padding;

    n[v.__width] = v.size[0] / (v.cols + shiftX) - 2 * v.padding;
    n[v.__height] = v.size[1] / (v.rows + shiftY) - 2 * v.padding;

    if(v.orient === "left") {
      if(row % 2 === 1) {
        n[v.__x] += n[v.__width] / 2;
      }
    } else { // default right
      if(row % 2 === 0) {
        n[v.__x] += n[v.__width] / 2;
      }
    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
