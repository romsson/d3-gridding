var layouts = [
  {
    "name": "basic1column",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 0, "__height": 10, "__width": 10, "name": "main"}]
  }, {
    "name": "basic2columns",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 0, "__height": 10, "__width": 3, "name": "left"},
      {"index": 3, "__x": 3, "__y": 0, "__height": 10, "__width": 7, "name": "main"}]
  }, {
    "name": "basic3columns",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 0, "__height": 10, "__width": 2, "name": "left"},
      {"index": 3, "__x": 2, "__y": 0, "__height": 10, "__width": 6, "name": "main"},
      {"index": 4, "__x": 8, "__y": 0, "__height": 10, "__width": 2, "name": "right"}]
  }, {
    "name": "header3colFooter",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 2, "__height": 6, "__width": 3.3, "name": "left"},
      {"index": 3, "__x": 3.3, "__y": 2, "__height": 6, "__width": 3.4, "name": "main"},
      {"index": 4, "__x": 6.7, "__y": 2, "__height": 6, "__width": 3.3, "name": "right"},
      {"index": 5, "__x": 0, "__y": 0, "__height": 2, "__width": 10, "name": "header"},
      {"index": 6, "__x": 0, "__y": 8, "__height": 2, "__width": 10, "name": "footer"}
    ]
  }, {
    "name": "chart4margins",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 2, "__height": 6, "__width": 2, "name": "left"},
      {"index": 3, "__x": 2, "__y": 2, "__height": 6, "__width": 6, "name": "main"},
      {"index": 4, "__x": 8, "__y": 2, "__height": 6, "__width": 2, "name": "right"},
      {"index": 5, "__x": 2, "__y": 0, "__height": 2, "__width": 6, "name": "top"},
      {"index": 6, "__x": 2, "__y": 8, "__height": 2, "__width": 6, "name": "bottom"}
    ]
  }, {
    "name": "chart2margins",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 0, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 1, "__x": 0, "__y": 2, "__height": 8, "__width": 8, "name": "main"},
      {"index": 2, "__x": 8, "__y": 2, "__height": 8, "__width": 2, "name": "right"},
      {"index": 3, "__x": 0, "__y": 0, "__height": 2, "__width": 8, "name": "top"}
    ]
  }, {
    "name": "chart2marginsCols",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 0, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 1, "__x": 0, "__y": 2, "__height": 8, "__width": 4, "name": "main"},
      {"index": 2, "__x": 4, "__y": 2, "__height": 8, "__width": 2, "name": "right"},
      {"index": 3, "__x": 0, "__y": 0, "__height": 2, "__width": 4, "name": "top"},
      {"index": 4, "__x": 6, "__y": 2, "__height": 8, "__width": 2, "name": "right"}

    ]
 // }, {
 //   "name": "chart2margins",
 //   "values": [
 //   //  {"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
 //     {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
 //     {"index": 2, "__x": 0, "__y": 0, "__height": 10, "__width": 2, "name": "left"},
 //     {"index": 3, "__x": 2, "__y": 0, "__height": 10, "__width": 6, "name": "main"},
 //     {"index": 4, "__x": 8, "__y": 0, "__height": 10, "__width": 2, "name": "right"}
 //   ]
  }, {
    "name": "header6gridFooter",
    "values": [
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 2, "__height": 3, "__width": 3.3, "name": "grid1"},
      {"index": 3, "__x": 3.3, "__y": 2, "__height": 3, "__width": 3.3, "name": "grid2"},
      {"index": 3, "__x": 6.6, "__y": 2, "__height": 3, "__width": 3.3, "name": "grid3"},
      {"index": 2, "__x": 0, "__y": 5, "__height": 3, "__width": 3.3, "name": "grid4"},
      {"index": 3, "__x": 3.3, "__y": 5, "__height": 3, "__width": 3.3, "name": "grid5"},
      {"index": 3, "__x": 6.6, "__y": 5, "__height": 3, "__width": 3.3, "name": "grid6"},
      {"index": 5, "__x": 0, "__y": 0, "__height": 2, "__width": 10, "name": "header"},
      {"index": 6, "__x": 0, "__y": 8, "__height": 2, "__width": 10, "name": "footer"}
    ]
  }, {
    "name": "scatterDice",
    "values": [
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 2, "__x": 0, "__y": 1, "__height": 5, "__width": 4, "name": "matrix"},
      {"index": 3, "__x": 4, "__y": 1, "__height": 7, "__width": 6, "name": "main"},
      {"index": 4, "__x": 0, "__y": 6, "__height": 2, "__width": 4, "name": ""} // history
 //     {"index": 4, "__x": 0, "__y": 6.5, "__height": 3, "__width": 4, "name": "queries"}
    ]
  }, {
    "name": "basic1columnInset",
    "values": [//{"index": 0, "__x": 0, "__y": 0, "__height": 10, "__width": 10},
      {"index": 1, "__x": 10, "__y": 10, "__height": 0, "__width": 0},
      {"index": 3, "__x": 0, "__y": 0, "__height": 4, "__width": 4, "name": "focus"},
      {"index": 2, "__x": 0, "__y": 0, "__height": 10, "__width": 10, "name": "context"}]
  }
];

