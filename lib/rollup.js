const { resolve } = require('path')
const rollupBabel = require('rollup-plugin-babel')
const rollupAlias = require('rollup-plugin-alias')
const rollupCommonJS = require('rollup-plugin-commonjs')
const rollupNodeResolve = require('rollup-plugin-node-resolve')
const rollupBuiltins = require('rollup-plugin-node-builtins')

function rollupConfig(options = {}, meta = {}) {

  const config = {
    input: options.entry,
    external: ['fs', 'path', 'http', 'module'].concat(options.meta.dependencies, options.external),
    format: options.format || 'cjs',
    banner: options.banner,
    name: options.name || options.meta.name || '',
    output: {
      format: 'cjs',
      file: options.dest,
      sourcemap: options.sourceMap,
    },
    plugins: [
      rollupAlias(Object.assign({ resolve: ['.js', '.json', '.jsx', '.ts'] }, options.alias)),
      rollupNodeResolve(Object.assign({ preferBuiltins: true }, options.nodeResolve)),
      rollupCommonJS(Object.assign({}, options.commonjs)),
      rollupBabel(Object.assign({
        exclude: 'node_modules/**',
        plugins: [
          'transform-async-to-generator',
          'array-includes'
        ],
        presets: [
          ['es2015', { modules: false }]
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
