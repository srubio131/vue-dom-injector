
<br>
<br>
<br>

## Introduction

**Vue DOM Injector** is a library to inject external scripts dynamicatly on youtr Vue projects

## Demo
<a href="https://vue-dom-injector.stackblitz.io" target="_blank">https://vue-dom-injector.stackblitz.io</a>

## Install

  ``` bash
  npm install vue-dom-injector --save
  ```
  or
  ``` bash
  yarn add vue-dom-injector
  ```

## Add as a plugin to Vue

  ``` js
  import VueDOMInjector from 'vue-dom-injector'

  Vue.use(VueDOMInjector)
  // Or you can specify any other name
  Vue.use(VueDOMInjector, {
    name: 'myDOMInjector'
  })
  ```

## Usage

  - Inject Node

  ```js
  this.$domInjector.injectNode('<script></script>')
  this.$domInjector.injectNode('<script></script>', {
      parentElement: 'body',        // 'head' by default
      insertAsLastElement: 'false'  // 'true' by default
      extraAttrs: {                 // {}     by default
        id: 'myScript'
        async: true
      }
  })
  ```

   ```js
  this.$domInjector.injectNode(`
    <style>
      h1 {
        color: red;
      }
    </style>
  `)
  ```

  - Remove Node

  You can use any <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors" target="_blank">css selectors</a>

  ```js
  this.$domInjector.removeNode('#myScript')
  this.$domInjector.removeNode('input[type="text"]')
  ```

## License
  MIT Licensed | Copyright © 2021-present srubio131