var tape = require("tape"),
    gridding = require("../");

tape("radial layout for one single node has same width as canvas", function(test) {

  var nodes = "X";

  var grid = gridding.gridding().mode("radial").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);
  test.end();
});
