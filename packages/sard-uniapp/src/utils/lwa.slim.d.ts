declare function add(tick: () => void): void

declare interface AnimatedTarget {
  target: object
  index: number
  total: number
}

declare type BaseValue = number | string

declare interface Between {
  from: number
  to: number
  round: number
}

export declare function createAnimation(
  target: string | unknown[] | object,
  keyframes: Properties | Properties[],
  options?: TweenOptions & TimelineOptions,
): {
  play: () => void
  pause: () => void
  finish: () => void
  restart: () => void
  seek: (nextPosition: number) => void
  progress: (p: number) => void
  tick: () => void
  getPosition(): number
  getDuration(): number
  getProgress(): number
  isReverse(): boolean
  add: {
    (
      target: string | unknown[] | object,
      keyframes: Properties | Properties[],
      options?: TweenOptions,
      position?: number | string,
    ): any
    (
      target: string | unknown[] | object,
      keyframes: Properties | Properties[],
      position?: number | string,
    ): any
    (target: TimelineEventTarget, position?: number | string): any
  }
  remove: (target: TimelineEventTarget) => void
  clear: () => void
  events: TimelineEvent[]
  on: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback: {
      begin: () => void
      loopBegin: () => void
      complete: () => void
      loopComplete: () => void
      pause: () => void
      play: () => void
      update: (position: number, progress: number) => void
    }[U],
  ) => void
  off: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback?:
      | {
          begin: () => void
          loopBegin: () => void
          complete: () => void
          loopComplete: () => void
          pause: () => void
          play: () => void
          update: (position: number, progress: number) => void
        }[U]
      | undefined,
  ) => void
  once: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback: {
      begin: () => void
      loopBegin: () => void
      complete: () => void
      loopComplete: () => void
      pause: () => void
      play: () => void
      update: (position: number, progress: number) => void
    }[U],
  ) => void
}

export declare function createTimeline(options?: TimelineOptions): {
  play: () => void
  pause: () => void
  finish: () => void
  restart: () => void
  seek: (nextPosition: number) => void
  progress: (p: number) => void
  tick: () => void
  getPosition(): number
  getDuration(): number
  getProgress(): number
  isReverse(): boolean
  add: {
    (
      target: string | unknown[] | object,
      keyframes: Properties | Properties[],
      options?: TweenOptions,
      position?: number | string,
    ): any
    (
      target: string | unknown[] | object,
      keyframes: Properties | Properties[],
      position?: number | string,
    ): any
    (target: TimelineEventTarget, position?: number | string): any
  }
  remove: (target: TimelineEventTarget) => void
  clear: () => void
  events: TimelineEvent[]
  on: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback: {
      begin: () => void
      loopBegin: () => void
      complete: () => void
      loopComplete: () => void
      pause: () => void
      play: () => void
      update: (position: number, progress: number) => void
    }[U],
  ) => void
  off: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback?:
      | {
          begin: () => void
          loopBegin: () => void
          complete: () => void
          loopComplete: () => void
          pause: () => void
          play: () => void
          update: (position: number, progress: number) => void
        }[U]
      | undefined,
  ) => void
  once: <
    U extends
      | 'pause'
      | 'play'
      | 'complete'
      | 'update'
      | 'begin'
      | 'loopBegin'
      | 'loopComplete',
  >(
    type: U,
    callback: {
      begin: () => void
      loopBegin: () => void
      complete: () => void
      loopComplete: () => void
      pause: () => void
      play: () => void
      update: (position: number, progress: number) => void
    }[U],
  ) => void
}

declare type Direction =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'

export declare type Easing =
  | keyof typeof easings
  | FunctionalValue<(k: number) => number>

export declare type Easings = {
  linear: (...args: any[]) => (p: number) => number
} & {
  [p in EasingStuffNames as `${'easeIn' | 'easeOut' | 'easeInOut'}${p}`]: (
    ...args: any[]
  ) => (p: number) => number
}

export declare const easings: Easings

declare type EasingStuffNames =
  | 'Quad'
  | 'Cubic'
  | 'Quart'
  | 'Quint'
  | 'Sine'
  | 'Expo'
  | 'Circ'
  | 'Elastic'
  | 'Back'
  | 'Bounce'

declare type FunctionalValue<T> = (
  target: object,
  index: number,
  total: number,
) => T

declare type MayFunctionValue<T> = T | FunctionalValue<T>

declare interface ObjectValue extends TweenOptions {
  value: BaseValue | SpecialValue
}

export declare interface Properties {
  [p: string]: Value
}

declare function remove(tick: () => void): void

declare type SingleValue = BaseValue | SpecialValue | ObjectValue

declare class SpecialValue {}

export declare const ticker: {
  add: typeof add
  remove: typeof remove
}

export declare type Timeline = ReturnType<typeof createTimeline>

declare interface TimelineCallbackOptions {
  begin?: () => void
  loopBegin?: () => void
  complete?: () => void
  loopComplete?: () => void
  pause?: () => void
  play?: () => void
  update?: (position: number, progress: number) => void
}

declare interface TimelineEvent {
  target: TimelineEventTarget
  position: number | string
  begin: number
  end: number
}

declare interface TimelineEventTarget {
  getDuration: () => number
  seek: (position: number) => void
  tweens?: Tween[]
  events?: TimelineEvent[]
}

export declare interface TimelineOptions extends TimelineCallbackOptions {
  externalTicker?: boolean
  autoplay?: boolean
  direction?: Direction
  loop?: number
}

declare interface Tween<T extends {} = {}, U = {}> {
  animatedTarget: AnimatedTarget & U
  prop: string
  duration: number
  delay: number
  endDelay: number
  begin: number
  end: number
  easing: (k: number) => number
  data: T
  from: unknown
  to: unknown
  withoutFrom: boolean
  round: number
  unit: string
  operator: string
  between: Between[]
}

export declare interface TweenOptions {
  duration?: number | FunctionalValue<number>
  delay?: number | FunctionalValue<number>
  endDelay?: number | FunctionalValue<number>
  easing?: Easing
  round?: number | FunctionalValue<number>
}

declare type Value = MayFunctionValue<SingleValue | SingleValue[]>

export declare function withFrom(
  from: MayFunctionValue<BaseValue>,
  to: MayFunctionValue<BaseValue>,
): WithFromValue

declare class WithFromValue extends SpecialValue {
  from: MayFunctionValue<BaseValue>
  to: MayFunctionValue<BaseValue>
  constructor(
    from: MayFunctionValue<BaseValue>,
    to: MayFunctionValue<BaseValue>,
  )
}

export {}
