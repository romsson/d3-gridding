function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) {
    for (j = -1; ++j < m;) {
      c.push({x: a[i], i: i, y: b[j], j: j, value: a[i] + "x" + b[j]});
    }
  }
  return c;
}

// data: data to be gridded => array
// [{key: 0,
//   values: [{key: ...}, {key: ...}]
// }]
// level: current depth
// id: unique id for elements

// TODO
// [X] Fix offset bug ssue
// [ ] Use a unique ID for leaves -> There should be all visible anyway
// [ ] Show label or not
// [ ] Which variable for label mapping
// [ ] Position: center (default), top, left, right, bottom
function draw(el, data, params, level, id, show_cross) {

  if(typeof show_cross === "undefined") {
    show_cross = false;
  }

  // Special id for keavers
  if(typeof params[level + 1] !== "undefined") {
    // ??
  }

  var grid = d3.gridding()
      .mode(params[level].mode)
      .value(function(d) { return d.values; });

  // In case non-generic params have been defined
  if(typeof params[level].size !== "undefined") {
    grid.size(params[level].size(data));
  }

  if(typeof params[level].offset !== "undefined") {
    grid.offset(params[level].offset(data));
  }

  if(typeof params[level].padding !== "undefined") {
    grid.padding(params[level].padding);
  }

  if(typeof params[level].mode === "function") {
    grid.mode(params[level].mode(data)); // TOFIX, DATA should contain all data attributes
  } else {
    grid.mode(params[level].mode);
  }

  if(typeof params[level].valueX !== "undefined") {
    grid.valueX(params[level].valueX);
  }

  if(typeof params[level].valueY !== "undefined") {
    grid.valueY(params[level].valueY);
  }

  if(typeof params[level].valueWidth !== "undefined") {
    grid.valueWidth(params[level].valueWidth);
  }

  if(typeof params[level].valueHeight !== "undefined") {

   // if(typeof params[level].valueHeight === "function") {
   //   grid.valueHeight(params[level].valueHeight(data));
   // } else {
    grid.valueHeight(params[level].valueHeight);
  //  }

  }

  if(typeof params[level].orient !== "undefined") {
    grid.orient(params[level].orient);
  }

  if(typeof params[level].cellSize !== "undefined") {
    grid.cellSize(params[level].cellSize);
    console.log("cellSize", grid.cellSize())
  }

  if(typeof params[level].valueY === "function") {
    grid.valueY(params[level].valueY(data));
  } else {
    grid.valueY(params[level].valueY);
  }

  var gridData = grid(data);

  var squares = el.selectAll(".square" + id)
      .data(gridData, function(d, i) { return i; });

  squares.enter().append("rect")
      .attr("class", "square" + id)
      .attr("data-level", level)
      .attr("width", function(d, i) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  squares
      .transition()
      .attr("width", function(d, i) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  squares.exit().remove();

  if(show_cross) {

    var crossL = el.selectAll(".crossL" + id)
        .data(gridData, function(d, i) { return i; });

    var crossLEnter = crossL.enter();

    crossLEnter.append("line")
        .attr("class", "cross crossL crossL" + id)
        .attr("x1", function(d, i) { return d.x; })
        .attr("x2", function(d, i) { return d.x + d.width; })
        .attr("y1", function(d, i) { return d.y; })
        .attr("y2", function(d, i) { return d.y + d.height; });

    var crossR = el.selectAll(".crossR" + id)
        .data(gridData, function(d, i) { return i; });

    var crossREnter = crossR.enter();

    crossREnter.append("line")
        .attr("class", "cross crossR crossR" + id)
        .attr("x1", function(d, i) { return d.x + d.width; })
        .attr("x2", function(d, i) { return d.x; })
        .attr("y1", function(d, i) { return d.y; })
        .attr("y2", function(d, i) { return d.y + d.height; });

  }

  var labels = el.selectAll(".index" + id)
      .data(gridData, function(d, i) { return i; });

  var labelsEnter = labels.enter();

  labelsEnter.append("text")
      .attr("class", "index index" + id)
      .style('text-anchor', 'middle')
      .attr('stroke','#FFF')
      .attr('stroke-width',8)
      .attr('stroke-linejoin','round')
      .style('dominant-baseline', 'central')
      .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
      .text(function(d, i) { return d.key || "X"; });

  labelsEnter.append('text')
      .attr("class", "index index" + id)
      .style('text-anchor', 'middle')
      .attr('fill','#000')
      .style('dominant-baseline', 'central')
      .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
      .text(function(d, i) { return d.key || "X"; });


  labels
      .transition()
      .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
      .text(function(d, i) { return d.key || "X"; });

  labels.exit().remove();

  if(typeof params[level + 1] !== "undefined") {

    gridData.forEach(function(d, i) {

      if(typeof d.values !== "undefined") {

        draw(el, d, params, level + 1, id + "_" + (level + 1) + "_" + i, show_cross);

      } else {
        // console.log("<<<<<<<< done no more values")
      }

    });

  } else {

    // console.log(">>>>> level ", level, " does not exist");

  }

  return grid;
}


function generate_nesting(dimensions, str_data) {

  var res = "d3.nest()";

  dimensions.forEach(function(d) {

    res += ".key(function(d) { return d['" + d + "']; })";

  })

  res += ".entries(" + str_data + ")";

  var r = eval(res);

  // var data = eval(str_data);
  // console.log("RRR",r, data)

  return r;

}

function browse_nest(nested, dimensions, level) {

  if(typeof level === "undefined") {
    level = 0;
  }

  nested.forEach(function(d) {

    if(typeof d.values === "undefined") {
//      d.parentId = parent;
      return;
    } else {

      console.log("process", dimensions[level]);

      var dim = dimensions[level];

      d["__agg"] = dim.fn(d.values, dim.accessor);

      browse_nest(d.values, dimensions, level + 1);

    }

  });

  console.log(nested)

}

function generate_nesting_agg(dimensions, str_data) {

// generate nesting tree
// eval nesting tree
// browse each node
// apply dimension agg fn to each node..

  var res = "d3.nest()";

  dimensions.forEach(function(d) {

    res += ".key(function(d) { return d['" + d.groupBy + "']; })";

    if(typeof d.sortBy !== "undefined") {
      res += ".sortKeys(function(a,b) { console.log(a,b); return b - a; })";
    }

  })

  res += ".entries(" + str_data + ")";

  console.log("GENERA", res)

  r = eval(res);

  browse_nest(r, dimensions);

  // var data = eval(str_data);
  // console.log("RRR",r, data)

  return r;
}


// https://gist.github.com/Lepozepo/3275d686bc56e4fb5d11d27ef330a8ed

var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}

(function () {
  JSONfn.stringify = function(obj) {
    return JSON.stringify(obj,function(key, value){
            return (typeof value === 'function' ) ? value.toString() : value;
        });
  }

  JSONfn.parse = function(str) {
    return JSON.parse(str,function(key, value){
        if(typeof value != 'string') return value;
        return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
    });
  }
}());

function create_modes_matrix_utils(root_el, width, height, callback) {


}

function create_modes_matrix(root_el, width, height, callback) {

  var gridding = d3.gridding()
    .size([width, height])

  var svgSquares = root_el.append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g");

  function render(el, griddingData, id) {

    var squares = el.selectAll(".square" + "_" + id)
      .data(griddingData, function(d) { return d.index; });

    squares.enter().insert("rect", ":first-child")
      .attr("class", "square" + "_" + id)
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill", function() {
        if(id === "all") {
          return "none";
        } else {
          return "none";
        }
      })
      .style("fill-opacity", .8);

    squares.exit().remove();

    squares.transition().delay(function(d, i) { return i * 10; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    var connection = el.selectAll(".connection" + "_" + id)
      .data(griddingData, function(d) { return d.index; });

    connection.enter().insert("line")


    // Only show titles for modes cells
    if(id === "all") {

    var titles = el.selectAll(".title")
      .data(griddingData, function(d) { return d.index; });

      titles.enter().append("rect")
        .attr("x", function(d) { return d.cx - 25; })
        .attr("y", function(d) { return d.cy - 10; })
        .attr("width", function(d) { return 50; })
        .attr("height", function(d) { return 12; })
        .style("stroke", "none")
        .style("fill", "white")
        .on("click", callback);

      titles.enter().append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
        .text(function(d) { return d.value; })
        .on("click", callback);

      titles.exit().remove();

      titles.transition().delay(function(d, i) { return i * 10; })
        .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; });

    }
  }

  function update(mode, n, sort) {

    sort = sort || d3.ascending;

    var data = gridding.modes().map(function(d, i) {
      return {"value": d, "index": i};
    });

    // Global layout
    gridding
      .mode(mode)
      .sort(sort)
      .padding(0);

    var griddingData = gridding(data);

    render(svgSquares, griddingData, "all")

    var griddings = griddingData.map(function(d, i) {

      // Local layout
      var grid = d3.gridding()
        .size([d.width, d.height])
        .offset([d.x, d.y])
  //      .value(function(d) { return d.index; })
        .mode(d.value)
        .padding(0);

      render(svgSquares, grid(d3.range(10).map(function() { return {}; })), d.value)
      return d;
    });

  }

  update("grid", gridding.modes().length);

}

function draw_order() {

  var line = d3.line()
    .x(function(d) { return d.cx; })
    .y(function(d) { return d.cy; });

  svgSquares.selectAll("path")
      .data([gridding(data)])
    .enter().append("path")
      .attr("d", line);

}

function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) {
    for (j = -1; ++j < m;) {
      c.push({x: a[i], i: i, y: b[j], j: j, value: a[i] + "x" + b[j], var_x: a[i], var_y: b[j]});
    }
  }
  return c;
}

// Key press interactions




