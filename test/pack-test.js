var tape = require("tape"),
    gridding = require("../");

tape("pack layout should return full dimension when alone", function(test) {

  var nodes = [{"id": "A", "coordX": 0}];

  var grid = gridding.gridding().mode("pack").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 5);
  test.deepEqual(grid(nodes)[0]["y"], 10);
  test.deepEqual(grid(nodes)[0]["width"], 5);
  test.deepEqual(grid(nodes)[0]["height"], 5);

  test.end();
});

tape("pack layout offset", function(test) {

  var nodes = [{"id": "A", "coordX": 0}];

  var grid = gridding.gridding().mode("pack").size([10, 20]).offset([5, 10]);

  test.deepEqual(grid(nodes)[0]["x"], 10);
  test.deepEqual(grid(nodes)[0]["y"], 20);
  test.deepEqual(grid(nodes)[0]["width"], 5);
  test.deepEqual(grid(nodes)[0]["height"], 5);

  test.end();
});
