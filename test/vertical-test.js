var tape = require("tape"),
    gridding = require("../");

tape("vertical layout should return width/n for Xs, and 0s for Ys", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("vertical").size([20, 10]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 5, 10, 15]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0, 0]);
  test.end();
});
