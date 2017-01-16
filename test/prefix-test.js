var tape = require("tape"),
    gridding = require("../");

tape(".prefix() should return the default var prefix value", function(test) {
  var grid = gridding.gridding();
  test.equal(grid.prefix(), "");
  test.end();
});

tape(".prefix('_') has changed and should return the right prefix value", function(test) {
  var grid = gridding.gridding().prefix("_");
  test.equal(grid.prefix(), "_");
  test.end();
});

tape(".prefix('_') has changed and should return the right prefix value", function(test) {
  var grid = gridding.gridding().prefix("__").mode("grid");
  test.equal(typeof grid([1, 2, 3])[0]["x"], "undefined");
  test.equal(typeof grid([1, 2, 3])[0]["__x"], "number");
  test.end();
});
