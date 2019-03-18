# react-modern-sticky

> Lightweight sticky component for the modern web.

[![NPM](https://img.shields.io/npm/v/react-modern-sticky.svg)](https://www.npmjs.com/package/react-modern-sticky)
[![CircleCI](https://circleci.com/gh/papermana/react-modern-sticky.svg?style=svg)](https://circleci.com/gh/papermana/react-modern-sticky)

Traditionally, making headers sticky was achieved by watching scroll events. This creates some performance problems. Thankfully, there is now a native way of doing this in CSS: `position: sticky;`. However, there's no way to tell when an element switches between "stuck" and "unstuck" modes.

`react-modern-sticky` is a simple component that uses `position: sticky` and, additionally, watches for when the sticky mode changes. It does so by utilizing the `IntersectionObserver` API for maximum performance.

- [Browser support](#browser-support)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Offset](#offset)
  - [Callback](#callback)
- [Thanks](#thanks)
- [License](#license)

## Browser support

At the time of writing this, [support for `position: sticky;`](https://caniuse.com/#feat=css-sticky) is fairly good.

However, `IntersectionObserver` is still a somewhat recent addition and is not supported by every browser; notably, by Safari 12.

It is recommended to use the polyfill [`intersection-observer`](https://www.npmjs.com/package/intersection-observer) for now. It's enough to just add it to your `package.json` and then put the following somewhere in the code (like in `index.js`):

```js
import "intersection-observer";
```

## Installation

```bash
npm install --save react-modern-sticky
# or
yarn add react-modern-sticky
```

Note that `react-modern-sticky` requires at least React version 16.8.

## Usage

### Basic usage

The most basic usage is to just wrap your content in `Sticky`.

```jsx
import React from "react";
import Sticky from "react-modern-sticky";

const Example = () => <Sticky>My sticky content.</Sticky>;
```

`Sticky` renders a `div`, and it will accept any usual `div` props, including `className`. You can additionally pass `stuckClassName`, which will be added whenever the element sticks to the top of the screen.

```jsx
const Example = () => (
  <Sticky className="header" stuckClassName="header--stuck">
    Header
  </Sticky>
);
```

If you need more control, you can pass a render function as a child instead. This function will be called with the `isStuck` argument.

```jsx
const Example = () => (
  <Sticky>
    {({ isStuck }) => (isStuck ? "I'm stuck!" : "Waiting for a scroll...")}
  </Sticky>
);
```

### Offset

You can set a vertical offset for the `Sticky` element if you need it to not be stuck at the very top of the screen. A common use case for this would be if you have a fixed header, and want your sticky sub-header to appear below it.

You can do this simply by passing a prop:

```jsx
const Example = () => (
  <Sticky offset={50}>
    I'll be offset 50px from the top of the screen when I'm stuck.
  </Sticky>
);
```

Alternatively, if you want to keep all your styles in CSS, you can just apply the `top` property to the element. This may require the use of `!important` to override the default style for `Sticky`, depending on whether your CSS or libraries' CSS gets loaded first.

```css
.sticky {
  top: 50px !important;
}
```

```jsx
const Example = () => (
  <Sticky className="sticky">
    I'll be offset 50px from the top of the screen when I'm stuck.
  </Sticky>
);
```

### Callback

You can optionally add an `onStuck` callback. `Sticky` is not a controlled element, and in most situations you will not need this. However, sometimes you may want a component to know about the "stuck" state of one of its descendants.

The function passed to `onStuck` will be called with true or false depending on whether the element is currently stuck.

```jsx
const Example = () => {
  const [isStuck, setIsStuck] = useState(false);

  return (
    <>
      {isStuck ? "It's stuck." : "It's not stuck."}
      <Sticky onStuck={setIsStuck}>Some content.</Sticky>
    </>
  );
};
```

## Thanks

Eric Bidelman, author of [this article](https://developers.google.com/web/updates/2017/09/sticky-headers), for inspiring this package.

## License

MIT © [papermana](https://github.com/papermana)
