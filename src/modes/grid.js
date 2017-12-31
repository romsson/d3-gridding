export default function(nodes, v) {

  if(v.sort) {
    nodes = nodes.sort(v.sort);
  }

  var _cols;

  if(!v.cols) {
    _cols = Math.ceil(Math.sqrt(nodes.length));
  } else {
    _cols = v.cols;
  }

  var _rows;

  if(!v.rows) {
    _rows = Math.ceil(nodes.length / _cols);
  } else {
    _rows = v.rows;
  }

  if(v.cellSize) {
    v.size[0] = v.cellSize[0] * _cols;
    v.size[1] = v.cellSize[1] * _rows;
  }

  v.width.domain([0, nodes.length]).range([v.margin, v.size[0] - 2 * v.padding - 2 * v.margin]);
  v.height.domain([0, 1]).range([0, v.size[1] - 2 * v.padding - 2 * v.margin]);

  v.x.domain([0, _cols]).range([v.margin, v.size[0] - v.margin]);
  v.y.domain([0, _rows]).range([v.margin, v.size[1] - v.margin]);

  nodes.forEach(function(n, i) {

    var col = i % _cols;
    var row = Math.floor(i / _cols);

    n[v.__x] = v.x(col) + v.offset[0] + v.padding;
    n[v.__y] = v.y(row) + v.offset[1] + v.padding;

    n[v.__width] = (v.size[0] - 2 * v.margin) / _cols - 2 * v.padding ;
    n[v.__height] = (v.size[1] - 2 * v.margin) / _rows - 2 * v.padding;

    if(v.orient == "up") {
      n[v.__y] = v.size[1] - n[v.__y] - n[v.__height];
    } else if(v.orient == "down") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if(v.orient == "left") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if(v.orient == "right") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else { // default down
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    }

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

    n.tx = n[v.__x] + n[v.__width] / 2;
    n.ty = v.padding / 2;
  });

  return nodes;
}
