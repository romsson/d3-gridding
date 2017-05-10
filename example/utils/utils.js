function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) {
    for (j = -1; ++j < m;) {
      c.push({x: a[i], i: i, y: b[j], j: j, value: a[i] + "x" + b[j]});
    }
  }
  return c;
}

var duration_update = 500;
var duration_enter = 500;
var duration_exit = 500;
var delay_update = 500;
var delay_enter = duration_update+duration_exit;
var delay_exit = 0;

// TOFIX
var first_time = true;

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

  if(typeof params[level].margin !== "undefined") {
    grid.margin(params[level].margin);
  }

  if(typeof params[level].mode === "function") {
    grid.mode(params[level].mode(data)); // TOFIX, DATA should contain all data attributes
  } else {
    grid.mode(params[level].mode);
  }

  if(typeof params[level].valueX !== "undefined") {
    if(typeof params[level].valueX === "function") {
      grid.valueX(params[level].valueX(data));
    } else {
      grid.valueX(params[level].valueX);
    }
  }

  if(typeof params[level].valueY !== "undefined") {
    if(typeof params[level].valueY === "function") {
      grid.valueY(params[level].valueY(data));
    } else {
      grid.valueY(params[level].valueY);
    }
  }

  if(typeof params[level].valueWidth !== "undefined") {
    if(typeof params[level].valueWidth === "function") {
      grid.valueWidth(params[level].valueWidth(data));
    } else {
      grid.valueWidth(params[level].valueWidth);
    }
  }

  if(typeof params[level].valueHeight !== "undefined") {
    if(typeof params[level].valueHeight === "function") {
      grid.valueHeight(params[level].valueHeight(data));
    } else {
      grid.valueHeight(params[level].valueHeight);
    }
  }

  if(typeof params[level].orient === "function") {
    grid.orient(params[level].orient(data));
  } else if(typeof params[level].orient !== "undefined") {
    grid.orient(params[level].orient);
  }

  if(typeof params[level].cellSize !== "undefined") {
    grid.cellSize(params[level].cellSize);
  }

  if(typeof params[level].shiftX !== "undefined") {
    grid.shiftX(params[level].shiftX);
  }

  if(typeof params[level].shiftY !== "undefined") {
    grid.shiftY(params[level].shiftY);
  }

  if(typeof params[level].rows !== "undefined") {
    grid.rows(params[level].rows);
  }

  if(typeof params[level].cols !== "undefined") {
    grid.cols(params[level].cols);
  }

  if(typeof params[level].sort !== "undefined") {
    grid.sort(params[level].sort);
  }

  var gridData = grid(data);

  var squares = el.selectAll(".square" + id)
      .data(gridData, function(d, i) { return i; });

  var squaresEnter = squares.enter().append("rect")
      .attr("class", "square" + id)
      .attr("data-level", level)
      .attr("width", function(d, i) {
        if(isNaN(d.width) || d.width < 0) {
          console.log("rect width < 0, set to 0");
          return 0;
        }
        return d.width;
      })
      .attr("height", function(d) {
        if(isNaN(d.height) || d.height < 0) {
          console.log("rect width < 0, set to 0");
          return 0;
        }
        return d.height;
      })
      .attr("transform", function(d) {
        if(isNaN(d.x) || isNaN(d.y)) {
          console.log("rect translate is NaN, set to 0");
          return "translate(" + 0 + "," + 0 + ")";
        }
        return "translate(" + d.x + "," + d.y + ")";
      })
      .style("opacity", 0);


  squaresEnter
    .transition().duration(first_time === true ? 0: duration_enter).delay(first_time === true ? 0: delay_enter)
    .style("opacity", 1)

  squares
      .transition().duration(first_time === true ? 0: duration_update).delay(first_time === true ? 0: delay_update)
      .attr("width", function(d, i) {
        if(isNaN(d.width) || d.width < 0) {
          console.log("rect width < 0, set to 0");
          return 0;
        }
        return d.width;
      })
      .attr("height", function(d) {
        if(isNaN(d.height) || d.height < 0) {
          console.log("rect width < 0, set to 0");
          return 0;
        }
        return d.height;
      })
      .attr("transform", function(d) {
        if(isNaN(d.x) || isNaN(d.y)) {
          console.log("rect translate is NaN, set to 0");
          return "translate(" + 0 + "," + 0 + ")";
        }
        return "translate(" + d.x + "," + d.y + ")";
      });

  squares.exit()
    .transition().duration(first_time === true ? 0: duration_exit).delay(first_time === true ? 0: delay_exit)
    .style("opacity", 0)
    .remove();


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
//      .attr('stroke-linejoin','round')
      .style('dominant-baseline', 'central')
      .attr("transform", function(d) {
        if(isNaN(d.cx) || isNaN(d.cy)) {
          return "translate(" + 0 + "," + 0 + ")";
        }
        return "translate(" + d.cx + "," + d.cy + ")";
      })
      .text(function(d, i) { return d.key || "X"; })
      .style("opacity", 0)
//      .style("opacity", 1)

 
  
  labelsEnter.append('text')
      .attr("class", "index index" + id)
      .style('text-anchor', 'middle')
//      .attr('fill','#000')
      .attr('fill','#fff')
      .style('dominant-baseline', 'central')
      .attr("transform", function(d) {
        if(isNaN(d.cx) || isNaN(d.cy)) {
          return "translate(" + 0 + "," + 0 + ")";
        }
        return "translate(" + d.cx + "," + d.cy + ")";
      })
      .text(function(d, i) { return d.key || "X"; });


  labels
      .transition().duration(first_time === true ? 0: duration_update).delay(first_time === true ? 0: delay_update)
      .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
      .text(function(d, i) { return d.key || "X"; });

  labels.exit()
    .transition().duration(first_time === true ? 0: duration_exit).delay(first_time === true ? 0: delay_exit)
    .remove();

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

  var __this__data = null;

  if(typeof str_data !== "string") {

    __this__data = str_data;
    str_data = "__this__data";

  }

  var res = "d3.nest()";

  dimensions.forEach(function(d) {

    res += ".key(function(d) { return d['" + d + "']; })";

  })

  res += ".entries(" + str_data + ")";

  var r = eval(res);

  // var data = eval(str_data);
  console.log("NESTING", res)

  return r;

}

function browse_nest(nested, dimensions, level, parent_key) {

  if(typeof level === "undefined") {
    level = 0;
  }

 // if(level > 0 && nested.key === "undefined") {
 //   return ;
 // }

  nested.forEach(function(d) {



    if(typeof d.values === "undefined") {
//      d.parentId = parent;
      return;
    } else {

      console.log("process", dimensions[level], "level", level);

      var dim = dimensions[level];

      d["__agg"] = dim.fn(d.values, dim.accessor);
      d["__parent_key"] = parent_key;

      if(typeof args !== "undefined") {

        args.forEach(function(a) {

          if(level === 0) {
            d[a] = d.values[0].values[0][a]
          } else {
            d[a] = d.values[0][a]
          }

        })

      }

      browse_nest(d.values, dimensions, level + 1, d.key);

      if(level > 0 && typeof d.values[0].__x !== "undefined") {

          d["__x"] = d.values[0].__x
          d["__y"] = d.values[0].__y
          d["__width"] = d.values[0].__width
          d["__height"] = d.values[0].__height
      }

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

  var __this__data = null;

  if(typeof str_data !== "string") {

    __this__data = str_data;
    str_data = "__this__data";

  }


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

//    squares.enter().insert("rect", ":first-child")
    squares.enter().insert("rect")
      .attr("class", "square" + "_" + id)
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
//      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill", function() {
        if(id === "all") {
          return "none";
        } else {
          return "none";
        }
      })
      .style("fill-opacity", .9)
      .style("stroke", "white");

    squares.exit().remove();

    squares.transition().delay(function(d, i) { return i * 2; })
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
//        .attr("x", function(d) { return d.cx - 25; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + d.height - 10; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return 10; })
        .style("stroke", "none")
        .style("fill", "white")
        .on("click", callback);

      titles.enter().append("text")
        .attr("class", "title")
        .attr("text-anchor", "left")
        .attr("transform", function(d) { return "translate(" + (d.x+5) + "," + (d.y+d.height-1) + ")"; })
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

  update("horizontal", gridding.modes().length);

}


function create_modes_matrix_flavours(root_el, width, height, flavour, callback) {

  var gridding = d3.gridding()
    .size([width, height])

  var svgSquares = root_el.append("svg")
      .attr("width", width)
      .attr("height", height)
       .on("click", callback)
    .append("g");

  function render(el, griddingData, id) {

    var squares = el.selectAll(".square" + "_" + id)
      .data(griddingData, function(d) { return d.index; });

//    squares.enter().insert("rect", ":first-child")
    squares.enter().insert("rect")
      .attr("class", "square" + "_" + id)
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
//      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill", function() {
        if(id === "all") {
          return "none";
        } else {
          return "none";
        }
      })
      .style("fill-opacity", .9)
      .style("stroke", "white");

    squares.exit().remove();

    squares.transition().delay(function(d, i) { return i * 2; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    var connection = el.selectAll(".connection" + "_" + id)
      .data(griddingData, function(d) { return d.index; });

    connection.enter().insert("line")


    // Only show titles for modes cells
    if(id === "all") {

    var titles = el.selectAll(".title")
//      .data(griddingData, function(d) { return d.index; });
      .data(griddingData, function(d) { return flavour; });

       
      titles.enter().append("rect")
//        .attr("x", function(d) { return d.cx - 25; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + d.height - 100; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return 100; })
        .style("stroke", "none")
        .style("fill", "white")
          .attr("opacity",function(d){return 0;})
//        .on("click",callback)
      .on("click",   
          callback);

//      titles.enter().append("text")
//        .attr("class", "title")
//        .attr("text-anchor", "left")
//        .attr("transform", function(d) { return "translate(" + (d.x+5) + "," + (d.y+d.height-1) + ")"; })
//        .text(function(d) { return flavour; })
//        .on("click", callback);

      titles.exit().remove();

      titles.transition().delay(function(d, i) { return i * 10; })
        .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; });

    }
  }

  function update(mode, n, sort) {

    sort = sort || d3.ascending;

    var data = gridding.modes().map(function(d, i) {
      return {"value": flavour, "index": i, 'something': d.value};
        
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
//        .value(function(d) { return d.index; })
        .mode(flavour)
//        .mode(d.value)
        .padding(0);

//      render(svgSquares, grid(d3.range(6).map(function() { return {}; })), d.value)
      render(svgSquares, grid(d3.range(6).map(function() { return {}; })),d.index)
      return d;
    });

  }

  update("vertical", gridding.modes().length);

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

function setKeys() {

  d3.select("body")
     .on("keydown", function(d) {
      var k = d3.event.keyCode;

      if(k === 82) {
        // add
        data = d3.range(data.length + 1);

        // repeat
        if(lastAction === "add") {


        } else if(lastAction === "rem") {


        }

      } else if(k === 85) {

        // rem
        data = d3.range(data.length - 1);
      }

      update();
      console.log("KEY", k);

     });


}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
function updateQueryStringParameter(key, value, uri) {
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");

  if (!uri) {
    uri = window.location.href;
  }

  if( value === undefined ) {
    if (uri.match(re)) {
        return uri.replace(re, '$1$2');
    } else {
        return uri;
    }
  } else {
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      var hash =  '';
      if( uri.indexOf('#') !== -1 ){
          hash = uri.replace(/.*#/, '#');
          uri = uri.replace(/#.*/, '');
      }
      var separator = uri.indexOf('?') !== -1 ? "&" : "?";

      var ret =  uri + separator + key + "=" + value + hash;

      return ret;
    }
  }
}
