var webPage = require('webpage');
var fs = require('fs');
var page = webPage.create();

var input_folder = "http://127.0.0.1/dev/d3-gridding/";
var output_folder = "figures/";

// TODO
// [X] Fixed timeouts
// [ ] Viewport dimensions
// [ ] Clipping?
// [ ] Resolution with PNG?
// [ ] Generate HTML page with all the figures and clickable
// [ ]

var figures = [{
    url: "example/placeholder.html",
    format: "png",
    filename: "placeholder.png",
    timeout: 200,
    size: [400, 300]
  }, {
    url: "example/modes.html",
    format: "png",
    filename: "modes.png",
    timeout: 200
  }, {
    url: "example/modes-permutation.html",
    format: "png",
    filename: "modes-permutation.png",
    timeout: 400
  }, {
    url: "example/modes-permutation.html",
    format: "png",
    filename: "modes-permutation.png",
    timeout: 400
  }, {
    url: "example/histogram.html",
    format: "png",
    filename: "grid-histogram.png",
    timeout: 200
  }, {
    url: "example/histogram-grid.html",
    format: "png",
    filename: "grid-histogram-grid.png",
    timeout: 200
  }, {
    url: "example/barchart-grouped.html",
    format: "png",
    filename: "grid-barchart-grouped.png",
    timeout: 500
  }, {
    url: "example/barchart-stacked.html",
    format: "png",
    filename: "grid-barchart-stacked.png",
    timeout: 500
  }, {
    url: "example/barchart-horizon.html",
    format: "png",
    filename: "grid-barchart-horizon.png",
    timeout: 500
  }, {
    url: "example/bar-chart-treemap/index-gridding.html",
    format: "png",
    filename: "grid-bar-chart-treemap2.png",
    timeout: 1000
  }, {
    url: "example/grid-order.html",
    format: "png",
    filename: "grid-order.png",
    timeout: 500,
    size: [400, 300]
  }, {
    url: "example/grid-order-group.html",
    format: "png",
    filename: "grid-order-group.png",
    timeout: 500,
    size: [400, 300]
  }, {
    url: "example/grid-canvas.html",
    format: "png",
    filename: "grid-canvas.png",
    timeout: 500
  }, {
    url: "example/scatterdice/scatterdice.html",
    format: "png",
    filename: "grid-scatterdice.png",
    timeout: 500,
  }, {
    url: "example/divide.html",
    format: "png",
    filename: "divide.png",
    timeout: 500
  }, {
    url: "example/chess.html",
    format: "png",
    filename: "chess.png",
    timeout: 500
  }, {
    url: "example/tree-double.html",
    format: "png",
    filename: "tree-double.png",
    timeout: 500
  }, {
    url: "example/quadrants.html",
    format: "png",
    filename: "quadrants.png",
    timeout: 500
  }, {
    url: "example/quadrants-utils.html",
    format: "png",
    filename: "quadrants-utils.png",
    timeout: 500
  }, {
    url: "example/table.html",
    format: "png",
    filename: "grid-table.png",
    timeout: 500
  }, {
    url: "example/table-stacked.html",
    format: "png",
    filename: "grid-table-stacked.png",
    timeout: 500
  }, {
    url: "example/table-stacked-sorted.html",
    format: "png",
    filename: "grid-table-stacked-sorted.png",
    timeout: 500
  }, {
    url: "example/lineup.html",
    format: "png",
    filename: "grid-lineup.png",
    timeout: 500
  }, {
    url: "example/vertical.html",
    format: "png",
    filename: "grid-vertical.png",
    timeout: 500
  }, {
    url: "example/vertical-width.html",
    format: "png",
    filename: "grid-vertical-width.png",
    timeout: 500
  }, {
    url: "example/vertical-height.html",
    format: "png",
    filename: "grid-vertical-height.png",
    timeout: 500
  }, {
    url: "example/vertical-width-height.html",
    format: "png",
    filename: "grid-vertical-width-height.png",
    timeout: 500
  }, {
    url: "example/margin.html",
    format: "png",
    filename: "grid-maring.png",
    timeout: 500
  }, {
    url: "example/line25d/layers-25D.html",
    format: "png",
    filename: "layers-25D.png",
    timeout: 500
  }, {
    url: "example/barchart-grouped-top.html",
    format: "png",
    filename: "horror-barchart-grouped-top.png",
    timeout: 500
  }
];

capture(figures, 0);

var displayPageContent = "";

function capture(fig, index) {

  var f = fig[index];

  var address = input_folder + f.url;
  var output = output_folder + f.filename;

  if(typeof f.size === "undefined")  {
    f.size = [400, 300];
  }

  page.open(address, function start(status) {

    if (status !== 'success') {

        console.log('Unable to load the address: ', address);
        phantom.exit(1);

    } else {

        window.setTimeout(function () {

            page.viewportSize = {width: f.size[0], height: f.size[1]};

            page.render(output, {format: f.format, quality: '50'});

            console.log("rendering...", address);

            displayPageContent += "<a href='../../" + f.url + "'><div style='width:200px; float:left; border: 1px solid black'><img src='" + output + "' style='width: 100%;'></div></a>";

            if(index === fig.length - 1) { // last one

              var displayPage = require('webpage').create();
              displayPage.content = '<html><body>' + displayPageContent + '</body></html>';
              fs.write('display.html', displayPage.content, 'w');

            console.log("done!");

              phantom.exit();

            } else {

              capture(fig, index + 1);

            }

        }, 200);
    }

  });

}
