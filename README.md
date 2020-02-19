<p align="center">
  <img src="https://i.imgur.com/zgS1EBe.png" height="150" alt="eqio logo" />
  <div align="center">
    <a href="https://travis-ci.org/stowball/eqio">
      <img src="https://img.shields.io/travis/stowball/eqio/master.png?style=flat-square" alt="Travis build status" />
    </a>
    <a href="https://www.npmjs.org/package/eqio">
      <img src="https://img.shields.io/npm/v/eqio.png?style=flat-square" alt="npm package" />
    </a>
  </div>
</p>

# eqio

**A simple, tiny alternative to element/container queries**

eqio allows you to attain the holy grail of responsive web development/design systems: components that can adapt their styling based on *their* width, not the browser‘s.

It uses [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)s under-the-hood (so is [well supported](https://caniuse.com/#feat=intersectionobserver) in “good” browsers and [easily polyfilled](https://github.com/w3c/IntersectionObserver) in others) to apply appropriately named classes to the component when necessary.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
  - [npm](#npm)
  - [Direct `<script>` include](#direct-script-include)
- [Usage](#usage)
  - [The HTML](#the-html)
  - [The CSS](#the-css)
  - [The JavaScript](#the-javascript)

## Demo

A complete demo is available here: **https://codepen.io/stowball/pen/zPYzWd**

## Installation

### npm

```sh
npm install eqio --save
```

### Direct `<script>` include

```html
<script src="https://unpkg.com/eqio/umd/eqio.min.js"></script>
```

## Usage

### The HTML

1. Add a class of `eqio` to the element.
2. Add a `data-eqio-sizes` attribute whose value is a JSON-serializable array of sizes.
3. Optionally add a `data-eqio-prefix` attribute whose value is used as the prefix for your class names.

```html
<div
  class="media-object eqio"
  data-eqio-sizes='["<400", ">700"]'
  data-eqio-prefix="media-object"
>
  …
</div>
```

The above component will:

* be able to be customised when *its* width is 400 or smaller (`"<"` is a synonym for `max-width`, not “less than”).
* be able to be customised when *its* width is 700 or greater (`">"` is a synonym for `min-width`, not “greater than”).
* apply the following classes `media-object-eqio-<400` and `media-object-eqio->700` as appropriate. If `data-eqio-prefix` had not been specified, the applied classes would be `eqio-<400` and `eqio->700`.

*Note: Multiple classes can be applied at once.*

### The CSS

In your CSS, write class names that match those applied to the HTML.

```scss
.media-object-eqio-\<400 {
  /* customizations when less than or equal to 400px */
}

.media-object-eqio-\>700 {
  /* customizations when greater than or equal to 700px */
}
```

*Note:*
* *eqio classes include the special characters `<` & `>`, so they must be escaped with a `\` in your CSS.*
* *eqio elements are `position: relative` by default, but your component can override that to `absolute`/`fixed` etc as required.*
* *eqio elements can't be anything but `overflow: visible`.*
* *To prevent accidental creation of horizontal scrollbars, a parent element is required to `overflow-x: hidden`. It is recommended to apply this to `body`.*

### The JavaScript

If using a module bundler, such as webpack, first import `Eqio`.

```js
import Eqio from 'eqio';
```

In your JS, tell eqio which elements are to be made responsive by passing a DOM reference to `Eqio`.

```js
var mediaObject = new Eqio(document.querySelector('.media-object'));
```

Should you need to stop this element from being responsive, you can call `.stop()` on your instance:

```js
mediaObject.stop();
```

This will remove all observers and eqio internals, except for the class names that were applied at the time.

---

Copyright (c) 2018 [Matt Stow](http://mattstow.com)  
Licensed under the MIT license *(see [LICENSE](https://github.com/stowball/eqio/blob/master/LICENSE) for details)*
