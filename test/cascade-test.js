var tape = require("tape"),
    gridding = require("../");

tape("cascade layout should return one central grid", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("cascade").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 5);
  test.deepEqual(grid(nodes)[0]["height"], 10);
  test.end();
});
