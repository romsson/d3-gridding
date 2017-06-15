# Deploy a new version

## Checklist

* Merge all changes into `dev` branch
* Make sure all the `npm test` pass
* Make sure all `examples` work
* Make sure the API and docs are up-to-date
* Bump version in package.json
* Merge to `master` branch
* [Tag](https://github.com/romsson/d3-gridding/tags) with version
* Write release notes
* Run `npm postpublish`
* Upload the zip and release note on [GitHub release](https://github.com/romsson/d3-gridding/releases)
* Run `npm publish` to publish on [npm](npmjs.com/package/d3-gridding)

As a result: 

* The [latest release](https://github.com/romsson/d3-gridding/releases/latest) should point to the tagged version
* The [npm repository](npmjs.com/package/d3-gridding) should have been updated

## Git branch naming

* `master` branch that reflects the latest version
* `dev` branch which is the current development branch
* `mode-XXX` for new modes or mode updates
* `fix-XXX` for hot fixes
* `example-XXX` for new examples
* `clean-XXX` for cleanups
* `gh-pages` contains all the examples and node_modules files

