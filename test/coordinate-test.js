var tape = require("tape"),
    gridding = require("../");

tape("coordinate layout should return full dimension when alone", function(test) {

  var nodes = [{"id": "A", "coordX": 0}];

  var grid = gridding.gridding().mode("coordinate").size([10, 20])
    .valueX(function(d) { return d.coordX; })

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);

  test.end();
});
