/* lwa 0.2.3 | MIT license | https://github.com/sutras/lwa */
var __defProp = Object.defineProperty
var __pow = Math.pow
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value)
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
function getAnimationFrameController() {
  if (typeof requestAnimationFrame === 'function') {
    return {
      request: requestAnimationFrame,
      cancel: cancelAnimationFrame,
    }
  }
  const fps = 60
  const callbacks = []
  let id2 = 1
  let cursor = 0
  let timer
  function playAll() {
    timer = void 0
    const cloned = callbacks.slice()
    cursor += callbacks.length
    callbacks.length = 0
    cloned.forEach((callback) => {
      if (callback !== 0) {
        callback(Date.now())
      }
    })
  }
  return {
    request(handler) {
      callbacks.push(handler)
      if (!timer) {
        timer = setTimeout(playAll, 1e3 / fps)
      }
      return id2++
    },
    cancel(id22) {
      callbacks[id22 - cursor] = 0
    },
  }
}
const { request, cancel } = getAnimationFrameController()
const ticks = /* @__PURE__ */ new Set()
let id = 0
let paused = true
function add(tick) {
  ticks.add(tick)
  run()
}
function remove(tick) {
  ticks.delete(tick)
}
function step() {
  if (ticks.size === 0) {
    stop()
  } else {
    new Set(ticks).forEach((tick) => tick())
    id = request(step)
  }
}
function run() {
  if (paused) {
    paused = false
    id = request(step)
  }
}
function stop() {
  if (!paused) {
    paused = true
    cancel(id)
  }
}
const ticker = {
  add,
  remove,
}
const easings = {
  linear: () => (p) => p,
}
const easingStuff = {
  Sine: () => (p) => 1 - Math.cos((p * Math.PI) / 2),
  Expo: () => (p) => p ? Math.pow(1024, p - 1) : 0,
  Circ: () => (p) => 1 - Math.sqrt(1 - p * p),
  Elastic: () => (p) =>
    p === 0 || p === 1
      ? p
      : -Math.pow(2, 10 * p - 10) *
        Math.sin(((p * 10 - 10.75) * 2 * Math.PI) / 3),
  Back: () => (p) => {
    const s = 1.70158
    return p * p * ((s + 1) * p - s)
  },
  Bounce: () => (p) => {
    p = 1 - p
    const s = 7.5625
    const k = 2.75
    return (
      1 -
      (p < 1 / k
        ? s * p * p
        : p < 2 / k
        ? s * (p -= 1.5 / k) * p + 0.75
        : p < 2.5 / k
        ? s * (p -= 2.25 / k) * p + 0.9375
        : s * (p -= 2.625 / k) * p + 0.984375)
    )
  },
}
const powerNames = ['Quad', 'Cubic', 'Quart', 'Quint']
powerNames.forEach((name, i) => {
  easingStuff[name] = () => (p) => Math.pow(p, i + 2)
})
Object.keys(easingStuff).forEach((name) => {
  const easeIn = easingStuff[name]
  easings['easeIn' + name] = easeIn
  easings['easeOut' + name] = (a, b) => (p) => 1 - easeIn(a, b)(1 - p)
  easings['easeInOut' + name] = (a, b) => (p) =>
    p < 0.5 ? easeIn(a, b)(p * 2) / 2 : 1 - easeIn(a, b)(2 - 2 * p) / 2
})
const rNum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/
const rUnit =
  /%|px|rpx|em|rem|vw|vh|deg|rad|turn|ex|ch|vmin|vmax|pc|pt|in|cm|mm/
const rCssNumVal = new RegExp(
  '^([+\\-*/%]=|)(' + rNum.source + ')(' + rUnit.source + '|)$',
  'i',
)
const rTimelinePos = new RegExp('^([<>]|)([+-]=|)(' + rNum.source + '|)(%|)$')
function isNumber(target) {
  return typeof target === 'number'
}
function isString(target) {
  return typeof target === 'string'
}
function isObject(target) {
  return target !== null && typeof target === 'object'
}
function isFunction(target) {
  return typeof target === 'function'
}
function isArrayLike(target) {
  let l
  return (
    isObject(target) &&
    Number.isInteger((l = target.length)) &&
    l < __pow(2, 32)
  )
}
function isArray(target) {
  return Array.isArray(target)
}
function minmax(n, min, max) {
  return n < min ? min : n > max ? max : n
}
function toArray(target) {
  return Array.isArray(target) ? target : [target]
}
const defaultEasing = 'easeInOutQuad'
function getEasing(ease) {
  return isFunction(ease) ? ease : () => (easings[ease] || easings.linear)(0, 0)
}
function createEmitter() {
  const events = {}
  function on(type, callback) {
    let callbacks = events[type]
    if (!callbacks) {
      callbacks = events[type] = /* @__PURE__ */ new Set()
    }
    callbacks.add(callback)
  }
  function off(type, callback) {
    if (callback) {
      const callbacks = events[type]
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          delete events[type]
        }
      }
    } else {
      delete events[type]
    }
  }
  function once(type, callback) {
    on(type, function fn(...args) {
      callback(...args)
      off(type, fn)
    })
  }
  function emit(type, ...args) {
    const callbacks = events[type]
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args)
      })
    }
  }
  return {
    on,
    off,
    once,
    emit,
  }
}
const TERMINATE = Symbol()
class SpecialValue {}
class WithFromValue extends SpecialValue {
  constructor(from, to) {
    super()
    __publicField(this, 'from')
    __publicField(this, 'to')
    this.from = from
    this.to = to
  }
}
const plugins = []
function parseTarget(target) {
  const result = []
  if (!isArray(target)) {
    target = [target]
  }
  target.flat().forEach((item) => {
    if (item) {
      if (isString(item)) {
        result.push(...Array.from(document.querySelectorAll(item)))
      } else if (isArrayLike(item)) {
        result.push(...Array.from(item))
      } else if (isObject(item) || isFunction(item)) {
        result.push(item)
      }
    }
  })
  return Array.from(new Set(result))
}
function getFuncValue(value, animatedTarget) {
  return isFunction(value)
    ? value(animatedTarget.target, animatedTarget.index, animatedTarget.total)
    : value
}
function getTweenValue(position, tween) {
  const { duration, delay, begin, easing, between } = tween
  function getBetweenValue(between2) {
    const { from, to, round } = between2
    let value =
      position <= begin + delay
        ? from
        : position >= begin + delay + duration
        ? to
        : from + easing((position - begin - delay) / duration) * (to - from)
    if (round) {
      value = Math.round(value * round) / round
    }
    return value
  }
  return between.map((item) => getBetweenValue(item))
}
function getAnimatedTargets(targets) {
  return targets.map((target, i) => ({
    target,
    index: i,
    total: targets.length,
  }))
}
function structureValue(value, animatedTarget) {
  value = getFuncValue(value, animatedTarget)
  if (isArray(value)) {
    return value.map((value2) => structureValue(value2, animatedTarget)[0])
  }
  if (isNumber(value) || isString(value) || value instanceof SpecialValue) {
    value = { value }
  }
  return [value]
}
function normalizeTweens(
  animatedTarget,
  objectValues,
  prop,
  options,
  beginTime,
  animationProperties,
  averageDuration,
) {
  const l = objectValues.length
  let endTime = beginTime || 0
  let prevTween
  averageDuration =
    (averageDuration != null ? averageDuration : options.duration) / l
  function normalizeTween(objectValue, index, prevTween2) {
    var _a, _b, _c, _d, _e, _f, _g
    const duration = getFuncValue(
      (_a = objectValue.duration) != null ? _a : averageDuration,
      animatedTarget,
    )
    const delay = getFuncValue(
      (_b = objectValue.delay) != null ? _b : index === 0 ? options.delay : 0,
      animatedTarget,
    )
    const endDelay = getFuncValue(
      (_c = objectValue.endDelay) != null
        ? _c
        : index === l - 1
        ? options.endDelay
        : 0,
      animatedTarget,
    )
    const easing = getFuncValue(
      getEasing((_d = objectValue.easing) != null ? _d : options.easing),
      animatedTarget,
    )
    const round = getFuncValue(
      (_e = objectValue.round) != null ? _e : options.round,
      animatedTarget,
    )
    const total = delay + duration + endDelay
    const begin = endTime
    const end = begin + total
    endTime += total
    if (!prevTween2) {
      let values
      prevTween2 = (values = animationProperties[prop])
        ? values[values.length - 1]
        : void 0
    }
    const value = objectValue.value
    let to
    let from
    const withFromValue = value instanceof WithFromValue
    if (withFromValue) {
      from = getFuncValue(value.from, animatedTarget)
      to = getFuncValue(value.to, animatedTarget)
    } else {
      to = value
    }
    if (!withFromValue && prevTween2) {
      from = prevTween2.to
    }
    let withoutFrom = false
    if (from === void 0) {
      from = animatedTarget.target[prop]
      withoutFrom = true
    }
    let operator = ''
    let unit = ''
    if (isString(to)) {
      const parts = rCssNumVal.exec(to)
      if (parts) {
        operator = parts[1]
        to = parseFloat(parts[2]) || 0
        unit = parts[3]
      }
    }
    const tween = {
      animatedTarget,
      prop,
      duration,
      delay,
      endDelay,
      begin,
      end,
      easing,
      data: {},
      from,
      to,
      withoutFrom,
      round,
      unit,
      operator,
      between: [],
    }
    for (let i = 0, l2 = plugins.length; i < l2; i++) {
      const retValue =
        (_g = (_f = plugins[i]).init) == null
          ? void 0
          : _g.call(_f, tween, TERMINATE)
      if (retValue === TERMINATE) {
        break
      }
    }
    return tween
  }
  const tweens = objectValues
    .map(
      (objectValue, index) =>
        (prevTween = normalizeTween(objectValue, index, prevTween)),
    )
    .sort((a, b) => a.begin - b.begin)
  return {
    endTime,
    tweens,
  }
}
function getOneKeyframeTween(
  animatedTarget,
  properties,
  options,
  beginTime,
  animationProperties,
  averageDuration,
) {
  let props = {}
  for (let p in properties) {
    const value = properties[p]
    if (value !== null && value !== void 0) {
      props[p] = normalizeTweens(
        animatedTarget,
        structureValue(value, animatedTarget),
        p,
        options,
        beginTime,
        animationProperties,
        averageDuration,
      )
    }
  }
  return props
}
function getAnimationProperties(animatedTarget, keyframes, options) {
  const animationProperties = {}
  const averageDuration =
    getFuncValue(options.duration, animatedTarget) / keyframes.length
  let endTime = 0
  keyframes.forEach((properties) => {
    const oneKeyframeTween = getOneKeyframeTween(
      animatedTarget,
      properties,
      options,
      endTime,
      animationProperties,
      averageDuration,
    )
    for (let p in oneKeyframeTween) {
      endTime = Math.max(endTime, oneKeyframeTween[p].endTime)
      animationProperties[p] = (animationProperties[p] || []).concat(
        oneKeyframeTween[p].tweens,
      )
    }
  })
  return animationProperties
}
function createAnimation$1(tweens) {
  function seek(position) {
    var _a, _b
    let currTween
    for (let i = 0, tween; (tween = tweens[i++]); ) {
      if (tween.begin <= position && tween.end >= position) {
        currTween = tween
        break
      }
      if (position > tween.end) {
        if (!tweens[i + 1] || tweens[i + 1].begin > position) {
          currTween = tween
        }
      }
    }
    if (currTween) {
      let value = getTweenValue(position, currTween)
      let currentValue
      for (let i = plugins.length - 1; i >= 0; i--) {
        currentValue =
          (_b = (_a = plugins[i]).update) == null
            ? void 0
            : _b.call(_a, currTween, value, TERMINATE)
        if (currentValue === TERMINATE) {
          return
        }
        if (currentValue !== void 0) {
          value = currentValue
        }
      }
    }
  }
  function getDuration() {
    return Math.max(...tweens.map((tween) => tween.end))
  }
  return {
    seek,
    getDuration,
    tweens,
  }
}
function getAnimations(animationTargets, keyframes, options) {
  return animationTargets
    .map((animatedTarget) => {
      const animationProperties = getAnimationProperties(
        animatedTarget,
        keyframes,
        options,
      )
      return Object.keys(animationProperties).map((p) =>
        createAnimation$1(animationProperties[p]),
      )
    })
    .flat()
}
const defaultTweenOptions = {
  duration: 500,
  delay: 0,
  endDelay: 0,
  easing: defaultEasing,
  round: 0,
}
function createAnimations(target, keyframes, options) {
  const tweenOptions = Object.assign({}, defaultTweenOptions, options)
  return getAnimations(
    getAnimatedTargets(parseTarget(target)),
    isArray(keyframes) ? keyframes : [keyframes],
    tweenOptions,
  )
}
function withFrom(from, to) {
  return new WithFromValue(from, to)
}
function use(plugin) {
  toArray(plugin).forEach((plugin2) => {
    if (!plugins.includes(plugin2)) {
      plugins.push(plugin2)
      plugins.sort((a, b) => b.order - a.order)
    }
  })
}
const DIRECTION_ALTERNATE_REVERSE = 'alternate-reverse'
const DIRECTION_REVERSE = 'reverse'
const DIRECTION_ALTERNATE = 'alternate'
function isReverse(direction) {
  return (
    direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE
  )
}
function isAlternate(direction) {
  return (
    direction === DIRECTION_ALTERNATE ||
    direction === DIRECTION_ALTERNATE_REVERSE
  )
}
function isTimelineEventTarget(target) {
  return isObject(target) && 'getDuration' in target && 'seek' in target
}
const defaultTimelineOptions = {
  externalTicker: false,
  autoplay: true,
  direction: 'normal',
  loop: 1,
}
const callbackNames = [
  'begin',
  'loopBegin',
  'complete',
  'loopComplete',
  'pause',
  'play',
  'update',
]
function createTimeline(options) {
  const mergedOptions = Object.assign({}, defaultTimelineOptions, options)
  const { externalTicker, autoplay, direction, loop } = mergedOptions
  let firstTime = false
  let paused2 = true
  let prevTickTime = 0
  let position = 0
  let currentLoop = loop
  let reverse = isReverse(direction)
  let duration = 0
  let events = []
  const emitter = createEmitter()
  callbackNames.forEach((name) => {
    if (mergedOptions[name]) {
      emitter.on(name, mergedOptions[name])
    }
  })
  function isCompleted() {
    return currentLoop === 0 && position === duration
  }
  function seek(nextPosition) {
    let finished = false
    if (nextPosition >= duration) {
      nextPosition = duration
      finished = true
    } else if (nextPosition < 0) {
      nextPosition = 0
    }
    position = nextPosition
    const seekPosition = reverse ? duration - position : position
    events.forEach(({ target, begin }) => {
      target.seek(seekPosition - begin)
    })
    emitter.emit(
      'update',
      seekPosition,
      duration === 0 ? 0 : position / duration,
    )
    if (finished) {
      emitter.emit('loopComplete')
      if (--currentLoop < 0) {
        currentLoop = 0
      }
      if (currentLoop === 0) {
        pause()
        emitter.emit('complete')
      } else {
        if (!paused2) {
          if (isAlternate(direction)) {
            reverse = !reverse
          }
          start()
        }
      }
    }
  }
  function progress(p) {
    seek(minmax(p, 0, 1) * duration)
  }
  function tick() {
    if (!paused2) {
      let currTime = Date.now()
      seek(currTime - prevTickTime + position)
      prevTickTime = currTime
    }
  }
  function start() {
    if (!firstTime) {
      firstTime = true
      emitter.emit('begin')
    } else {
      position = 0
    }
    emitter.emit('loopBegin')
    play()
  }
  function play() {
    if (!firstTime) {
      start()
    } else {
      if (paused2) {
        paused2 = false
        if (isCompleted()) {
          if (isAlternate(direction)) {
            reverse = !reverse
          }
          restart()
        } else {
          prevTickTime = Date.now()
          if (!externalTicker) {
            ticker.add(tick)
          }
          emitter.emit('play')
        }
      }
    }
  }
  function pause() {
    if (!paused2) {
      paused2 = true
      if (!externalTicker) {
        ticker.remove(tick)
      }
      emitter.emit('pause')
    }
  }
  function restart() {
    pause()
    position = 0
    firstTime = false
    currentLoop = loop
    reverse = isReverse(direction)
    play()
  }
  function finish() {
    if (!isCompleted()) {
      seek(duration)
    }
  }
  function add2(target, positionOrKeyframes, optionsOrPosition, position2) {
    if (isTimelineEventTarget(target)) {
      position2 = positionOrKeyframes != null ? positionOrKeyframes : '>'
      let begin = duration
      if (isNumber(position2)) {
        begin = position2
      } else {
        const { begin: prevBegin, end: prevEnd } = events[
          events.length - 1
        ] || {
          begin: 0,
          end: 0,
        }
        const prevDuration = prevEnd - prevBegin
        const [, bracket, relative, num, unit] = rTimelinePos.exec(
          position2,
        ) || [, '>', '', '', '']
        begin = bracket === '<' ? prevBegin : bracket === '>' ? prevEnd : begin
        let value = +num
        if (unit === '%') {
          value = ((bracket ? prevDuration : duration) / 100) * +num
        }
        begin += relative === '-=' ? -value : value
      }
      begin = Math.max(0, begin)
      const end = begin + target.getDuration()
      events.push({ target, position: position2, begin, end })
      duration = Math.max(duration, end)
    } else {
      if (isNumber(optionsOrPosition) || isString(optionsOrPosition)) {
        position2 = optionsOrPosition
        optionsOrPosition = void 0
      }
      const animations = createAnimations(
        target,
        positionOrKeyframes,
        optionsOrPosition,
      )
      animations.forEach((animation, index) => {
        add2(animation, index === 0 ? position2 : '<')
      })
    }
    return timeline
  }
  function remove2(target) {
    const index = events.findIndex((e) => e.target === target)
    if (index !== -1) {
      events.splice(index, 1)
      update()
    }
  }
  function update() {
    const oldEvents = [...events]
    events = []
    duration = 0
    oldEvents.forEach((event) => {
      add2(event.target, event.position)
    })
  }
  function clear() {
    pause()
    duration = 0
    events = []
  }
  if (autoplay && loop !== 0) {
    start()
  }
  const timeline = {
    play,
    pause,
    finish,
    restart,
    seek,
    progress,
    tick: () => {
      if (externalTicker) {
        tick()
      }
    },
    getPosition() {
      return position
    },
    getDuration() {
      return duration
    },
    getProgress() {
      return duration === 0 ? 0 : position / duration
    },
    isReverse() {
      return reverse
    },
    add: add2,
    remove: remove2,
    clear,
    events,
    on: emitter.on,
    off: emitter.off,
    once: emitter.once,
  }
  return timeline
}
function definePlugin(plugin) {
  return plugin
}
const updatePlugin = definePlugin({
  order: 100,
  update(tween, value, terminate) {
    const { animatedTarget, prop, unit } = tween
    let val = isArray(value) ? value[0] : value
    if (unit) {
      val += unit
    }
    animatedTarget.target[prop] = val
    return terminate
  },
})
const initPlugin = definePlugin({
  order: 0,
  init(tween, terminate) {
    if (tween.between.length === 0) {
      const to = toArray(tween.to)
      const from = toArray(tween.from)
      tween.between = to.map((value, i) => ({
        from: +from[i] || 0,
        to: +value || 0,
        round: tween.round,
      }))
      return terminate
    }
  },
})
use(updatePlugin)
use(initPlugin)
function createAnimation(target, keyframes, options) {
  return createTimeline(options).add(target, keyframes, options)
}
export { createAnimation, createTimeline, easings, ticker, withFrom }
