# Add a new mode

Pick a name for the new mode, e.g. `NEW-MODE`

Create a branch with `mode-NEW-MODE`

Create a file in `src/modes/NEW-MODE.js`

Import the file in `src/gridding.js` which is the main entry point for modes

Add the mode in the `vars.modes`object in [gridding.js](https://github.com/romsson/d3-gridding/blob/master/src/gridding.js#L40)

Write the code from your mode, using [identity mode](https://github.com/romsson/d3-gridding/blob/master/src/modes/identity.js) as starter

Create a test file `test/NEW-MODE-test.js`

Write [new tests](add-new-test.md) for your mode

Create a simple example named `example/NEW-MODE.html`

Create more complex examples showing the mode features and variations for various parameters

Test [nesting with other modes](https://romsson.github.io/d3-gridding/example/modes.html)

Make sure all the tests pass and examples still work

Create a pull request

Merge with `dev`

Merge with `master`
