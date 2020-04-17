# @minax/animate-scroll &middot; [![npm](https://img.shields.io/npm/v/@minax/animate-scroll.svg)](https://www.npmjs.com/package/@minax/animate-scroll)
Let the elements have an animated scroll in the React project.

## Install
``` shell
npm i --save @minax/animate-scroll
```

## Usage
```
import animate from '@minax/animate-scroll'
animate(start, end, callback[, options])
```
> options is an object composed of the following key

name|type|default|description
--|--|--|--
start|number\|number[]||animation start point(s)
end|number\|number[]||animation end point(s)
callback|function||callback with current value(s) when update
spendTime|number|600|animation duration(ms)
animationFunc|AnimationType|'linear'|animation function

### AnimationType
```
type AnimationType = 'linear' |
  'easeInSine' | 'easeOutSine' | 'easeInOutSine' |
  'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' |
  'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' |
  'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' |
  'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' |
  'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' |
  'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' |
  'easeInBack' | 'easeOutBack' | 'easeInOutBack' |
  'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' |
  'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce'
```

## Quick Overview

```js
import animate from '@minax/animate-scroll'

animate(0, 100, (value) => {})
animate([0, 0], [100, 200], (values) => {})
```

``` jsx
import React, { useEffect, useRef } from 'react';

import animate from '@minax/animate-scroll'

function App() {
  const r = useRef(null)
  useEffect(() => {
    setInterval(() => {
      if (r.current) {
        const { scrollTop, scrollHeight } = r.current
        animate(
          scrollTop,
          Math.random() * scrollHeight,
          (now) => {
            r.current.scrollTop = now
          },
          {
            spendTime: 1000
          }
        )
      }
    }, 1500);
  })
  return (
    <div
      ref={r}
      style={{
        height: 400,
        margin: 24,
        overflow: 'auto',
        textAlign: 'center',
        border: '1px solid #000'
      }}
    >
      {
        new Array(40).fill(1).map((i, index) => (
          <div key={index} style={{ fontSize: 40 }}>{index}</div>
        ))
      }
    </div>
  );
}
```

<p>
  <img src="./docs/images/1.gif" style="border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, .2)" />
</p>

