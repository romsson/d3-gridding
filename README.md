# d3-gridding

Grids for d3 charts.

Warning. This is very much work-in-progress. The API is subject to major changes. My plan is to figure out the best abstraction for d3 layouts

## Installing

* If you use NPM, `npm install d3-gridding`. 

* Otherwise, download the [latest release](https://github.com/romsson/d3-gridding/releases/latest).

In both cases, you then have to include the `d3-gridding.js` JavaScript file in your HTML code.

## API

Here is a simple example:

```
var data = d3.range(10);

var gridding = d3.gridding()
  .size([800, 600])
  .mode("vertical");

var points = svgPoints.selectAll(".point")
  .data(gridding(data));

points.enter().append("circle")
  .attr("class", "point")
  .attr("r", 10)
  .attr("transform", function(d) { return "translate(" + d.cx + "," + d.cy + ")"; });
```

The key part is the `gridding` variable that adds position variables to the array of objects given as input:

`> gridding([{}, {}, {}])`

`[▶ Object, ▶ Object, ▶ Object]`

```
[▼ Object
    x: 0
    y: 300
    cx: 300
    cy: 300
    height: 600
    width: 266.6666666666667
```

(`x`, `y`) the computed coordinates
(`cx`, `cy`) the center of the coordinates
(`height`, `width`) gives the bounding box if combined with (`x`, `y`) (which can be seen as `top` / `left` values).

To update (such as to change the layout mode):

```
gridding.mode("horizontal");

var points = svgPoints.selectAll(".point")
  .data(gridding(data));
```

<a name="gridding_mode" href="#gridding_mode">#</a> <i>d3.gridding()</i>.<b>mode</b>(<i>mode</i>)

The `mode` parameter sets the layout:

`grid` - classic grid
`vertical` - vertical layout
`horizontal` - horizontal layout
`diagonal` - diagonal layout
`central` - overlapping layout
`coordinates` - absolute position
`radial` - pie chart with uniform wedges
`treemap` - [d3.treemap()](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap) layout
`pack` - [d3.pack()](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack)
`identity` - does nothing, returns same values

To get the list of all available modes `gridding.modes()`

<a name="gridding_sort" href="#gridding_sort">#</a> <i>d3.gridding()</i>.<b>sort</b>([<i>compare</i>])

Sets the sort function, similar to [D3's](https://github.com/d3/d3-shape/blob/master/README.md#pie_sort) and defaults to:

```
function(a, b) { return a - b; }
```

<a name="gridding_value" href="#gridding_value">#</a> <i>d3.gridding()</i>.<b>value</b>([<i>accessor</i>])

Sets the value `accessor` function, similar to [D3's](https://github.com/d3/d3-shape/blob/master/README.md#pie_value) and defaults to:

```
function value(d) { return d; }
```

<a name="gridding_padding" href="#gridding_padding">#</a> <i>d3.gridding()</i>.<b>padding</b>(<i>value</i>)

Sets the local offset between grid elements (default: 1px).

<a name="gridding_padding" href="#gridding_padding">#</a> <i>d3.gridding()</i>.<b>offset</b>(<i>value</i>)

Sets the global offset of all elements (default: 0px).
