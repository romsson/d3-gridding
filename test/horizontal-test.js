var tape = require("tape"),
    gridding = require("../");

tape("horizontal layout should return 0s for Xs, and height/n for Ys", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("horizontal").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [0, 0, 0, 0]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0, 5, 10, 15]);
  test.end();
});

tape("horizontal all elements should by default have identical height", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("horizontal").size([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.width === 10; }), [true, true, true, true]);
  test.deepEqual(nodes.map(function(d) { return d.height === 20 / nodes.length; }), [true, true, true, true]);
  test.end();
});


tape("horizontal padding", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("horizontal").size([100, 200]).padding(10);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [10, 10, 10, 10]);
//  test.deepEqual(nodes.map(function(d) { return d.y; }), [0 + 20, 50 + 20, 100 + 20, 150 + 20]);

//  test.deepEqual(nodes.map(function(d) { return d.width === 100; }), [true, true, true, true]);
//  test.deepEqual(nodes.map(function(d) { return d.height === 200 / nodes.length; }), [true, true, true, true]);
  test.end();
});


tape("horizontal offset", function(test) {

  var nodes = [{}, {}, {}, {}];

  var grid = gridding.gridding().mode("horizontal").size([100, 200]).offset([10, 20]);
  grid(nodes);

  test.deepEqual(nodes.map(function(d) { return d.x; }), [10, 10, 10, 10]);
  test.deepEqual(nodes.map(function(d) { return d.y; }), [0 + 20, 50 + 20, 100 + 20, 150 + 20]);

  test.deepEqual(nodes.map(function(d) { return d.width === 100; }), [true, true, true, true]);
  test.deepEqual(nodes.map(function(d) { return d.height === 200 / nodes.length; }), [true, true, true, true]);
  test.end();
});
