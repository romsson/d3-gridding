# Draw a SVG grid


```
var width = 400,
    height = 300;

var gridding = d3.gridding()
  .size([width, height])
  .mode("grid");

var data =  d3.range(250).map(function(d, i) {
  return {value: d};
});

var griddingData = gridding(data);

var svgSquares = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

svgSquares.selectAll(".square")
    .data(griddingData, function(d) { return d.index; })
  .enter().append("rect")
    .attr("class", "square")
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

svgSquares.selectAll(".index")
    .data(griddingData)
  .enter().append("text")
    .attr("class", "index")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'central')
    .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; })
    .text(function(d, i) { return d.value; });
```

