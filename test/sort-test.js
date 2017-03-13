var tape = require("tape"),
    gridding = require("../");

tape("not sorting by default", function(test) {

  var nodes = [
    {x: 0, y: 0, value: 3},
    {x: 0, y: 1, value: 2},
    {x: 1, y: 1, value: 1},
    {x: 1, y: 0, value: 0}
  ];

  var grid = gridding.gridding().mode("vertical").size([20, 10]);

  grid(nodes);

  test.equal(nodes[0].value, 3);

  test.end();
});

tape("sort now by descending value", function(test) {

  var nodes = [
    {x: 0, y: 0, index: 3},
    {x: 0, y: 1, index: 2},
    {x: 1, y: 1, index: 1},
    {x: 1, y: 0, index: 0}
  ];

  var grid = gridding.gridding().mode("vertical").size([20, 10])
                      .sort(function(a, b) { return b - a; });

  grid(nodes);

  test.equal(nodes[0].index, 3);

  test.end();
});
