<p align="center">
  <img alt="DOM Injector Logo" width="100" height="100" src="https://i.ibb.co/tCvZccx/Dom-injector-logo.png">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-dom-injector">
    <img src="https://img.shields.io/npm/dt/vue-dom-injector.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-dom-injector">
    <img src="https://img.shields.io/npm/dm/vue-dom-injector.svg" alt="Downloads">
  </a>
  <br>
  <a href="https://github.com/srubio131/vue-dom-injector/actions?query=workflow%3ACI">
    <img src="https://github.com/srubio131/vue-dom-injector/workflows/CI/badge.svg?branch=main&event=push" alt="CI badge">
  </a>
  <a href="https://codecov.io/gh/srubio131/vue-dom-injector">
    <img src="https://img.shields.io/codecov/c/github/srubio131/vue-dom-injector.svg" alt="Coverage">
  </a>
  
  <a href="https://github.com/srubio131/vue-dom-injector/blob/main/LICENSE.md">
    <img src="https://img.shields.io/npm/l/vue-dom-injector.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/vue-dom-injector">
    <img src="https://img.shields.io/npm/v/vue-dom-injector.svg" alt="Version">
  </a>
</p>

<br>
<br>

## Introduction

**Vue DOM Injector** is a library to inject and remove HTML tags (script, style, etc) into DOM on your Vue projects.

Useful for injecting third party scripts such as **Google Tag Manager**, **Google Analytics**, **Clarity**, **Linkedin insights**, etc. when the user has accepted the cookie policies and to comply with the data protection law and remove them when user disable the cookie policies.

Or simply add a new HTML tag in the DOM of our Vue application.

> **Warning**: If a **\<script>** is inserted, the javascript code inside it will be executed. **_Inject only scripts that you trust because they will be executed and could contain malicious code_**

## Demo
<a href="https://vue-dom-injector.stackblitz.io" target="__blank">https://vue-dom-injector.stackblitz.io</a>

You can see the demo code
<a href="https://stackblitz.com/edit/vue-dom-injector?file=src/App.vue" target="__blank">here</a>

## Install

  ``` bash
  npm install vue-dom-injector --save
  ```
  or
  ``` bash
  yarn add vue-dom-injector
  ```

## Add as a plugin to Vue
You can add VueDOMInjector inside main.js file or as a standalone plugin in your /plugins folder

  ``` js
  import VueDOMInjector from 'vue-dom-injector'

  Vue.use(VueDOMInjector)
  // Or you can specify any other name
  Vue.use(VueDOMInjector, {
    name: 'myDOMInjector'   // Then you can use like: this.$myDOMInjector...
  })
  ```

## Usage

  > WARNING! Be careful when adding the script in string format, to ensure it works well remember to escape the closing "/" tags and using back-ticks **(`)**. For example: **<\\/script>** instance of **<\script>**

  ### Inject Script Node

  ```js
  this.$domInjector.injectNode(`<script>window.alert("Hi! Injected code alert")<\/script>`)
  this.$domInjector.injectNode(`<script>window.alert("Hi! Injected code alert")<\/script>`, {
      parentTag: 'body',        // 'head' by default
      insertAsLastTag: 'false', // 'true' by default
      extraAttrs: {             // {}     by default
        id: 'myScript',
        async: true
      }
  })
  ```

  ### Inject Script Node (A bit more complex with Google Analytics)

  ```js
 const ANALYTICS_SCRIPT_ONE = `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"><\/script>
 `;
  const ANALYTICS_SCRIPT_SECOND = `
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-123456789-1');
    <\/script>
  `;

  this.$domInjector.injectNode(ANALYTICS_SCRIPT_ONE, {
    parentTag: 'head',
    insertAsLastTag: true,
    extraAttrs: {
      id: 'myAnalyticsScript',
      type: 'text/javascript'
    }
  }).then(() => alert('Injected first analytics script!'));
  
  this.$domInjector.injectNode(ANALYTICS_SCRIPT_SECOND, {
    parentTag: 'head',
    insertAsLastTag: true,
    extraAttrs: {
      id: 'myAnalyticsScript2',
      type: 'text/javascript'
    }
  }).then(() => alert('Injected second analytics script!'));
  ```

  ### Inject Style Node

  ```js
  this.$domInjector.injectNode(`
    <style>
      h1 {
        color: red;
      }
    </style>
  `)
  ```

  ### Remove Node

  You can use any <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors" target="__blank">css selectors</a>

  ```js
  this.$domInjector.removeNode('#myScript')
  this.$domInjector.removeNode('input[type="text"]')
  ```
## Props

| Method              | Prop                | Description                                                            | Type                                            | Default        |
| ------------------- | ------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- | -------------- |
| injectNode          | -                       | new tag in string format **_(required)_**                              | `string`                                        | -              |
|                     | parentTag           | name of the parent tag into which the new node will be injected        | `string`                                        | 'head'         |
|                     | insertAsLastTag     | if true, new node will be injected at the end, if false, will be first | `boolean`                                       | true           |
|                     | extraAtts           | object with any extra attrs (id, style, etc.)                          | `object`                                        | {}             |
| removeNode          | -                       | use your own formatter, such as moment.js **_(required)_**             | `string`                                        | -              |

## License
  MIT Licensed | Copyright © 2021-present srubio131