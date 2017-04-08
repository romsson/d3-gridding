var tape = require("tape"),
    gridding = require("../");

tape("coordinate layout should return full dimension when alone", function(test) {

  var nodes = [{"id": "A", "coordX": 0, "coordY": 0}];

  var grid = gridding.gridding().mode("coordinate").size([10, 20])
    .valueX("coordX")
    .valueY("coordY")

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 0);
  test.deepEqual(grid(nodes)[0]["height"], 0);

  test.end();
});

tape("coordinate change cellSize", function(test) {

  var grid = gridding.gridding().mode("coordinate")
              .valueWidth("w")
              .valueHeight("h");

  var nodes = [{"id": "A", "coordX": 0, "w": 0, "h": 0}];

  test.deepEqual(grid(nodes)[0]["width"], 0);
  test.deepEqual(grid(nodes)[0]["height"], 0);

  test.end();
});
