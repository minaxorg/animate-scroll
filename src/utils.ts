const Tween = {
  Quad: {
    easeInOut (t: number, b: number, c: number, d: number) {
      // tslint:disable-next-line: no-conditional-assignment
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    }
  }
}

function animateScroll (node: any, destScrollTop: number, spendTime: number) {
  const current = node.scrollTop
  let step = 0
  const totalStep = 60 * spendTime / 1000
  function func () {
    step++
    const now = Tween.Quad.easeInOut(step, current, destScrollTop - current, totalStep)
    node.scrollTop = now
    if (step < totalStep) {
      window.requestAnimationFrame(func)
    }
  }
  window.requestAnimationFrame(func)
}

export {
  Tween,
  animateScroll
}
