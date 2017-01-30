var tape = require("tape"),
    gridding = require("../");

tape("identity layout returns the very same grid positions", function(test) {

  var nodes = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 1, y: 0}
  ];

  test.deepEqual(nodes, gridding.gridding()(nodes));
  test.end();
});
