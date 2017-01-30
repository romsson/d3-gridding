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
