export default function(nodes, v) {

  if(!v.shiftX) {
    v.shiftX = 1/2;
  }

  if(!v.shiftY) {
    v.shiftY = 1/2;
  }

  v.cols = Math.ceil(Math.sqrt(nodes.length));
  v.rows = Math.ceil(nodes.length / v.cols);

  v.x.domain([0, v.cols]).range([0, v.size[0] - v.size[0] / v.cols]);
  v.y.domain([0, v.rows]).range([0, v.size[1] - v.size[1] / v.rows]);

  nodes.forEach(function(n, i) {

    var col = i % v.cols;
    var row = Math.floor(i / v.cols);

    n[v.__x] = v.x(col) + v.offset[0] + v.padding;
    n[v.__y] = v.y(row) + v.offset[1] + v.padding;

    n[v.__width] = v.x.range()[1] / v.cols - 2 * v.padding;
    n[v.__height] = v.y.range()[1] / v.rows - 2 * v.padding;

    if(v.orient === "left") {
      if(row % 2 === 1) {
        n[v.__x] += n[v.__width] * v.shiftX;
      }
    } else if(v.orient === "up") {
      if(col % 2 === 1) {
        n[v.__y] += n[v.__height] * v.shiftY;
      }
    } else if(v.orient === "down") {
      if(col % 2 === 0) {
        n[v.__y] += n[v.__height] * v.shiftY;
      }
    } else if(v.orient === "right") {
      if(row % 2 === 0) {
        n[v.__x] += n[v.__width] * v.shiftX;
      }
    } else if(v.orient === "none") {
      n[v.__x] += 0;
      n[v.__y] += 0;
    } else { // default right
      if(row % 2 === 0) {
        n[v.__x] += n[v.__width] * v.shiftX;
      }
    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
