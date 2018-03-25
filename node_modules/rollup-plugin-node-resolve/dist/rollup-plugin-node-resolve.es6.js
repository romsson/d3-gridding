import { resolve, dirname } from 'path';
import builtins from 'builtin-modules';
import _nodeResolve from 'resolve';
import browserResolve from 'browser-resolve';

var COMMONJS_BROWSER_EMPTY = _nodeResolve.sync('browser-resolve/empty.js', __dirname);
var ES6_BROWSER_EMPTY = resolve(__dirname, '../src/empty.js');
var CONSOLE_WARN = function CONSOLE_WARN() {
	var _console;

	return (_console = console).warn.apply(_console, arguments);
};

function nodeResolve(options) {
	options = options || {};

	var skip = options.skip || [];
	var useMain = options.main !== false;
	var isPreferBuiltinsSet = options.preferBuiltins === true || options.preferBuiltins === false;
	var preferBuiltins = isPreferBuiltinsSet ? options.preferBuiltins : true;

	var onwarn = options.onwarn || CONSOLE_WARN;
	var _resolveId = options.browser ? browserResolve : _nodeResolve;

	return {
		resolveId: function resolveId(importee, importer) {
			var parts = importee.split(/[\/\\]/);
			var id = parts.shift();

			// scoped packages
			if (id[0] === '@' && parts.length) {
				id += '/' + parts.shift();
			}

			if (skip !== true && ~skip.indexOf(id)) return null;

			// disregard entry module
			if (!importer) return null;

			return new Promise(function (accept, reject) {
				_resolveId(importee, {
					basedir: dirname(importer),
					packageFilter: function packageFilter(pkg) {
						if (options.jsnext) {
							var main = pkg['jsnext:main'];
							if (main) {
								pkg['main'] = main;
							} else if (!useMain) {
								if (skip === true) accept(false);else reject(Error('Package ' + importee + ' (imported by ' + importer + ') does not have a jsnext:main field. You should either allow legacy modules with options.main, or skip it with options.skip = [\'' + importee + '\'])'));
							}
						} else if (!useMain) {
							if (skip === true) accept(false);else reject(Error('To import from a package in node_modules (' + importee + '), either options.jsnext or options.main must be true'));
						}
						return pkg;
					},

					extensions: options.extensions
				}, function (err, resolved) {
					if (err) {
						if (skip === true) accept(false);else reject(err);
					} else {
						if (resolved === COMMONJS_BROWSER_EMPTY) {
							accept(ES6_BROWSER_EMPTY);
						} else if (~builtins.indexOf(resolved)) {
							accept(null);
						} else if (~builtins.indexOf(importee) && preferBuiltins) {
							if (!isPreferBuiltinsSet) {
								onwarn('preferring built-in module \'' + importee + '\' over local alternative ' + ('at \'' + resolved + '\', pass \'preferBuiltins: false\' to disable this ') + 'behavior or \'preferBuiltins: true\' to disable this warning');
							}
							accept(null);
						} else {
							accept(resolved);
						}
					}
				});
			});
		}
	};
}

export default nodeResolve;