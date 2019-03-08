import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'

import { animateScroll } from './utils'

interface Options {
  /**
   * Animation duration. (ms)
   * default 600
   */
  spendTime?: number
}

function animate (Cpt: typeof React.Component, options: Options = {}) {
  return class T extends PureComponent<any & { scrollTop: number }> {
    refContainer: null | Element | Text = null
    state = {}
    constructor (props: any) {
      super(props)
    }
    componentDidUpdate (prevProps: any) {
      const { scrollTop } = this.props
      const { scrollTop: prevScrollTop } = prevProps
      if (scrollTop !== prevScrollTop) {
        if (this.refContainer) {
          animateScroll(this.refContainer, scrollTop, options.spendTime || 600)
        }
      }
    }
    componentDidMount () {
      this.refContainer = findDOMNode(this)
    }
    componentWillUnmount () {
      this.refContainer = null
    }
    render () {
      const { scrollTop, ...rest } = this.props
      return (
        <Cpt
          {...rest}
        />
      )
    }
  }
}

export default animate
