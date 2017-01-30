var tape = require("tape"),
    gridding = require("../");

tape("diagonal layout should return one central grid", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("diagonal").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);
  test.end();
});
