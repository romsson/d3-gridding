import npm from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index.js',
  plugins: [npm({jsnext: true}), commonjs({})],
  moduleId: 'd3-gridding',
  moduleName: 'd3-gridding',
  dest: 'd3-gridding.js',
  format: 'umd'
};
