import Tween from './tween'

export type AnimationType = 'linear' |
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

function getAnimation (animationFunc: AnimationType): any {
  if (animationFunc === 'linear') {
    return Tween.Linear
  }
  if (animationFunc.startsWith('easeInOut')) {
    // @ts-ignore
    return Tween[animationFunc.slice(9)].easeInOut
  }
  if (animationFunc.startsWith('easeIn')) {
    // @ts-ignore
    return Tween[animationFunc.slice(6)].easeIn
  }
  if (animationFunc.startsWith('easeOut')) {
    // @ts-ignore
    return Tween[animationFunc.slice(7)].easeOut
  }
  // tslint:disable-next-line: no-console
  console.error('Error animation function name. Will use default `linear` function.')
  return Tween.Linear
}

function animateScroll (node: any, destScrollTop: number, { spendTime, animationFunc }: any) {
  const current = node.scrollTop
  let step = 0
  const totalStep = 60 * spendTime / 1000
  const animation = getAnimation(animationFunc)

  function func () {
    step++
    const now = animation(step, current, destScrollTop - current, totalStep)
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
