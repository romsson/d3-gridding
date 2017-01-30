var tape = require("tape"),
    gridding = require("../");

tape("central layout should return identical grids", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("central").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.width; }), [10, 10, 10, 10]);
  test.deepEqual(nodes.map(function(d) { return d.height; }), [20, 20, 20, 20]);
  test.end();
});
