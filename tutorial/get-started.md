# Get Started

Go to https://github.com/romsson/d3-gridding

Clone the repository

> git clone https://github.com/romsson/d3-gridding.git

> cd d3-gridding/

Check the `package.json` file

Install all dependencies:

> npm install

If everything is ok, then compile and keep track of changes:

> npm run prepublish:watch

At this point any change made in ./src and ./test will trigger a new compilation.

To only compile the library run:

> npm run postpublish

Will create the build/d3-gridding.js and  build/d3-gridding.min.js files

To check if this works, then go to the example/ folders and open the URL below and you should see a grid with all the grids inside:

/d3-gridding/example/modes.html

## Bonus

Run all the tests

> npm run test
