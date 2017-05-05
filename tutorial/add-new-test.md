# Add a new test


Jump to the `test/` folder

Create a file `NEW-MODE-test.js`

Create a first simple test with small dataset

```
var tape = require("tape"),
    gridding = require("../");

tape("identity layout returns the very same grid positions", function(test) {

  var nodes = [];

  test.deepEqual(nodes, gridding.gridding()(nodes));
  test.end();
});
```

> npm run test

-> SHould be 0 errors
