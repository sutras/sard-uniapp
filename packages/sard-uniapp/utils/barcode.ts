import {
  type CanvasFontWeight,
  type CanvasFontStyle,
  type CanvasTextAlign,
} from './canvas'

export const BarcodeFormatList = ['CODE128', 'EAN13', 'UPC-A', 'ITF14'] as const

export type BarcodeFormat = (typeof BarcodeFormatList)[number]

export const BarcodeTextPositionList = ['top', 'bottom'] as const

export type BarcodeTextPosition = (typeof BarcodeTextPositionList)[number]

// #region BarcodeOptions
export interface BarcodeOptions {
  format?: BarcodeFormat
  width?: number
  height?: number
  color?: string
  background?: string
  displayValue?: boolean
  text?: string
  textPosition?: BarcodeTextPosition
  textAlign?: CanvasTextAlign
  textMargin?: number
  fontStyle?: CanvasFontStyle
  fontWeight?: CanvasFontWeight
  fontSize?: number
  fontFamily?: string
  margin?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  ean128?: boolean
  flat?: boolean
  lastChar?: string
}
// #endregion BarcodeOptions

// #region BarcodeRenderOptions
export interface BarcodeRenderOptions {
  format: BarcodeFormat
  width: number
  height: number
  lineColor: string
  background: string
  displayValue: boolean
  text?: string
  textPosition: BarcodeTextPosition
  textAlign: CanvasTextAlign
  textMargin: number
  fontStyle: CanvasFontStyle
  fontWeight: CanvasFontWeight
  fontSize: number
  fontFamily: string
  margin: number
  marginTop: number
  marginBottom: number
  marginLeft: number
  marginRight: number
  ean128?: boolean
  flat?: boolean
  lastChar?: string
}
// #endregion BarcodeRenderOptions

// #region BarcodeEncoding
export interface BarcodeEncoding {
  data: string
  text: string
  options: BarcodeRenderOptions
}
// #endregion BarcodeEncoding

// #region BarcodeLayoutSegment
export interface BarcodeLayoutSegment extends BarcodeEncoding {
  width: number
  height: number
  textWidth: number
  barcodeWidth: number
  barcodePadding: number
}
// #endregion BarcodeLayoutSegment

// #region BarcodeLayout
export interface BarcodeLayout {
  width: number
  height: number
  segments: BarcodeLayoutSegment[]
}
// #endregion BarcodeLayout

type BarcodeEncoder = {
  valid(): boolean
  encode(): RawBarcodeEncoding | RawBarcodeEncoding[]
}

interface RawBarcodeEncoding {
  data: string
  text?: string
  options?: Partial<BarcodeRenderOptions>
}

const EAN_DIGIT_ENCODINGS = {
  L: [
    '0001101',
    '0011001',
    '0010011',
    '0111101',
    '0100011',
    '0110001',
    '0101111',
    '0111011',
    '0110111',
    '0001011',
  ],
  G: [
    '0100111',
    '0110011',
    '0011011',
    '0100001',
    '0011101',
    '0111001',
    '0000101',
    '0010001',
    '0001001',
    '0010111',
  ],
  R: [
    '1110010',
    '1100110',
    '1101100',
    '1000010',
    '1011100',
    '1001110',
    '1010000',
    '1000100',
    '1001000',
    '1110100',
  ],
} as const

const EAN13_STRUCTURES = [
  'LLLLLL',
  'LLGLGG',
  'LLGGLG',
  'LLGGGL',
  'LGLLGG',
  'LGGLLG',
  'LGGGLL',
  'LGLGLG',
  'LGLGGL',
  'LGGLGL',
] as const

const ITF_ENCODINGS = [
  '00110',
  '10001',
  '01001',
  '11000',
  '00101',
  '10100',
  '01100',
  '00011',
  '10010',
  '01010',
] as const

const CODE128_PATTERNS = [
  '11011001100',
  '11001101100',
  '11001100110',
  '10010011000',
  '10010001100',
  '10001001100',
  '10011001000',
  '10011000100',
  '10001100100',
  '11001001000',
  '11001000100',
  '11000100100',
  '10110011100',
  '10011011100',
  '10011001110',
  '10111001100',
  '10011101100',
  '10011100110',
  '11001110010',
  '11001011100',
  '11001001110',
  '11011100100',
  '11001110100',
  '11101101110',
  '11101001100',
  '11100101100',
  '11100100110',
  '11101100100',
  '11100110100',
  '11100110010',
  '11011011000',
  '11011000110',
  '11000110110',
  '10100011000',
  '10001011000',
  '10001000110',
  '10110001000',
  '10001101000',
  '10001100010',
  '11010001000',
  '11000101000',
  '11000100010',
  '10110111000',
  '10110001110',
  '10001101110',
  '10111011000',
  '10111000110',
  '10001110110',
  '11101110110',
  '11010001110',
  '11000101110',
  '11011101000',
  '11011100010',
  '11011101110',
  '11101011000',
  '11101000110',
  '11100010110',
  '11101101000',
  '11101100010',
  '11100011010',
  '11101111010',
  '11001000010',
  '11110001010',
  '10100110000',
  '10100001100',
  '10010110000',
  '10010000110',
  '10000101100',
  '10000100110',
  '10110010000',
  '10110000100',
  '10011010000',
  '10011000010',
  '10000110100',
  '10000110010',
  '11000010010',
  '11001010000',
  '11110111010',
  '11000010100',
  '10001111010',
  '10100111100',
  '10010111100',
  '10010011110',
  '10111100100',
  '10011110100',
  '10011110010',
  '11110100100',
  '11110010100',
  '11110010010',
  '11011011110',
  '11011110110',
  '11110110110',
  '10101111000',
  '10100011110',
  '10001011110',
  '10111101000',
  '10111100010',
  '11110101000',
  '11110100010',
  '10111011110',
  '10111101110',
  '11101011110',
  '11110101110',
  '11010000100',
  '11010010000',
  '11010011100',
  '1100011101011',
] as const

const CODE128_START_B = 104
const CODE128_START_C = 105
const CODE128_CODE_B = 100
const CODE128_CODE_C = 99
const CODE128_FNC1 = 102
const CODE128_STOP = 106

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

function getDisplayText(value: string, options: BarcodeRenderOptions) {
  return options.text ?? value
}

function createEncoding(
  data: string,
  text: string,
  options?: Partial<BarcodeRenderOptions>,
): RawBarcodeEncoding {
  return {
    data,
    text,
    options,
  }
}

function encodeEANDigits(data: string, structure: string, separator = '') {
  return data
    .split('')
    .map((digit, index) => {
      const digits =
        EAN_DIGIT_ENCODINGS[
          structure[index] as keyof typeof EAN_DIGIT_ENCODINGS
        ]
      return digits[Number(digit)]
    })
    .join(separator)
}

function getGuardHeight(options: BarcodeRenderOptions) {
  const fontSize = Math.min(options.fontSize, options.width * 10)
  return options.height + fontSize / 2 + options.textMargin
}

function checksumEAN13(value: string) {
  const sum = value
    .slice(0, 12)
    .split('')
    .reduce((total, digit, index) => {
      return total + Number(digit) * (index % 2 === 0 ? 1 : 3)
    }, 0)

  return (10 - (sum % 10)) % 10
}

function checksumUPC(value: string) {
  let sum = 0

  for (let index = 0; index < 11; index++) {
    sum += Number(value[index]) * (index % 2 === 0 ? 3 : 1)
  }

  return (10 - (sum % 10)) % 10
}

function checksumITF14(value: string) {
  const sum = value
    .slice(0, 13)
    .split('')
    .reduce((total, digit, index) => {
      return total + Number(digit) * (index % 2 === 0 ? 3 : 1)
    }, 0)

  return (10 - (sum % 10)) % 10
}

function countLeadingDigits(value: string, start: number) {
  let end = start
  while (end < value.length && /[0-9]/.test(value[end])) {
    end++
  }
  return end - start
}

function encodeCODE128CodeBChar(char: string) {
  const code = char.charCodeAt(0)
  assert(
    code >= 32 && code <= 127,
    `Invalid barcode input for format CODE128: ${char}`,
  )
  return code - 32
}

function encodeCODE128(
  value: string,
  options: BarcodeRenderOptions,
): RawBarcodeEncoding {
  assert(
    value.length > 0,
    'Invalid barcode input for format CODE128: empty value',
  )
  assert(
    /^[\x20-\x7F]+$/.test(value),
    `Invalid barcode input for format CODE128: ${value}`,
  )

  const startDigitRun = countLeadingDigits(value, 0)
  let activeSet: 'B' | 'C' =
    startDigitRun >= 4 && startDigitRun % 2 === 0 ? 'C' : 'B'
  const codes = [activeSet === 'C' ? CODE128_START_C : CODE128_START_B]
  let index = 0

  if (options.ean128) {
    codes.push(CODE128_FNC1)
  }

  while (index < value.length) {
    if (activeSet === 'B') {
      const digitRun = countLeadingDigits(value, index)

      if (digitRun >= 4) {
        if (digitRun % 2 === 1) {
          codes.push(encodeCODE128CodeBChar(value[index]))
          index++
          continue
        }

        codes.push(CODE128_CODE_C)
        activeSet = 'C'
        continue
      }

      codes.push(encodeCODE128CodeBChar(value[index]))
      index++
      continue
    }

    const digitRun = countLeadingDigits(value, index)
    if (digitRun < 2) {
      codes.push(CODE128_CODE_B)
      activeSet = 'B'
      continue
    }

    const pairLength = digitRun - (digitRun % 2)
    const stop = index + pairLength

    while (index < stop) {
      codes.push(Number(value.slice(index, index + 2)))
      index += 2
    }

    if (index < value.length) {
      codes.push(CODE128_CODE_B)
      activeSet = 'B'
    }
  }

  const checksum = codes.reduce((total, code, codeIndex) => {
    return total + code * (codeIndex === 0 ? 1 : codeIndex)
  }, 0)

  const checksumCode = checksum % 103
  const data = [...codes, checksumCode, CODE128_STOP]
    .map((code) => CODE128_PATTERNS[code])
    .join('')

  return createEncoding(data, getDisplayText(value, options))
}

function encodeEAN13(
  value: string,
  options: BarcodeRenderOptions,
): RawBarcodeEncoding[] {
  const normalizedValue = /^[0-9]{12}$/.test(value)
    ? value + checksumEAN13(value)
    : value

  assert(
    /^[0-9]{13}$/.test(normalizedValue) &&
      Number(normalizedValue[12]) === checksumEAN13(normalizedValue),
    `Invalid barcode input for format EAN13: ${value}`,
  )

  const displayText = getDisplayText(normalizedValue, options)
  const guardHeight = getGuardHeight(options)
  const leftText = normalizedValue.slice(1, 7)
  const rightText = normalizedValue.slice(7)

  return [
    createEncoding('000000000000', displayText.slice(0, 1), {
      textAlign: 'left',
      fontSize: Math.min(options.fontSize, options.width * 10),
    }),
    createEncoding('101', '', { height: guardHeight }),
    createEncoding(
      encodeEANDigits(leftText, EAN13_STRUCTURES[Number(normalizedValue[0])]),
      displayText.slice(1, 7),
      { fontSize: Math.min(options.fontSize, options.width * 10) },
    ),
    createEncoding('01010', '', { height: guardHeight }),
    createEncoding(encodeEANDigits(rightText, 'RRRRRR'), displayText.slice(7), {
      fontSize: Math.min(options.fontSize, options.width * 10),
    }),
    createEncoding('101', '', { height: guardHeight }),
  ]
}

function encodeUPC(
  value: string,
  options: BarcodeRenderOptions,
): RawBarcodeEncoding[] {
  const normalizedValue = /^[0-9]{11}$/.test(value)
    ? value + checksumUPC(value)
    : value

  assert(
    /^[0-9]{12}$/.test(normalizedValue) &&
      Number(normalizedValue[11]) === checksumUPC(normalizedValue),
    `Invalid barcode input for format UPC-A: ${value}`,
  )

  const displayText = getDisplayText(normalizedValue, options)
  const fontSize = Math.min(options.fontSize, options.width * 10)
  const guardHeight = options.height + fontSize / 2 + options.textMargin

  return [
    createEncoding('00000000', displayText.slice(0, 1), {
      textAlign: 'left',
      fontSize,
    }),
    createEncoding(
      '101' + encodeEANDigits(normalizedValue.slice(0, 1), 'L'),
      '',
      {
        height: guardHeight,
      },
    ),
    createEncoding(
      encodeEANDigits(normalizedValue.slice(1, 6), 'LLLLL'),
      displayText.slice(1, 6),
      { fontSize },
    ),
    createEncoding('01010', '', { height: guardHeight }),
    createEncoding(
      encodeEANDigits(normalizedValue.slice(6, 11), 'RRRRR'),
      displayText.slice(6, 11),
      { fontSize },
    ),
    createEncoding(
      encodeEANDigits(normalizedValue.slice(11), 'R') + '101',
      '',
      {
        height: guardHeight,
      },
    ),
    createEncoding('00000000', displayText.slice(11), {
      textAlign: 'right',
      fontSize,
    }),
  ]
}

function encodeITFPair(pair: string) {
  const left = ITF_ENCODINGS[Number(pair[0])]
  const right = ITF_ENCODINGS[Number(pair[1])]

  return left
    .split('')
    .map((bit, index) => {
      const bar = bit === '1' ? '111' : '1'
      const space = right[index] === '1' ? '000' : '0'
      return bar + space
    })
    .join('')
}

function encodeITF14Data(
  value: string,
  options: BarcodeRenderOptions,
): RawBarcodeEncoding {
  assert(
    /^([0-9]{2})+$/.test(value),
    `Invalid barcode input for format ITF14: ${value}`,
  )

  return createEncoding(
    '1010' +
      (value.match(/.{2}/g) ?? []).map((pair) => encodeITFPair(pair)).join('') +
      '11101',
    getDisplayText(value, options),
  )
}

function encodeITF14(
  value: string,
  options: BarcodeRenderOptions,
): RawBarcodeEncoding {
  const normalizedValue = /^[0-9]{13}$/.test(value)
    ? value + checksumITF14(value)
    : value

  assert(
    /^[0-9]{14}$/.test(normalizedValue) &&
      Number(normalizedValue[13]) === checksumITF14(normalizedValue),
    `Invalid barcode input for format ITF14: ${value}`,
  )

  return encodeITF14Data(normalizedValue, {
    ...options,
    text: getDisplayText(normalizedValue, options),
  })
}

export function normalizeBarcodeOptions(
  options: BarcodeOptions = {},
): BarcodeRenderOptions {
  const margin = options.margin ?? 10

  return {
    format: options.format ?? 'CODE128',
    width: options.width ?? 2,
    height: options.height ?? 100,
    lineColor: options.color ?? '#000',
    background: options.background ?? '#fff',
    displayValue: options.displayValue ?? true,
    text: options.text,
    textPosition: options.textPosition ?? 'bottom',
    textAlign: options.textAlign ?? 'center',
    textMargin: options.textMargin ?? 2,
    fontStyle: options.fontStyle ?? 'normal',
    fontWeight: options.fontWeight ?? 'normal',
    fontSize: options.fontSize ?? 20,
    fontFamily: options.fontFamily ?? 'monospace',
    margin,
    marginTop: options.marginTop ?? margin,
    marginBottom: options.marginBottom ?? margin,
    marginLeft: options.marginLeft ?? margin,
    marginRight: options.marginRight ?? margin,
    ean128: options.ean128,
    flat: options.flat,
    lastChar: options.lastChar,
  }
}

function normalizeRawEncoding(
  encoding: RawBarcodeEncoding,
  options: BarcodeRenderOptions,
): BarcodeEncoding {
  return {
    data: encoding.data,
    text: encoding.text ?? '',
    options: {
      ...options,
      ...encoding.options,
    },
  }
}

export function barcode(value: string, options: BarcodeOptions = {}) {
  const normalizedOptions = normalizeBarcodeOptions(options)
  const encoder = createEncoder(
    normalizedOptions.format,
    value,
    normalizedOptions,
  )

  if (!encoder.valid()) {
    throw new Error(
      `Invalid barcode input for format ${normalizedOptions.format}: ${value}`,
    )
  }

  const encodings = encoder.encode()
  const normalizedEncodings = Array.isArray(encodings) ? encodings : [encodings]

  return normalizedEncodings.map((encoding) =>
    normalizeRawEncoding(encoding, normalizedOptions),
  )
}

function getSegmentHeight(segment: BarcodeEncoding) {
  const { options, text } = segment

  return (
    options.height +
    (options.displayValue && text ? options.fontSize + options.textMargin : 0) +
    options.marginTop +
    options.marginBottom
  )
}

function getBarcodePadding(
  textWidth: number,
  barcodeWidth: number,
  options: BarcodeRenderOptions,
) {
  if (!options.displayValue || barcodeWidth >= textWidth) {
    return 0
  }

  if (options.textAlign === 'right') {
    return Math.floor(textWidth - barcodeWidth)
  }

  if (options.textAlign === 'center') {
    return Math.floor((textWidth - barcodeWidth) / 2)
  }

  return 0
}

export function calculateBarcodeLayout(
  encodings: BarcodeEncoding[],
  measureText: (text: string, options: BarcodeRenderOptions) => number,
): BarcodeLayout {
  const segments = encodings.map<BarcodeLayoutSegment>((segment) => {
    const textWidth =
      segment.options.displayValue && segment.text
        ? measureText(segment.text, segment.options)
        : 0
    const barcodeWidth = segment.data.length * segment.options.width
    const width = Math.ceil(Math.max(textWidth, barcodeWidth))

    return {
      ...segment,
      width,
      height: getSegmentHeight(segment),
      textWidth,
      barcodeWidth,
      barcodePadding: getBarcodePadding(
        textWidth,
        barcodeWidth,
        segment.options,
      ),
    }
  })

  const totalContentWidth = segments.reduce(
    (sum, segment) => sum + segment.width,
    0,
  )
  const baseOptions = segments[0]?.options ?? normalizeBarcodeOptions()
  const height = segments.reduce(
    (maxHeight, segment) => Math.max(maxHeight, segment.height),
    0,
  )

  return {
    width: totalContentWidth + baseOptions.marginLeft + baseOptions.marginRight,
    height,
    segments,
  }
}

function createEncoder(
  format: BarcodeFormat,
  value: string,
  options: BarcodeRenderOptions,
): BarcodeEncoder {
  switch (format) {
    case 'CODE128':
      return {
        valid: () => /^[\x20-\x7F]+$/.test(value),
        encode: () => encodeCODE128(value, options),
      }
    case 'EAN13':
      return {
        valid: () => /^[0-9]{12,13}$/.test(value),
        encode: () => encodeEAN13(value, options),
      }
    case 'UPC-A':
      return {
        valid: () => /^[0-9]{11,12}$/.test(value),
        encode: () => encodeUPC(value, options),
      }
    case 'ITF14':
      return {
        valid: () => /^[0-9]{13,14}$/.test(value),
        encode: () => encodeITF14(value, options),
      }
  }
}
