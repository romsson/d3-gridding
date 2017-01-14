# d3-gridding

[![npm version](https://badge.fury.io/js/d3-gridding.svg)](https://badge.fury.io/js/d3-gridding)

Grids for d3 charts.

<p align="center">
  <a href="http://bl.ocks.org/romsson/4e03f6a915c713cf8fe8482d685c8c0b">
    <img src="https://raw.githubusercontent.com/romsson/d3-gridding/master/img/modes.png" width="403" height="296" alt="modes">
  </a>
</p>

> Be aware this is very much work-in-progress. The API is subject to major changes. My plan is to figure out the best abstraction for d3 layouts. Once this will be done, it should be reflected with a major version upgrade.

## Installing

* If you use NPM, `npm install d3-gridding`. 

* Otherwise, download the [latest release](https://github.com/romsson/d3-gridding/releases/latest).

In both cases, you then have to include the `d3-gridding.js` JavaScript file in your HTML code.

## API

The code snippet below lets you create dots organized as a grid:

```js
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

The magic happens with `gridding` which turns an array of JavaScript Objects, into another array with additional attributes:

`> gridding([{}, {}, {}])`

`[▶ Object, ▶ Object, ▶ Object]`

```js
[▼ Object                    ]
    x: 0
    y: 300
    cx: 300
    cy: 300
    height: 600
    width: 266.6666666666667
```

* (`x`, `y`) the computed coordinates (which can be seen as `top` / `left` values)
* (`height`, `width`) gives the bounding box if combined with (`x`, `y`)
* (`cx`, `cy`) the center of the bounding box

It becomes interesting when changing the type of layout, which will organize the elements differently, by changing the value of the attributes above:

```js
gridding.mode("horizontal");

var points = svgPoints.selectAll(".point")
  .data(gridding(data));
```

That's pretty much what you need to know at this point to get started. Below is a list of functions that will let you customize the layouts and retrieve internal values.

<a name="gridding_mode" href="#gridding_mode">#</a> <i>d3.gridding()</i>.<b>mode</b>(<i>mode</i>)

The `mode` parameter sets the layout:

* `vertical` - vertical partitioning
* `horizontal` - horizontal partitioning, can be proportional to `.valueY()`
* `central` - overlapping partitioning
* `grid` - classic grid partitioning
* `coordinate` - absolute position by `.valueX()` and `.valueY()`
* `radial` - circular partitioning (e.g. pie chart with uniform wedges)
* `treemap` - using [d3.treemap()](https://github.com/d3/d3-hierarchy/blob/master/* README.md#treemap) layout
* `pack` - using [d3.pack()](https://github.com/d3/d3-hierarchy/blob/master/* README.md#pack)
* `stack` - using [d3.stack()](https://github.com/d3/d3-shape/blob/master/README.md#stacks)
* `diagonal`  - aligned on the diagonal
* `cascade` - like diagonal but with larger and overlapping cells 
* `identity` - does nothing, returns same values

To get the list of all available modes `gridding.modes()`.

<a name="gridding_sort" href="#gridding_sort">#</a> <i>d3.gridding()</i>.<b>sort</b>([<i>compare</i>])

Sets the sort function, similar to [D3's](https://github.com/d3/d3-shape/blob/master/README.md#pie_sort) and defaults to:

```js
function(a, b) { return a - b; }
```

Thus you can use D3's sorting functions such as `d3.ascending` and `d3.descending`.

<a name="gridding_value" href="#gridding_value">#</a> <i>d3.gridding()</i>.<b>value</b>([<i>accessor</i>])

Sets the value `accessor` function, similar to [D3's](https://github.com/d3/d3-shape/blob/master/README.md#pie_value) and defaults to:

```js
function value(d) { return d; }
```

<a name="gridding_value" href="#gridding_value">#</a> <i>d3.gridding()</i>.<b>valueY</b>([<i>string || accessor</i>])

The value can either be a traditional `accessor` function but for attributes this time, or the data attribute itself directly as a string:

```js
.valueY(function value(d) { return d["index"]; })
```

 or

```js
.valueY("index")
```

<a name="gridding_padding" href="#gridding_padding">#</a> <i>d3.gridding()</i>.<b>padding</b>(<i>value</i>)

Sets the local offset between grid elements (default: 1px).

<a name="gridding_padding" href="#gridding_padding">#</a> <i>d3.gridding()</i>.<b>offset</b>(<i>value</i>)

Sets the global offset for all elements (default: 0px) as an array `[left, top]`.

<a name="gridding_padding" href="#gridding_padding">#</a> <i>d3.gridding()</i>.<b>orient</b>(<i>"up" | "down" (default)</i>)

Orients the `grid` & `diagonal` layouts either upwards or downwards when adding / removing cells.

<a name="gridding_radius" href="#gridding_radius">#</a> <i>d3.gridding()</i>.<b>radius</b>(<i>value</i>)

Radius for radial layout.

## Credits

* https://d3js.org/
* http://bl.ocks.org/mbostock
* https://github.com/interactivethings/d3-grid
