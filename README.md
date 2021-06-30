<br>
<br>
<br>

## Introduction

**Vue Script Loader** is a library to inject external scripts dynamicatly on youtr Vue projects

## Install

  ``` bash
  npm install vue-dom-injector --save
  ```
  or
  ``` bash
  yarn add vue-dom-injector
  ```

## Install

  ``` js
  import VueDOMInjector from 'vue-dom-injector'

  Vue.use(VueDOMInjector)
  // Or you can specify any other options
  Vue.use(VueDOMInjector, {
    name: 'myDOMInjector'
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