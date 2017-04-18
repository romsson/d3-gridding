var tape = require("tape"),
    gridding = require("../");

tape("rotation layout with 1 element should central element", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("rotation").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 2.5);
  test.deepEqual(grid(nodes)[0]["y"], 5);
  test.deepEqual(grid(nodes)[0]["width"], 5);
  test.deepEqual(grid(nodes)[0]["height"], 10);

  test.end();
});
