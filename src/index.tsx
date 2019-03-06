import React, { PureComponent } from 'react'

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
    refContainer: null | HTMLElement = null
    state = {}
    constructor (props: any) {
      super(props)
      this.connectContainer = this.connectContainer.bind(this)
    }
    connectContainer (el: HTMLElement) {
      this.refContainer = el
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
    render () {
      const { scrollTop, ...rest } = this.props
      return (
        <Cpt
          {...rest}
          connect={this.connectContainer}
        />
      )
    }
  }
}

export default animate
