var tape = require("tape"),
    gridding = require("../");

tape("stack layout should return full dimension when alone", function(test) {

  var nodes = [{"id": "A", "coordX": 0}];

  var grid = gridding.gridding().mode("stack").size([10, 20])
    .valueX(function(d) { return d.coordX; })

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 0);

  test.end();
});

tape("stack layout offset", function(test) {

  var nodes = [{"id": "A", "coordX": 0}];

  var grid = gridding.gridding().mode("stack").size([10, 20]).offset([10, 10])
    .valueX(function(d) { return d.coordX; })

  test.deepEqual(grid(nodes)[0]["x"], 10);
  test.deepEqual(grid(nodes)[0]["y"], 10);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 0);

  test.end();
});
