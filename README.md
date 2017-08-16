# Nuxt Module Builder
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-module-kit/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-module-kit)
[![npm](https://img.shields.io/npm/dt/nuxt-module-kit.svg?style=flat-square)](https://npmjs.com/package/nuxt-module-kit)
[![Greenkeeper](https://img.shields.io/badge/greenkeepr-enabled-green.svg?style=flat-square)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/nuxt/module-kit/status.svg?style=flat-square)](https://david-dm.org/nuxt/module-kit)
   
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

> 🏗️ Nuxt Standard Module Builder

### ⚠️ This package is still under development

## Features
- Build Modules using same tool chain of Nuxt
- ES6 Support out of the box
- Nuxt inspired build system using single `nuxt.module.config.js` file
- Standard eslint rules

## Getting started

Edit your `package.json` like this:

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

Create your module file: **(src/index.js)**

```js
export default async function (moduleOptions) {
    // ...
}
```

You can optionally create a **nuxt.module.config.js** in the root of your project specify more options:

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

You you can use `npm run nuxt-module` to generate `dist/index.js`!

### Using module starter template
TODO

## Eslint
TODO

## License

[MIT License](./LICENSE)

Copyright (c) 2017 Nuxt.js