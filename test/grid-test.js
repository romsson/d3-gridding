var tape = require("tape"),
    gridding = require("../");

tape("grid layout if single should return full dimension", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("grid").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);

  test.end();
});

tape("grid layout with 2 elements", function(test) {

  var nodes = [{}, {}];

  var grid = gridding.gridding().mode("vertical").size([20, 10]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 10]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0]);
  test.end();
});

tape("grid layout with 3 elements", function(test) {

  var nodes = [{}, {}, {}];

  var grid = gridding.gridding().mode("vertical").size([30, 60]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 10, 20]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0]);
  test.end();
});
