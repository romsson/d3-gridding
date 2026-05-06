import { margin } from "../utils/margin.js";

export default function (nodes, v) {

  if (v.sort) {
    nodes = nodes.sort(v.sort);
  }

  let _cols;

  if (!v.cols) {
    _cols = Math.ceil(Math.sqrt(nodes.length));
  } else {
    _cols = v.cols;
  }

  let _rows;

  if (!v.rows) {
    _rows = Math.ceil(nodes.length / _cols);
  } else {
    _rows = v.rows;
  }

  let effectiveWidth = v.size[0];
  let effectiveHeight = v.size[1];

  if (v.cellSize) {
    effectiveWidth = v.cellSize[0] * _cols;
    effectiveHeight = v.cellSize[1] * _rows;
  }

  v.width.domain([0, nodes.length]).range([margin(v, "left"), effectiveWidth - v.padding - margin(v, "horizontal")]);
  v.height.domain([0, 1]).range([0, effectiveHeight - v.padding - margin(v, "vertical")]);

  v.x.domain([0, _cols]).range([margin(v, "left"), effectiveWidth - margin(v, "right")]);
  v.y.domain([0, _rows]).range([margin(v, "top"), effectiveHeight - margin(v, "bottom")]);

  nodes.forEach((n, i) => {

    const col = i % _cols;
    const row = Math.floor(i / _cols);

    n[v.__x] = v.x(col) + v.offset[0] + v.padding;
    n[v.__y] = v.y(row) + v.offset[1] + v.padding;

    n[v.__width] = (effectiveWidth - margin(v, "horizontal")) / _cols - 2 * v.padding;
    n[v.__height] = (effectiveHeight - margin(v, "vertical")) / _rows - 2 * v.padding;

    if (v.orient == "up") {
      n[v.__y] = effectiveHeight - n[v.__y] - n[v.__height];
    } else if (v.orient == "down") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if (v.orient == "left") {
      n[v.__y] = v.y(row) + v.offset[1] + v.padding;
    } else if (v.orient == "right") {
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
