# @minax/animate-scroll &middot; [![npm](https://img.shields.io/npm/v/@minax/animate-scroll.svg)](https://www.npmjs.com/package/@minax/animate-scroll)
Let the elements have an animated scroll in the React project.

## Install
`
npm i --save @minax/animate-scroll
`

# Quick Overview
``` jsx
import React, { Component } from 'react';
import animate from '@minax/animate-scroll'

const List = ({ connect }) => (
  <div
    style={{
      height: 400,
      margin: 24,
      overflow: 'auto',
      textAlign: 'center',
      border: '1px solid #000'
    }}
    ref={(el) => connect(el)}
  >
    {
      new Array(40).fill(1).map((i, index) => (
        <div key={index} style={{ fontSize: 40 }}>{index}</div>
      ))
    }
  </div>
)

const Alist = animate(List, { spendTime: 1000 })

class App extends Component {
  state = {
    scrollTop: 0
  }
  componentDidMount () {
    setInterval(() => {
      this.setState({
        scrollTop: Math.random() * 1400
      })
    }, 1500)
  }
  render() {
    return (
      <Alist scrollTop={this.state.scrollTop} />
    );
  }
}
```

<p align="center">
  <img src="./docs/images/1.gif" style="border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, .2)" />
</p>

