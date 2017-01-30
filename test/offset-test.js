var tape = require("tape"),
    gridding = require("../");

tape(".offset() should return the default offset [0, 0]", function(test) {
  var grid = gridding.gridding();
  test.deepEqual(grid.offset(), [0, 0]);
  test.end();
});

tape(".offset([10, 20]) has changed and should return the right offset [10, 20]", function(test) {
  var grid = gridding.gridding().offset([10, 20]);
  test.deepEqual(grid.offset(), [10, 20]);
  grid.offset([0, 0]);
  test.deepEqual(grid.offset(), [0, 0]);
  test.end();
});
