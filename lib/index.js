const { resolve, dirname } = require('path')
const fs = require('fs-extra')
const rollupConfig = require('./rollup')
const rollup = require('rollup')
const debug = require('debug')('nuxt-module:build')

class ModuleBuilder {
    constructor(options = {}) {
        this.options = options

        // Meta
        const defaultMeta = {
            name: '',
            version: '0.0.0',
            dependencies: [],
            author: {
                name: ''
            }
        }
        if (!this.options.meta) {
            const packageJsonPath = resolve(this.options.rootDir, 'package.json')
            if (fs.existsSync(packageJsonPath)) {
                const packageJson = fs.readJSONSync(packageJsonPath)
                Object.assign(defaultMeta, packageJson)
            }
        }
        this.options.meta = Object.assign({}, defaultMeta, this.options.meta)

        // Using moduleBuilder section of package.json
        if (this.options.meta.moduleBuilder) {
            Object.assign(this.options, this.options.meta.moduleBuilder)
        }

        // Banner
        const banner = this.options.banner || `/*!
        * ${this.options.meta.name} v${this.options.meta.version}
        * Copyright (c) ${new Date().getFullYear()} ${this.options.meta.author.name}
        *
        * Released under the MIT License.
        */`

        // Rollup
        this.options.entry = this.options.entry || resolve(this.options.rootDir, 'src/index.js')
        this.options.dest = this.options.dest || resolve(this.options.rootDir, 'dist/index.js')
    }

    build() {
        debug('Building')
        const config = rollupConfig(this.options)
        return rollup.rollup(config).then(bundle => {
            fs.ensureDirSync(dirname(this.options.dest))
            return bundle.write(config.output).then((err) => {
                debug('Done')
            })
        })
    }

    watch() {
        debug('Starting watch')
        const config = rollupConfig(this.options)
        const watcher = rollup.watch(config)
        watcher.on('event', event => {
         switch (event.code) {
             case 'BUNDLE_START':
                 debug('Building ' + event.input)
                 break;
             case 'BUNDLE_END':
                 debug('Built ' + event.output)
                 break;
              case 'ERROR':
              case 'FATAL':
                 console.log(event.error)
                 break;
               case 'FATAL':
                 console.log(event.error)
                 process.exit(1)
                 break;
         }
        })
        return Promise.resolve()
    }
}

module.exports = ModuleBuilder