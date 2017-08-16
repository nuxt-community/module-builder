# Nuxt Module Builder
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-module-builder/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-module-builder)
[![npm](https://img.shields.io/npm/dt/nuxt-module-builder.svg?style=flat-square)](https://npmjs.com/package/nuxt-module-builder)
[![Dependencies](https://david-dm.org/nuxt/module-builder/status.svg?style=flat-square)](https://david-dm.org/nuxt/module-builder)
   

> 🏗️ Nuxt Standard Module Builder

### ⚠️ This package is still under development

## Features
- Build modules using same tool-chain of nuxt
- ES6 Support out of the box
- Nuxt inspired build system using optional single `nuxt.module.config.js` file
- Standard eslint rules

### Using module starter template
Just head to [nuxt-community/module-template](https://github.com/nuxt-community/module-template)
to make your fresh module in few minutes.

## Getting started

Edit **package.json** like this:

```json
{
    "scripts": {
        "build": "nuxt-module"
    },
    "devDependencies": {
        "nuxt-module-builder": "latest"
    }
}
```

Create **src/index.js** file:

```js
export default async function (moduleOptions) {
    // ...
}
```

Optionally add a `moduleBuilder` section in **package.json** 
or Create **nuxt.module.config.js** in the root of module project to customize module builder:

```js
module.exports = {
    meta: {
        name: 'myModule'
    },
    plugins: [
        // rollup plugins
    ]
}
```

You you can now use `npm run nuxt-module` to generate `dist/index.js`

## ESLint
TODO

## License

[MIT License](./LICENSE)

Copyright (c) 2017 Nuxt.js