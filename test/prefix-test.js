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

  var grid2 = gridding.gridding().prefix("").mode("grid");
  test.equal(typeof grid2([1, 2, 3])[0]["x"], "number");
  test.equal(typeof grid2([1, 2, 3])[0]["__x"], "undefined");

  var grid3 = gridding.gridding().prefix("_").mode("grid");
  test.equal(typeof grid3([1, 2, 3])[0]["x"], "undefined");
  test.equal(typeof grid3([1, 2, 3])[0]["__x"], "undefined");
  test.equal(typeof grid3([1, 2, 3])[0]["_x"], "number");

  test.end();
});

["horizontal", "vertical", "central", "grid", "coordinate", "radial", "treemap", "pack", "stack", "diagonal", "cascade", "corner", "pyramid", "brick"].map(function(mode) {

  tape(".prefix() should work with mode " + mode, function(test) {
    var grid = gridding.gridding().prefix("__");

    grid.mode(mode);
    test.equal(typeof grid([1, 2, 3])[0]["__x"], "number");

     test.end();
  });

})

