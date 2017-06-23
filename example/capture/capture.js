var webPage = require('webpage');
var fs = require('fs');
var page = webPage.create();

var input_folder = "http://127.0.0.1/dev/d3-gridding/";
var output_folder = "figures/";

var figures = [{
    url: "example/placeholder-utils.html",
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
    url: "example/modes-utils-extensions.html",
    format: "png",
    filename: "modes-extensions.png",
    timeout: 400,
    size: [400, 200]
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
    url: "example/barchart-overlap.html",
    format: "png",
    filename: "grid-barchart-overlap.png",
    timeout: 500
  }, {
    url: "example/corner-vertical-overlap.html",
    format: "png",
    filename: "corner-vertical-overlap.png",
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
    url: "example/barchart-population.html",
    format: "png",
    filename: "grid-barchart-population.png",
    timeout: 500
  }, {
    url: "example/treemap-utils.html",
    format: "png",
    filename: "grid-treemap.png",
    timeout: 1000
  }, {
    url: "example/scatterplot.html",
    format: "png",
    filename: "grid-scatterplot.png",
    timeout: 500
  }, {
    url: "example/scatterplot-barchart.html",
    format: "png",
    filename: "grid-scatterplot-barchart.png",
    timeout: 500
  }, {
    url: "example/scatterplot-connected.html",
    format: "png",
    filename: "grid-scatterplot-connected.png",
    timeout: 500
  }, {
    url: "example/treemap-connected.html",
    format: "png",
    filename: "grid-treemap-connected.png",
    timeout: 500
  }, {
    url: "example/grid-order-numbers.html",
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
    url: "example/grid-orient-top.html",
    format: "png",
    filename: "grid-orient-top.png",
    timeout: 500,
    size: [400, 300]
  }, {
    url: "example/grid-orient-bottom.html",
    format: "png",
    filename: "grid-orient-bottom.png",
    timeout: 500,
    size: [400, 300]
  }, {
    url: "example/grid-canvas.html",
    format: "png",
    filename: "grid-canvas.png",
    timeout: 500
  }, {
    url: "example/divide.html",
    format: "png",
    filename: "grid-divide.png",
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
//    url: "example/table-stacked-diverging.html",
//    format: "png",
//    filename: "grid-table-stacked-diverging.png",
//    timeout: 500
//  }, {
    url: "example/lineup.html",
    format: "png",
    filename: "grid-lineup.png",
    timeout: 500
  }, {
    url: "example/vertical-treemap-grouped.html",
    format: "png",
    filename: "grid-vertical-treemap.png",
    timeout: 500
  }, {
    url: "example/vertical-treemap-grouped-horizontal.html",
    format: "png",
    filename: "grid-vertical-treemap-horizontal.png",
    timeout: 500
  }, {
    url: "example/treemap-group.html",
    format: "png",
    filename: "grid-treemap-group.png",
    timeout: 500
  }, {
    url: "example/vertical-items.html",
    format: "png",
    filename: "grid-vertical-items.png",
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
    url: "example/vertical-dense.html",
    format: "png",
    filename: "grid-vertical-dense.png",
    timeout: 500
  }, {
    url: "example/vertical-vertical.html",
    format: "png",
    filename: "grid-vertical-vertical.png",
    timeout: 500
  }, {
    url: "example/horizontal-utils.html",
    format: "png",
    filename: "grid-horizontal.png",
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
  }, {
    url: "example/barchart-staggered.html",
    format: "png",
    filename: "horror-barchart-staggered.png",
    timeout: 500
  }, {
    url: "example/layout-all.html",
    format: "png",
    filename: "layout-all.png",
    timeout: 500
  }, {
    url: "example/layout-extensions.html",
    format: "png",
    filename: "layout-extensions.png",
    timeout: 500,
    size: [400, 120]
  }, {
    url: "example/layout-additions.html",
    format: "png",
    filename: "layout-additions.png",
    timeout: 500,
    size: [400, 210]
  }, {
    url: "example/layout-marginal.html",
    format: "png",
    filename: "layout-marginal.png",
    timeout: 500
  }, {
    url: "example/layout-adjacency.html",
    format: "png",
    filename: "layout-adjacency.png",
    timeout: 500
  }, {
    url: "example/layout-scatterdice.html",
    format: "png",
    filename: "layout-scatterdice.png",
    timeout: 500
  }, {
    url: "example/layout-upset.html",
    format: "png",
    filename: "layout-upset.png",
    timeout: 500
  }, {
    url: "example/parallel-coordinates.html",
    format: "png",
    filename: "parallel-coordinates.png",
    timeout: 500,
    size: [400, 100]
  }, {
    url: "example/parallel-linechart.html",
    format: "png",
    filename: "parallel-linechart.png",
    timeout: 500,
    size: [400, 100]
  }, {
    url: "example/parallel-slope.html",
    format: "png",
    filename: "parallel-slope.png",
    timeout: 500,
    size: [200, 100]
  }, {
    url: "example/test-textures.html",
    format: "png",
    filename: "test-textures.png",
    timeout: 500,
    size: [400, 150]
  }, {
    url: "example/scatterplot-matrix.html",
    format: "png",
    filename: "scatterplot-matrix.png",
    timeout: 500
  }, {
    url: "example/treemap-corner-double.html",
    format: "png",
    filename: "treemap-corner-double.png",
    timeout: 500
  }, {
    url: "example/corner-variable.html",
    format: "png",
    filename: "grid-corner-variable.png",
    timeout: 500
  }, {
    url: "example/table-grid.html",
    format: "png",
    filename: "table-grid.png",
    timeout: 500
  }, {
    url: "example/table-vertical.html",
    format: "png",
    filename: "table-vertical.png",
    timeout: 500
  }, {
    url: "example/table-horizontal.html",
    format: "png",
    filename: "table-horizontal.png",
    timeout: 500
  }, {
    url: "example/table-quantities.html",
    format: "png",
    filename: "table-quantities.png",
    timeout: 500,
    size: [400, 200]
  }, {
    url: "example/scatterplot-grid-map.html",
    format: "png",
    filename: "scatterplot-grid-map.png",
    timeout: 500
  }, {
    url: "example/mosaic-level2.html",
    format: "png",
    filename: "mosaic-level2.png",
    timeout: 500
  }, {
    url: "example/mosaic-level3.html",
    format: "png",
    filename: "mosaic-level3.png",
    timeout: 500
  }, {
    url: "example/vertical-corner.html",
    format: "png",
    filename: "vertical-corner.png",
    timeout: 500,
    size: [300, 100]
  }

// OTHER
, {
    url: "example/all.html",
    format: "png",
    filename: "other-all.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/checkboxes.html",
    format: "png",
    filename: "other-checkboxes.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/chess.html",
    format: "png",
    filename: "other-chess.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/demo-reel.html",
    format: "png",
    filename: "other-demo-reel.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/grid-canvas.html",
    format: "png",
    filename: "other-grid-canvas.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/layout-responsive.html",
    format: "png",
    filename: "other-layout-responsive.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/letters.html",
    format: "png",
    filename: "other-letters.png",
    timeout: 500,
    size: [400, 600]
  }
, {
    url: "example/modes-utils.html",
    format: "png",
    filename: "other-modes-utils.png",
    timeout: 500,
    size: [400, 600]
  }
, {
  url: "example/nested-grid.html",
  format: "png",
  filename: "other-nested-grid.png",
  timeout: 500,
  size: [400, 600]
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

            console.log("rendering...", index + "/" + (fig.length - 1), address);

            displayPageContent += "<a href='../../" + f.url + "'><div style='width:230px; float:left; border: 1px solid black'><img src='" + output + "' style='object-fit: cover; width:230px; height:230px;'></div></a>";

            if(index === 67) {

            displayPageContent += "<p style='clear:both;'></p><h1>Other wireframes</h1>";

            }

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
