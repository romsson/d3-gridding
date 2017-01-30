var tape = require("tape"),
    gridding = require("../");

tape("radial layout for one single node (centered)", function(test) {

  var nodes = [{}];

  var grid = gridding.gridding().mode("radial").size([400, 300]);

  grid(nodes);

  test.end();
});
