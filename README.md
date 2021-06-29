<br>
<br>
<br>

## Introduction

**Vue Script Loader** is a library to inject external scripts dynamicatly on youtr Vue projects

## Install

  ``` bash
  npm install @srubio131/vue-script-loader --save
  ```
  or
  ``` bash
  yarn add @srubio131/vue-script-loader
  ```

## Install

  ``` js
  import VueScriptLoader from '@srubio131/vue-script-loader'

  Vue.use(VueScriptLoader)
  // Or you can specify any other options
  Vue.use(VueScriptLoader, {
    name: 'myScriptLoader',
    extraAttrs: {
        id: 10
    },
    parentElement: 'head',
    insertAsLastElement: false, // Add script to the bottom of parentElement; true by default
  })
  ```

## Usage

  - Global instance

  ```js
  Vue.scriptLoader.injectScript('<script></script>')
  Vue.scriptLoader.injectScript('<script></script>', {
      parentElement: 'body',
      insertAsLastElement: 'false'
  })
  ```

## License
  MIT Licensed | Copyright © 2021-present s.rubio131