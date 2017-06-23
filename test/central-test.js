var tape = require("tape"),
    gridding = require("../");

tape("cascade layout should return one central grid", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("central").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);
  test.end();
});


tape("central layout should return identical grids", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("central").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.width; }), [10, 10, 10, 10]);
  test.deepEqual(nodes.map(function(d) { return d.height; }), [20, 20, 20, 20]);
  test.deepEqual(nodes.map(function(d) { return d.cx; }), [10 / 2, 10 / 2, 10 / 2, 10 / 2]);
  test.deepEqual(nodes.map(function(d) { return d.cy; }), [20 / 2, 20 / 2, 20 / 2, 20 / 2]);

  test.end();
});

tape("central with padding", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("central").size([100, 200]).padding(10);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [10, 10, 10, 10]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [10, 10, 10, 10]);
  test.deepEqual(nodes.map(function(d) { return d.width; }), [100 - 10 * 2, 100 - 10 * 2, 100 - 10 * 2, 100 - 10 * 2]);
  test.deepEqual(nodes.map(function(d) { return d.height; }), [200 - 10 * 2, 200 - 10 * 2, 200 - 10 * 2, 200 - 10 * 2]);
  test.deepEqual(nodes.map(function(d) { return d.cx; }), [10 + (100 - 10 * 2) / 2, 10 + (100 - 10 * 2) / 2, 10 + (100 - 10 * 2) / 2, 10 + (100 - 10 * 2) / 2]);
  test.deepEqual(nodes.map(function(d) { return d.cy; }), [10 + (200  - 10 * 2) / 2, 10 + (200  - 10 * 2) / 2, 10 + (200  - 10 * 2) / 2, 10 + (200  - 10 * 2) / 2]);

  test.end();
});

tape("central with offset", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("central").size([100, 200]).offset([50, 60]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [50, 50, 50, 50]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [60, 60, 60, 60]);
  test.deepEqual(nodes.map(function(d) { return d.width; }), [100, 100, 100, 100]);
  test.deepEqual(nodes.map(function(d) { return d.height; }), [200, 200, 200, 200]);
  test.deepEqual(nodes.map(function(d) { return d.cx; }), [100, 100, 100, 100]);
  test.deepEqual(nodes.map(function(d) { return d.cy; }), [160, 160, 160, 160]);

  test.end();
});
