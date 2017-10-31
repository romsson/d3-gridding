var tape = require("tape"),
    gridding = require("../");

tape("gridding().params is a function", function(test) {
  test.deepEqual(typeof gridding.gridding().params, "function");
  test.end();
});

tape("default params is an object", function(test) {
  test.deepEqual(typeof gridding.gridding().params(), "object");
  test.end();
});

tape("params sets the size and should return it", function(test) {
  var grid = gridding.gridding().params({"size": [200, 300]});
  test.deepEqual(grid.size(), [200, 300]);
  test.end();
});

tape("params sets the mode and should return it", function(test) {
  var grid = gridding.gridding().params({"mode": "grid", "orient": "up"});
  test.deepEqual(grid.mode(), "grid");
  test.deepEqual(grid.orient(), "up");
  test.end();
});

tape("params sets the mode and then mode is changed after chaining", function(test) {
  var grid = gridding.gridding().params({"mode": "grid", "orient": "up"}).mode("horizontal");
  test.deepEqual(grid.mode(), "horizontal");
  test.end();
});

tape("params sets offset as a function", function(test) {
  var grid = gridding.gridding().params({"offset": function(d) { return [d.x, d.y]; }});
  test.deepEqual(typeof grid.offset(), "function");
  test.end();
});

