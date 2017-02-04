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

tape("diagonal with 2 elements splits the view in 2 equal parts", function(test) {

  var nodes = ["A", "B"];

  var grid = gridding.gridding().mode("diagonal").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10 / 2);
  test.deepEqual(grid(nodes)[0]["height"], 20 / 2);

  test.deepEqual(grid(nodes)[1]["x"], 10 / 2);
  test.deepEqual(grid(nodes)[1]["y"], 20 / 2);
  test.deepEqual(grid(nodes)[1]["width"], 10 / 2);
  test.deepEqual(grid(nodes)[1]["height"], 20 / 2);

  test.end();
});

tape("diagonal offset", function(test) {

  var nodes = ["A", "B"];

  var grid = gridding.gridding().mode("diagonal").size([10, 20]).offset([15, 25]);

  test.deepEqual(grid(nodes)[0]["x"], 15);
  test.deepEqual(grid(nodes)[0]["y"], 25);
  test.deepEqual(grid(nodes)[0]["width"], 10 / 2);
  test.deepEqual(grid(nodes)[0]["height"], 20 / 2);

  test.deepEqual(grid(nodes)[1]["x"], 15 +10 / 2);
  test.deepEqual(grid(nodes)[1]["y"], 25 + 20 / 2);
  test.deepEqual(grid(nodes)[1]["width"], 10 / 2);
  test.deepEqual(grid(nodes)[1]["height"], 20 / 2);

  test.end();
});
