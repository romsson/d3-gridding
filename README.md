# d3-gridding

Creates various grid partitions and overlays for d3 charts.

## Installing

* If you use NPM, `npm install d3-gridding`. 

* Otherwise, download the [latest release](https://github.com/romsson/d3-gridding/releases/latest).

In both cases, you then have to include the `d3-gridding.js` JavaScript file in your HTML code.

## API

Here is an example on how to call the lib and generate a d3 chart out of it:

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

`[▶Object, ▶Object, ▶Object]`

```
[▼Object
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


### d3.gridding().mode()

`grid` - classic grid
`vertical` - vertical layout
`horizontal` - horizontal layout
`central` - overlapping layout
`coordinates` - absolute position
`identity` - does nothing, returns same values

To get the list of all available modes `gridding.modes()`

