var tape = require("tape"),
    gridding = require("../");

tape("vertical layout should return width/n for Xs, and 0s for Ys", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("vertical").size([20, 10]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 5, 10, 15]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 0, 0, 0]);
  test.end();
});


tape("vertical layout works with margins", function(test) {

  var nodes = [{w:1}, {w:2}, {w:3}];

  var grid = gridding.gridding()
    .valueWidth(d => d.w)
    .mode("vertical")
    .size([18, 10]).margin(1);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [1, 5, 11]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [1, 1, 1]);
  test.deepEqual(nodes.map(function(d) { return d.height; }), [8, 8, 8]);
  test.deepEqual(nodes.map(function(d) { return d.width; }), [2, 4, 6]);
  test.end();
});
