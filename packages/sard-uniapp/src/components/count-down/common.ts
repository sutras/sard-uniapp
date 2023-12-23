import { defaultConfig } from '../config'

export interface CountDownProps {
  time?: number
  autoStart?: boolean
  format?: string
  millisecond?: boolean
}

// const props = withDefaults(defineProps<CountDownProps>(), {
//   time: 0,
//   autoStart: true,
//   format: 'HH:mm:ss',
// })

export const countDownProps = {
  time: {
    type: Number,
    default: defaultConfig.countDown.time,
  },
  autoStart: {
    type: Boolean,
    default: defaultConfig.countDown.autoStart,
  },
  format: {
    type: String,
    default: defaultConfig.countDown.format,
  },
  millisecond: Boolean,
}

export interface CountDownSlots {
  default(props: { time: CountDownCurrentTime }): any
}

export interface CountDownEmits {
  (e: 'change', time: CountDownCurrentTime): void
  (e: 'finish'): void
}

export interface CountDownExpose {
  start: () => void
  pause: () => void
  reset: () => void
}

export interface CountDownCurrentTime {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  total: number
}

export function getCurrentTime(remainTime: number): CountDownCurrentTime {
  return {
    milliseconds: remainTime % 1000,
    seconds: ~~(remainTime / 1000) % 60,
    minutes: ~~(remainTime / 1000 / 60) % 60,
    hours: ~~(remainTime / 1000 / 60 / 60) % 60,
    days: ~~(remainTime / 1000 / 60 / 60 / 24),
    total: remainTime,
  }
}

function padZero(n: number, length = 2) {
  return String(n).padStart(length, '0')
}

export function formatTime(format: string, currentTime: CountDownCurrentTime) {
  return format
    .replace(/DD/g, padZero(currentTime.days))
    .replace(/HH/g, padZero(currentTime.hours))
    .replace(/mm/g, padZero(currentTime.minutes))
    .replace(/ss/g, padZero(currentTime.seconds))
    .replace(/s/g, String(currentTime.seconds))
    .replace(/SSS/g, padZero(currentTime.milliseconds, 3))
    .replace(/SS/g, padZero(currentTime.milliseconds, 3).slice(0, 2))
    .replace(/S/g, padZero(currentTime.milliseconds, 3).slice(0, 1))
}
