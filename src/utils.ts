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

function animateScroll<T extends number | number[]> (
  start: T,
  end: T,
  callback: (now: T) => any,
  options?: { spendTime?: number, animationFunc?: AnimationType }
  ) {
  if (!options) {
    options = { spendTime: 600, animationFunc: 'linear' }
  }
  if (!options.spendTime) {
    options.spendTime = 600
  }
  if (!options.animationFunc) {
    options.animationFunc = 'linear'
  }
  const { spendTime, animationFunc } = options
  let step = 0
  const totalStep = 60 * spendTime / 1000
  const animation = getAnimation(animationFunc)

  function func () {
    step++
    let now = 0 as T
    if (typeof start === 'number' && typeof end === 'number') {
      now = animation(step, start, end - start, totalStep)
    }
    if (Array.isArray(start) && Array.isArray(end)) {
      if (start.length !== end.length) {
        throw new SyntaxError('起始数组长度需和终止数组长度一致！')
      } else {
        now = start.map((item, index) => animation(step, start[index], end[index] - start[index], totalStep)) as T
      }
    }
    callback(now)
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
