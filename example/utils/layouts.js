
var layouts = [
  {
    "name": "basic1column",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 0, "height": 10, "width": 10, "name": "middle"}]
  }, {
    "name": "basic2columns",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 0, "height": 10, "width": 3, "name": "left"},
      {"index": 3, "x": 3, "y": 0, "height": 10, "width": 7, "name": "right"}]
  }, {
    "name": "basic3columns",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 0, "height": 10, "width": 2, "name": "left"},
      {"index": 3, "x": 2, "y": 0, "height": 10, "width": 6, "name": "middle"},
      {"index": 4, "x": 8, "y": 0, "height": 10, "width": 2, "name": "right"}]
  }, {
    "name": "header3colFooter",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 2, "height": 6, "width": 3.3, "name": "left"},
      {"index": 3, "x": 3.3, "y": 2, "height": 6, "width": 3.4, "name": "middle"},
      {"index": 4, "x": 6.7, "y": 2, "height": 6, "width": 3.3, "name": "right"},
      {"index": 5, "x": 0, "y": 0, "height": 2, "width": 10, "name": "header"},
      {"index": 6, "x": 0, "y": 8, "height": 2, "width": 10, "name": "footer"}
    ]
  }, {
    "name": "chart4margins",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 2, "height": 6, "width": 2, "name": "left"},
      {"index": 3, "x": 2, "y": 2, "height": 6, "width": 6, "name": "middle"},
      {"index": 4, "x": 8, "y": 2, "height": 6, "width": 2, "name": "right"},
      {"index": 5, "x": 2, "y": 0, "height": 2, "width": 6, "name": "top"},
      {"index": 6, "x": 2, "y": 8, "height": 2, "width": 6, "name": "bottom"}
    ]
  }, {
    "name": "chart2margins",
    "values": [//{"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 3, "x": 0, "y": 2, "height": 8, "width": 8, "name": "middle"},
      {"index": 4, "x": 8, "y": 2, "height": 8, "width": 2, "name": "right"},
      {"index": 5, "x": 0, "y": 0, "height": 2, "width": 8, "name": "top"}
    ]
  }, {
    "name": "chart2margins",
    "values": [
    //  {"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 0, "height": 10, "width": 2, "name": "left"},
      {"index": 3, "x": 2, "y": 0, "height": 10, "width": 6, "name": "middle"},
      {"index": 4, "x": 8, "y": 0, "height": 10, "width": 2, "name": "right"}
    ]
  }, {
    "name": "header6gridFooter",
    "values": [
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 2, "height": 3, "width": 3.3, "name": "grid1"},
      {"index": 3, "x": 3.3, "y": 2, "height": 3, "width": 3.3, "name": "grid2"},
      {"index": 3, "x": 6.6, "y": 2, "height": 3, "width": 3.3, "name": "grid3"},
      {"index": 2, "x": 0, "y": 5, "height": 3, "width": 3.3, "name": "grid4"},
      {"index": 3, "x": 3.3, "y": 5, "height": 3, "width": 3.3, "name": "grid5"},
      {"index": 3, "x": 6.6, "y": 5, "height": 3, "width": 3.3, "name": "grid6"},
      {"index": 5, "x": 0, "y": 0, "height": 2, "width": 10, "name": "header"},
      {"index": 6, "x": 0, "y": 8, "height": 2, "width": 10, "name": "footer"}
    ]
  }, {
    "name": "scatterDice",
    "values": [
      {"index": 0, "x": 0, "y": 0, "height": 10, "width": 10},
      {"index": 1, "x": 10, "y": 10, "height": 0, "width": 0},
      {"index": 2, "x": 0, "y": 1, "height": 4, "width": 4, "name": "matrix"},
      {"index": 3, "x": 4, "y": 1, "height": 7, "width": 6, "name": "full"},
      {"index": 4, "x": 0, "y": 5, "height": 1.5, "width": 4, "name": "history"},
      {"index": 4, "x": 0, "y": 6.5, "height": 3, "width": 4, "name": "queries"}
    ]
  }
];



/*
var data = [

];



// 4-maring chart
var data = [

];

// 2-maring chart
var data = [

];
*/
