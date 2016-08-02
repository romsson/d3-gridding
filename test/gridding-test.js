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
  test.deepEqual(gridding.gridding().value()(1), 1);
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
