const { resolve } = require('path')
const rollupBabel = require('rollup-plugin-babel')
const rollupAlias = require('rollup-plugin-alias')
const rollupCommonJS = require('rollup-plugin-commonjs')
const rollupNodeResolve = require('rollup-plugin-node-resolve')
const rollupBuiltins = require('rollup-plugin-node-builtins')

function rollupConfig(options = {}, meta = {}) {

  const config = {
    entry: options.entry,
    dest: options.dest,
    external: ['fs', 'path', 'http', 'module'].concat(options.meta.dependencies, options.external),
    format: options.format || 'cjs',
    banner: options.banner,
    moduleName: options.moduleName || options.meta.name || '',
    sourceMap: options.sourceMap === false ? false : true,
    plugins: [
      rollupAlias(Object.assign({ resolve: ['.js', '.json', '.jsx', '.ts'] }, options.alias)),
      rollupNodeResolve(Object.assign({ main: true, jsnext: true }, options.nodeResolve)),
      rollupCommonJS(Object.assign({}, options.commonjs)),
      rollupBabel(Object.assign({
        exclude: 'node_modules/**',
        plugins: [
          ['transform-runtime', { 'helpers': false, 'polyfill': false }],
          'transform-async-to-generator',
          'array-includes'
        ],
        presets: [
          'babel-preset-es2015-rollup'
        ],
        'env': {
          'test': {
            'plugins': ['istanbul']
          }
        }
      }, options.babel))
    ].concat(options.plugins || [])
  }

  return config
}

module.exports = rollupConfig
