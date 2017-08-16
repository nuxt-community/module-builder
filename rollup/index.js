const { resolve } = require('path')
const rollupBabel = require('rollup-plugin-babel')
const rollupAlias = require('rollup-plugin-alias')
const rollupCommonJS = require('rollup-plugin-commonjs')
const rollupNodeResolve = require('rollup-plugin-node-resolve')
const rollupBuiltins = require('rollup-plugin-node-builtins')

function rollupConfig(opts) {

  // Ensure minimal meta structure
  opts.meta = Object.assign({
    name: '',
    version: '0.0.0',
    author: {
      name: ''
    }
  }, opts.meta)

  // Make banner
  const banner = opts.banner || `/*!
  * ${meta.name} v${meta.version}
  * Copyright (c) ${new Date().getFullYear()} ${meta.author.name}
  *
  * Released under the MIT License.
  */`

  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: ['fs', 'path', 'http', 'module'].concat(_package.dependencies, opts.external),
    format: opts.format || 'cjs',
    banner: banner,
    moduleName: opts.moduleName || meta.name || '',
    sourceMap: opts.meta === false ? false : true,
    plugins: [
      rollupAlias(Object.assign({ resolve: ['.js', '.json', '.jsx', '.ts'] }, opts.alias)),
      rollupNodeResolve(Object.assign({ main: true, jsnext: true }, opts.nodeResolve)),
      rollupCommonJS(Object.assign({}, open.commonjs)),
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
      }, opts.babel))
    ].concat(opts.plugins || [])
  }

  return config
}

module.exports = rollupConfig
