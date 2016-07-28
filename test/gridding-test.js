var tape = require("tape"),
    gridding = require("../");

tape("gridding() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  test.equal(gridding.gridding(), 42);
  test.end();
});
