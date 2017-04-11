export default function(nodes, v) {

  if(!v.cols) {
    v.cols = Math.ceil(Math.sqrt(nodes.length));
  }

  if(!v.rows) {
    v.rows = Math.ceil(nodes.length / v.cols);
  }

  if(v.cellSize) {
    v.size[0] = v.cellSize[0] * v.cols;
    v.size[1] = v.cellSize[1] * v.rows;
  }

  // var _valueWidth = function() { return 1; }
  v.width.domain([0, nodes.length]).range([0, v.size[0] - 2 * v.padding]);

  // var _valueHeight = function() { return 1; }
  v.height.domain([0, 1]).range([0, v.size[1] - 2 * v.padding]);

  v.x.domain([0, v.cols]).range([0, v.size[0]]);
  v.y.domain([0, v.rows]).range([0, v.size[1]]);

  nodes.forEach(function(n, i) {

    var col = i % v.cols;
    var row = Math.floor(i / v.cols);

    n[v.__x] = v.x(col) + v.offset[0] + v.padding;
    n[v.__y] = v.y(row) + v.offset[1] + v.padding;

    // n[v.__width] = v.width(_valueWidth(n));
    // n[v.__height] = v.height(_valueHeight(n));

    n[v.__width] = v.size[0] / v.cols - 2 * v.padding;
    n[v.__height] = v.size[1] / v.rows - 2 * v.padding;

    if(v.orient == "up") {
      n[v.__y] = v.size[1] - n[v.__y] - n[v.__height];
    } else if(v.orient == "down") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if(v.orient == "left") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if(v.orient == "right") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else { // default up
      n[v.__y] = v.size[1] - n[v.__y] - n[v.__height];
    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    n.tx = n[v.__x] + n[v.__width] / 2;
    n.ty = v.padding / 2;

  });

  return nodes;
}
