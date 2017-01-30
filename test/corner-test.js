var tape = require("tape"),
    gridding = require("../");

tape("corner layout should return full dimension when alone", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("corner").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);

  test.end();
});


tape("corner layout should return split the canvas in two identical parts", function(test) {

  var nodes = ["A", "B"];

  var grid = gridding.gridding().mode("corner").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);

  test.deepEqual(grid(nodes)[1]["x"], 0);
  test.deepEqual(grid(nodes)[1]["y"], 0);
  test.deepEqual(grid(nodes)[1]["width"], 5);
  test.deepEqual(grid(nodes)[1]["height"], 10);

  test.end();
});
