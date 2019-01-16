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

tape("data = should return an empty grid", function(test) {
  var data;
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 0);
  test.end();
});

tape("data = null should return an empty grid", function(test) {
  var data = null;
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 0);
  test.end();
});

tape("data = [] should return an empty grid", function(test) {
  var data = [];
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 0);
  test.end();
});

tape("data = {} should return an empty grid", function(test) {
  var data = {};
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 0);
  test.end();
});

tape("data = '' should return an empty grid", function(test) {
  var data = "";
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 0);
  test.end();
});

tape("data = 'A' should return a 1-element grid", function(test) {
  var data = "A";
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 1);
  test.end();
});

tape("data = ['A'] should return a 1-element grid", function(test) {
  var data = ["A"];
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 1);
  test.end();
});

tape("data = (array-like) should return a grid", function(test) {
  var data = {
    0: "Hello",
    1: "World",
    length: 2
  };
  var grid = gridding.gridding().size([10, 20]);
  test.equal(grid(data).length, 2);
  test.end();
});


