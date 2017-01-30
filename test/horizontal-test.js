var tape = require("tape"),
    gridding = require("../");

tape("horizontal layout should return 0s for Xs, and height/n for Ys", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("horizontal").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 5, 10, 15]);
  test.end();
});
