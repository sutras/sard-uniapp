import { clamp, round } from './number'

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hwb'

export interface HslaColor {
  h: number
  s: number
  l: number
  a: number
}

export interface HsvaColor {
  h: number
  s: number
  v: number
  a: number
}

const DEFAULT_COLOR: HslaColor = {
  h: 210,
  s: 100,
  l: 50,
  a: 1,
}

const normalizeHue = (value: number) => {
  if (value === 360) return value
  const normalized = value % 360
  return normalized < 0 ? normalized + 360 : normalized
}

const formatAlpha = (value: number) => {
  return round(clamp(value, 0, 1), 2)
    .toString()
    .replace(/\.0+$/, '')
}

const formatNumber = (value: number, precision = 0) => {
  return round(value, precision)
}

const toHex = (value: number) => {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')
}

const splitAlpha = (value: string) => {
  const [base, alpha] = value.split('/').map((item) => item.trim())
  return {
    base,
    alpha,
  }
}

const parseUnitValue = (
  value: string,
  { scale = 1, percentBase }: { scale?: number; percentBase?: number } = {},
) => {
  if (!value) {
    return NaN
  }

  if (value.endsWith('%')) {
    const numberValue = Number.parseFloat(value.slice(0, -1))
    if (Number.isNaN(numberValue)) {
      return NaN
    }
    return percentBase === undefined
      ? numberValue / 100
      : (numberValue / 100) * percentBase
  }

  const numberValue = Number.parseFloat(value)
  return Number.isNaN(numberValue) ? NaN : numberValue * scale
}

const parseHue = (value: string) => {
  if (value.endsWith('turn')) {
    return Number.parseFloat(value) * 360
  }
  if (value.endsWith('rad')) {
    return (Number.parseFloat(value) * 180) / Math.PI
  }
  if (value.endsWith('grad')) {
    return Number.parseFloat(value) * 0.9
  }
  return Number.parseFloat(value)
}

export function normalizeHsla(
  color: Partial<HslaColor> | undefined,
): HslaColor {
  return {
    h: normalizeHue(color?.h ?? DEFAULT_COLOR.h),
    s: clamp(color?.s ?? DEFAULT_COLOR.s, 0, 100),
    l: clamp(color?.l ?? DEFAULT_COLOR.l, 0, 100),
    a: clamp(color?.a ?? DEFAULT_COLOR.a, 0, 1),
  }
}

export function normalizeHsva(
  color: Partial<HsvaColor> | undefined,
): HsvaColor {
  return {
    h: normalizeHue(color?.h ?? DEFAULT_COLOR.h),
    s: clamp(color?.s ?? DEFAULT_COLOR.s, 0, 100),
    v: clamp(color?.v ?? 100, 0, 100),
    a: clamp(color?.a ?? DEFAULT_COLOR.a, 0, 1),
  }
}

export function hslToRgb(color: HslaColor) {
  const h = normalizeHue(color.h) / 360
  const s = clamp(color.s, 0, 100) / 100
  const l = clamp(color.l, 0, 100) / 100

  if (s === 0) {
    const gray = Math.round(l * 255)
    return { r: gray, g: gray, b: gray, a: color.a }
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let current = t
    if (current < 0) current += 1
    if (current > 1) current -= 1
    if (current < 1 / 6) return p + (q - p) * 6 * current
    if (current < 1 / 2) return q
    if (current < 2 / 3) return p + (q - p) * (2 / 3 - current) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  return {
    r: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, h) * 255),
    b: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    a: color.a,
  }
}

export function rgbToHsl(
  red: number,
  green: number,
  blue: number,
  alpha = 1,
): HslaColor {
  const r = clamp(red, 0, 255) / 255
  const g = clamp(green, 0, 255) / 255
  const b = clamp(blue, 0, 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const lightness = (max + min) / 2

  let hue = 0
  let saturation = 0

  if (delta !== 0) {
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    switch (max) {
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        hue = (b - r) / delta + 2
        break
      default:
        hue = (r - g) / delta + 4
        break
    }
    hue *= 60
  }

  return normalizeHsla({
    h: hue,
    s: saturation * 100,
    l: lightness * 100,
    a: alpha,
  })
}

export function hslToHsv(color: HslaColor): HsvaColor {
  const lightness = clamp(color.l, 0, 100) / 100
  const saturation = clamp(color.s, 0, 100) / 100
  const value = lightness + saturation * Math.min(lightness, 1 - lightness)
  const nextSaturation = value === 0 ? 0 : 2 * (1 - lightness / value)

  return normalizeHsva({
    h: color.h,
    s: nextSaturation * 100,
    v: value * 100,
    a: color.a,
  })
}

export function hsvToHsl(color: HsvaColor): HslaColor {
  const value = clamp(color.v, 0, 100) / 100
  const saturation = clamp(color.s, 0, 100) / 100
  const lightness = value * (1 - saturation / 2)
  const nextSaturation =
    lightness === 0 || lightness === 1
      ? 0
      : (value - lightness) / Math.min(lightness, 1 - lightness)

  return normalizeHsla({
    h: color.h,
    s: nextSaturation * 100,
    l: lightness * 100,
    a: color.a,
  })
}

export function hslToHwb(color: HslaColor) {
  const rgb = hslToRgb(color)
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  return {
    h: normalizeHue(color.h),
    w: round(Math.min(r, g, b) * 100),
    bk: round((1 - Math.max(r, g, b)) * 100),
    a: color.a,
  }
}

export function hwbToHsl(hue: number, white: number, black: number, alpha = 1) {
  let w = clamp(white, 0, 100) / 100
  let bk = clamp(black, 0, 100) / 100

  if (w + bk > 1) {
    const total = w + bk
    w /= total
    bk /= total
  }

  const pure = hslToRgb({ h: hue, s: 100, l: 50, a: alpha })
  const ratio = 1 - w - bk

  return rgbToHsl(
    ((pure.r / 255) * ratio + w) * 255,
    ((pure.g / 255) * ratio + w) * 255,
    ((pure.b / 255) * ratio + w) * 255,
    alpha,
  )
}

function parseHex(value: string) {
  const raw = value.trim().replace('#', '')
  if (![3, 4, 6, 8].includes(raw.length) || !/^[\da-f]+$/i.test(raw)) {
    return null
  }

  const expanded =
    raw.length <= 4
      ? raw
          .split('')
          .map((item) => item + item)
          .join('')
      : raw

  const alpha =
    expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1

  return rgbToHsl(
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16),
    alpha,
  )
}

function parseRgb(value: string) {
  const matched = value.match(/^rgba?\((.*)\)$/i)
  if (!matched) {
    return null
  }

  const body = matched[1].trim()
  let channels: string[]
  let alphaRaw = ''

  if (body.includes(',')) {
    const parts = body.split(',').map((item) => item.trim())
    if (parts.length < 3 || parts.length > 4) {
      return null
    }
    channels = parts.slice(0, 3)
    alphaRaw = parts[3] ?? ''
  } else {
    const split = splitAlpha(body)
    channels = split.base.split(/\s+/).filter(Boolean)
    alphaRaw = split.alpha ?? ''
  }

  if (channels.length !== 3) {
    return null
  }

  const [r, g, b] = channels.map((item) =>
    parseUnitValue(item, { percentBase: 255 }),
  )
  const alpha = alphaRaw ? parseUnitValue(alphaRaw) : 1

  if ([r, g, b, alpha].some((item) => Number.isNaN(item))) {
    return null
  }

  return rgbToHsl(r, g, b, alpha)
}

function parseHsl(value: string) {
  const matched = value.match(/^hsla?\((.*)\)$/i)
  if (!matched) {
    return null
  }

  const body = matched[1].trim()
  let channels: string[]
  let alphaRaw = ''

  if (body.includes(',')) {
    const parts = body.split(',').map((item) => item.trim())
    if (parts.length < 3 || parts.length > 4) {
      return null
    }
    channels = parts.slice(0, 3)
    alphaRaw = parts[3] ?? ''
  } else {
    const split = splitAlpha(body)
    channels = split.base.split(/\s+/).filter(Boolean)
    alphaRaw = split.alpha ?? ''
  }

  if (channels.length !== 3) {
    return null
  }

  const hue = parseHue(channels[0])
  const saturation = parseUnitValue(channels[1], { percentBase: 100 })
  const lightness = parseUnitValue(channels[2], { percentBase: 100 })
  const alpha = alphaRaw ? parseUnitValue(alphaRaw) : 1

  if ([hue, saturation, lightness, alpha].some((item) => Number.isNaN(item))) {
    return null
  }

  return normalizeHsla({
    h: hue,
    s: saturation,
    l: lightness,
    a: alpha,
  })
}

function parseHwb(value: string) {
  const matched = value.match(/^hwb\((.*)\)$/i)
  if (!matched) {
    return null
  }

  const split = splitAlpha(matched[1].trim())
  const channels = split.base.split(/\s+/).filter(Boolean)
  if (channels.length !== 3) {
    return null
  }

  const hue = parseHue(channels[0])
  const white = parseUnitValue(channels[1], { percentBase: 100 })
  const black = parseUnitValue(channels[2], { percentBase: 100 })
  const alpha = split.alpha ? parseUnitValue(split.alpha) : 1

  if ([hue, white, black, alpha].some((item) => Number.isNaN(item))) {
    return null
  }

  return hwbToHsl(hue, white, black, alpha)
}

export function parseColor(value: string | undefined | null) {
  if (!value) {
    return null
  }

  const input = value.trim()
  if (!input) {
    return null
  }

  if (input.startsWith('#')) {
    const color = parseHex(input)
    return color ? { color, format: 'hex' as ColorFormat } : null
  }

  if (/^rgba?\(/i.test(input)) {
    const color = parseRgb(input)
    return color ? { color, format: 'rgb' as ColorFormat } : null
  }

  if (/^hsla?\(/i.test(input)) {
    const color = parseHsl(input)
    return color ? { color, format: 'hsl' as ColorFormat } : null
  }

  if (/^hwb\(/i.test(input)) {
    const color = parseHwb(input)
    return color ? { color, format: 'hwb' as ColorFormat } : null
  }

  return null
}

export function formatColor(
  colorValue: Partial<HslaColor> | undefined,
  format: ColorFormat,
  showAlpha = false,
) {
  const color = normalizeHsla(colorValue)
  const effective = showAlpha ? color : { ...color, a: 1 }
  const rgb = hslToRgb(effective)

  switch (format) {
    case 'rgb':
      return effective.a < 1 && showAlpha
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${formatAlpha(effective.a)})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    case 'hsl':
      return effective.a < 1 && showAlpha
        ? `hsla(${formatNumber(effective.h)}, ${formatNumber(effective.s)}%, ${formatNumber(effective.l)}%, ${formatAlpha(effective.a)})`
        : `hsl(${formatNumber(effective.h)}, ${formatNumber(effective.s)}%, ${formatNumber(effective.l)}%)`
    case 'hwb': {
      const hwb = hslToHwb(effective)
      return effective.a < 1 && showAlpha
        ? `hwb(${formatNumber(hwb.h)} ${formatNumber(hwb.w)}% ${formatNumber(hwb.bk)}% / ${formatAlpha(hwb.a)})`
        : `hwb(${formatNumber(hwb.h)} ${formatNumber(hwb.w)}% ${formatNumber(hwb.bk)}%)`
    }
    default:
      return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}${showAlpha ? toHex(effective.a * 255) : ''}`.toUpperCase()
  }
}

export function getPreviewColor(
  colorValue: Partial<HslaColor> | undefined,
  showAlpha = false,
) {
  return formatColor(colorValue, 'rgb', showAlpha)
}

export const defaultColorPickerValue = '#1989FA'
export const defaultColorPickerPresets = [
  '#FFFFFF',
  '#EF4444',
  '#F97316',
  '#F59E0B',
  '#EAB308',
  '#84CC16',
  '#2ECC71',
  '#10B981',
  '#06B6D4',
  '#0EA5E9',
  '#1989FA',
  '#6366F1',
  '#8B5CF6',
  '#A855F7',
  '#EC4899',
  '#9CA3AF',
  '#64748B',
  '#111827',
]
