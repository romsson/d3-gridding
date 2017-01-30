var tape = require("tape"),
    gridding = require("../");

tape(".padding() should return the default offset 0", function(test) {
  var grid = gridding.gridding();
  test.deepEqual(grid.padding(), 0);
  test.end();
});

tape(".padding(0) has changed and should return the right padding 0", function(test) {
  var grid = gridding.gridding().padding(1);
  test.deepEqual(grid.padding(), 1);
  grid.offset(0);
  test.deepEqual(grid.offset(), 0);
  test.end();
});

tape(".padding(1) with central layout", function(test) {

  var grid = gridding.gridding().size([10, 20]).padding(1).mode("central");
  var nodes = [1, 2, 3, 4];
  grid(nodes);

  test.deepEqual(grid(nodes).map(function(d) { return d.x; }), [1, 1, 1, 1]);
  test.deepEqual(grid(nodes).map(function(d) { return d.y; }), [1, 1, 1, 1]);
  test.deepEqual(grid(nodes).map(function(d) { return d.width; }), [10 - 2*1, 10 - 2*1, 10 - 2*1, 10 - 2*1]);
  test.deepEqual(grid(nodes).map(function(d) { return d.height; }), [20 - 2*1, 20 - 2*1, 20 - 2*1, 20 - 2*1]);
  test.end();

});
