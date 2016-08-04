var tape = require("tape"),
    gridding = require("../");

tape("gridding() is a function", function(test) {
  test.equal(typeof gridding.gridding, 'function');
  test.end();
});

tape("default size", function(test) {
  test.deepEqual(gridding.gridding().size(), [1, 1]);
  test.end();
});

tape("changing size", function(test) {
  test.deepEqual(gridding.gridding().size([800, 600]).size(), [800, 600]);
  test.end();
});

tape(".value() returns same value by default", function(test) {
  test.equal(gridding.gridding().value()(1), 1);
  test.end();
});

tape(".value() custom value accessor should return the right value", function(test) {
  var accessor_value = function(d) { return d.index; };
  var nodes = [{index: 0, x: 0, y: 0}, {index: 1, x: 1, y: 0}];
  var grid = gridding.gridding().size([10, 20]).value(accessor_value);
  test.equal(grid.value()(nodes[1]), 1);
  test.end();
});

tape("identity layout returns the very same grid positions", function(test) {

  var nodes = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 1, y: 0}
  ];

  test.deepEqual(nodes, gridding.gridding()(nodes));
  test.end();
});

tape("horizontal layout should return 0s for Xs, and height/n for Ys", function(test) {

  var nodes = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 1, y: 0}
  ];

  var grid = gridding.gridding().mode("horizontal").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 5, 10, 15]);
  test.end();
});

tape("vertical layout should return width/n for Xs, and 0s for Ys", function(test) {

  var nodes = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 1, y: 0}
  ];

  var grid = gridding.gridding().mode("vertical").size([20, 10]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 5, 10, 15]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0, 0]);
  test.end();
});

tape("sort is ascending by default", function(test) {

  var nodes = [
    {x: 0, y: 0, index: 3},
    {x: 0, y: 1, index: 2},
    {x: 1, y: 1, index: 1},
    {x: 1, y: 0, index: 0}
  ];

  var grid = gridding.gridding().mode("vertical").size([20, 10])
                      .value(function(d) { return d.index; });

  grid(nodes);

  test.equal(nodes[0].index, 0);
  test.equal(grid.value()(nodes[0]), 0);

  test.end();
});

tape("sort now by descending value", function(test) {

  var nodes = [
    {x: 0, y: 0, index: 3},
    {x: 0, y: 1, index: 2},
    {x: 1, y: 1, index: 1},
    {x: 1, y: 0, index: 0}
  ];

  var grid = gridding.gridding().mode("vertical").size([20, 10])
                      .value(function(d) { return d.index; })
                      .sort(function(a, b) { return b - a; });

  grid(nodes);

  test.equal(nodes[0].index, 3);
  test.equal(grid.value()(nodes[0]), 3);

  test.end();
});

tape("radial layout for one single node (centered)", function(test) {

  var nodes = [{}];

  var grid = gridding.gridding().mode("radial").size([400, 300]);

  grid(nodes);

  test.equal(nodes[0].x, 200);
  test.equal(nodes[0].y, 225);
  test.equal(nodes[0].cx, 400);
  test.equal(nodes[0].cy, 375);
  test.equal(nodes[0].width, 400);
  test.equal(nodes[0].height, 300);

  test.end();
});
