/*
|-------------------------------------------------------------------------------
| Error Correction Coding
|-------------------------------------------------------------------------------
| https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-iii-error-correction-1kbm
|
*/
const LOG = new Uint8Array(256)
const EXP = new Uint8Array(256)

;(() => {
  for (let exponent = 1, value = 1; exponent < 256; exponent++) {
    value = value > 127 ? (value << 1) ^ 285 : value << 1
    LOG[value] = exponent % 255
    EXP[exponent % 255] = value
  }
})()

function mul(a: number, b: number) {
  return a && b ? EXP[(LOG[a] + LOG[b]) % 255] : 0
}
function div(a: number, b: number) {
  return EXP[(LOG[a] + LOG[b] * 254) % 255]
}

function polyMul(poly1: Uint8Array, poly2: Uint8Array) {
  const coeffs = new Uint8Array(poly1.length + poly2.length - 1)

  for (let index = 0; index < coeffs.length; index++) {
    let coeff = 0
    for (let p1index = 0; p1index <= index; p1index++) {
      const p2index = index - p1index
      coeff ^= mul(poly1[p1index], poly2[p2index])
    }
    coeffs[index] = coeff
  }
  return coeffs
}

function polyRest(dividend: Uint8Array, divisor: Uint8Array) {
  const quotientLength = dividend.length - divisor.length + 1
  let rest = new Uint8Array(dividend)
  for (let count = 0; count < quotientLength; count++) {
    if (rest[0]) {
      const factor = div(rest[0], divisor[0])
      const subtr = new Uint8Array(rest.length)
      subtr.set(polyMul(divisor, new Uint8Array([factor])), 0)
      rest = rest.map((value, index) => value ^ subtr[index]).slice(1)
    } else {
      rest = rest.slice(1)
    }
  }
  return rest
}

const cacheGeneratorPoly: Record<number, Uint8Array> = {}

function getGeneratorPoly(degree: number) {
  if (cacheGeneratorPoly[degree]) {
    return cacheGeneratorPoly[degree]
  }
  let lastPoly = new Uint8Array([1])
  for (let index = 0; index < degree; index++) {
    lastPoly = polyMul(lastPoly, new Uint8Array([1, EXP[index]]))
  }
  return (cacheGeneratorPoly[degree] = lastPoly)
}

function getECC(data: Uint8Array, degree: number) {
  const messagePoly = new Uint8Array(data.length + degree)
  messagePoly.set(data, 0)
  return polyRest(messagePoly, getGeneratorPoly(degree))
}

/*
|-------------------------------------------------------------------------------
| QR Code Generator
|-------------------------------------------------------------------------------
| https://www.thonky.com/qr-code-tutorial/
|
*/

const ECCodewordsPerBlock = [
  [
    7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28,
    28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30,
  ],
  [
    10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26,
    26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
    28, 28,
  ],
  [
    13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26,
    30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30,
  ],
  [
    17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26,
    28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30,
  ],
]

const ECBlocks = [
  [
    1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12,
    12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25,
  ],
  [
    1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17,
    18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49,
  ],
  [
    1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23,
    25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68,
  ],
  [
    1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25,
    34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81,
  ],
]

function appendBits(num: number, length: number, bits: number[]) {
  for (let i = length - 1; i >= 0; i--) {
    bits.push((num >>> i) & 1)
  }
  return bits
}

enum Mode {
  Numeric,
  Alphanumeric,
  Byte,
}

function getMode(text: string) {
  if (/^[0-9]*$/.test(text)) {
    return Mode.Numeric
  }
  if (/^[0-9A-Z $%*+-./:]*$/.test(text)) {
    return Mode.Alphanumeric
  }
  return Mode.Byte
}

function getModeIndicator(mode: number) {
  switch (mode) {
    case Mode.Numeric:
      return 0b0001
    case Mode.Alphanumeric:
      return 0b0010
    default:
      return 0b0100
  }
}

function encodeNumeric(text: string) {
  const bits: number[] = []
  ;(text.match(/.{1,3}/g) || []).forEach((item) => {
    appendBits(+item, (item.length - 1) * 3 + 4, bits)
  })
  return bits
}

export const ALPHANUMERIC_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'

function encodeAlphaNumeric(text: string) {
  const bits: number[] = []
  ;(text.match(/.{1,2}/g) || []).forEach((item) => {
    const i1 = ALPHANUMERIC_CHARS.indexOf(item[0])
    const i2 = ALPHANUMERIC_CHARS.indexOf(item[1])
    if (i2 === -1) {
      appendBits(i1, 6, bits)
    } else {
      appendBits(i1 * 45 + i2, 11, bits)
    }
  })
  return bits
}

function toUtf8ByteArray(text: string) {
  text = encodeURI(text)
  const bytes: number[] = []
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) !== '%') {
      bytes.push(text.charCodeAt(i))
    } else {
      bytes.push(parseInt(text.slice(i + 1, i + 3), 16))
      i += 2
    }
  }
  return bytes
}

function encodeByte(text: string) {
  const bits: number[] = []
  toUtf8ByteArray(text).forEach((item) => {
    appendBits(item, 8, bits)
  })
  return bits
}

function encodeData(mode: Mode, text: string) {
  switch (mode) {
    case Mode.Numeric:
      return encodeNumeric(text)
    case Mode.Alphanumeric:
      return encodeAlphaNumeric(text)
    default:
      return encodeByte(text)
  }
}

function getFunctionModules(version: number) {
  let count = 225 + 8 * version
  if (version > 6) {
    count += 36
  }
  if (version > 1) {
    const alignCount = ~~(version / 7) + 2
    count += (25 * alignCount - 10) * alignCount - 55
  }
  return count
}

function getSize(version: number) {
  return version * 4 + 17
}

function getTotalDataModules(version: number) {
  return Math.pow(getSize(version), 2) - getFunctionModules(version)
}

function getECCodewords(eclIndex: number, version: number) {
  const codewords = ECCodewordsPerBlock[eclIndex][version - 1]
  const blocks = ECBlocks[eclIndex][version - 1]
  return codewords * blocks
}

function getRawDataCodewords(eclIndex: number, version: number) {
  return getTotalDataModules(version) / 8 - getECCodewords(eclIndex, version)
}

const charCountIndicatorTable = {
  [Mode.Numeric]: [10, 12, 14],
  [Mode.Alphanumeric]: [9, 11, 13],
  [Mode.Byte]: [8, 16, 16],
}

function getCharCountIndicator(mode: Mode, version: number) {
  return charCountIndicatorTable[mode][~~((version + 7) / 17)]
}

function getVersion(mode: Mode, eclIndex: number, codewords: number) {
  for (let version = 1; version <= 40; version++) {
    const rawDataCodewords = getRawDataCodewords(eclIndex, version)
    if (
      rawDataCodewords >=
      codewords + (4 + getCharCountIndicator(mode, version)) / 8
    ) {
      return version
    }
  }
  return 40
}

function addFinderPatterns(map: number[][], size: number) {
  for (let i = 0; i < 3; i++) {
    const originX = i === 1 ? size - 7 : 0
    const originY = i === 2 ? size - 7 : 0
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const bit =
          x === 0 ||
          x === 6 ||
          y === 0 ||
          y === 6 ||
          (x > 1 && x < 5 && y > 1 && y < 5)
            ? 1
            : 0
        map[originY + y][originX + x] = bit
      }
    }
  }
}

function addSeparatorPatterns(map: number[][], size: number) {
  for (let i = 0; i < 8; i++) {
    map[i][7] = 0
    map[i][size - 8] = 0
    map[size - 8 + i][7] = 0
    map[7][i] = 0
    map[7][size - 8 + i] = 0
    map[size - 8][i] = 0
  }
}

function getAlignmentPatternLocations(version: number) {
  if (version == 1) {
    return []
  }

  const alignCount = ~~(version / 7) + 2
  const step =
    version === 32
      ? 26
      : Math.ceil((version * 4 + 4) / (alignCount * 2 - 2)) * 2
  const locations = [6]
  for (
    let location = getSize(version) - 7;
    locations.length < alignCount;
    location -= step
  ) {
    locations.splice(1, 0, location)
  }
  return locations
}

function addAlignmentPatterns(map: number[][], version: number) {
  const locations = getAlignmentPatternLocations(version)
  for (const locY of locations) {
    for (const locX of locations) {
      if (map[locY][locX] !== null) {
        continue
      }
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          map[locY - 2 + y][locX - 2 + x] =
            x === 0 || x === 4 || y === 0 || y === 4 || (x === 2 && y === 2)
              ? 1
              : 0
        }
      }
    }
  }
}

function addTimingPatterns(map: number[][], size: number) {
  const length = size - 16
  for (let i = 0; i < length; i++) {
    const n = i % 2 === 0 ? 1 : 0
    map[6][8 + i] = n
    map[8 + i][6] = n
  }
}

function addDarkPattern(map: number[][], size: number) {
  map[size - 8][8] = 1
}

function addFormatInformationPatterns(
  map: number[][],
  size: number,
  fillBit: (i: number) => number,
) {
  for (let i = 0; i < 15; i++) {
    const bit = fillBit(15 - 1 - i)
    // 横条
    map[8][i < 6 ? i : i < 7 ? i + 1 : size - 15 + i] = bit
    // 竖条
    map[size - 1 - (i < 7 ? i : i < 9 ? size - 16 + i : size - 15 + i)][8] = bit
  }
}

function addVersionInformationPatterns(
  map: number[][],
  size: number,
  fillBit: (i: number) => number,
) {
  for (let i = 0; i < 18; i++) {
    // 左下
    map[size - 11 + (i % 3)][~~(i / 3)] = fillBit(i)
    // 右上
    map[~~(i / 3)][size - 11 + ~~(i % 3)] = fillBit(i)
  }
}

function placeDataBits(map: number[][], size: number, dataBits: number[]) {
  const length = size * size
  let b = 0
  for (let i = 0; i < length; i++) {
    const rest = ~~(i / 2) % size
    const quo = ~~(i / (size * 2))
    const y = quo % 2 === 0 ? size - 1 - rest : rest
    let x = size - 2 - (quo * 2 - (i % 2 === 0 ? 1 : 0))
    if (x < 7) {
      x--
    }

    if (map[y][x] === null) {
      map[y][x] = dataBits[b++] + 2
    }
  }
}

const maskModes = [
  (row: number, col: number) => (row + col) % 2 === 0,
  (row: number) => row % 2 === 0,
  (_: number, col: number) => col % 3 === 0,
  (row: number, col: number) => (row + col) % 3 === 0,
  (row: number, col: number) => (~~(row / 2) + ~~(col / 3)) % 2 === 0,
  (row: number, col: number) => ((row * col) % 2) + ((row * col) % 3) === 0,
  (row: number, col: number) =>
    (((row * col) % 2) + ((row * col) % 3)) % 2 === 0,
  (row: number, col: number) =>
    (((row + col) % 2) + ((row * col) % 3)) % 2 === 0,
]

function getLeastFiveSameColoredPenalty(
  getEach: (i: number, j: number) => number,
  size: number,
) {
  let score = 0
  for (let i = 0; i < size; i++) {
    let sum = 0
    let last = -1
    for (let j = 0; j < size; j++) {
      const bit = getEach(i, j)
      if (sum === 0 || last === bit) {
        sum++
        last = bit
      }
      if (last !== bit || j === size - 1) {
        if (sum >= 5) {
          score += sum - 2
        }
        sum = 1
        last = bit
      }
    }
  }
  return score
}

function getTwoByTwoSameColoredPenalty(map: number[][], size: number) {
  let score = 0
  for (let y = 0; y < size - 2; y++) {
    for (let x = 0; x < size - 2; x++) {
      if (
        (map[y][x] + map[y][x + 1] + map[y + 1][x] + map[y + 1][x + 1]) % 4 ===
        0
      ) {
        score += 3
      }
    }
  }
  return score
}

function getFinderLikePenalty(map: number[][], size: number) {
  let score = 0
  for (let i = 0; i < size - 11; i++) {
    for (let j = 0; j < size - 11; j++) {
      let rowBits = 0
      let colBits = 0
      for (let k = 0; k < 11; k++) {
        rowBits = (rowBits << 1) + map[i][j + k]
        colBits = (colBits << 1) + map[j + k][i]
      }
      if (rowBits === 0b10111010000 || rowBits === 0b00001011101) {
        score += 40
      }
      if (colBits === 0b10111010000 || colBits === 0b00001011101) {
        score += 40
      }
    }
  }
  return score
}

function getBalancePenalty(map: number[][]) {
  const darkModules = map.reduce(
    (sum, row) => sum + row.reduce((sum, bit) => sum + bit, 0),
    0,
  )
  const percent = (darkModules / (map.length * map.length)) * 100
  const score =
    Math.min(
      Math.abs(Math.floor(percent / 5) * 5 - 50) / 5,
      Math.abs(Math.ceil(percent / 5) * 5 - 50) / 5,
    ) * 10
  return score
}

const errorCorrectionBit = [0b01, 0b00, 0b11, 0b10]

function getFormatInformationBits(eclIndex: number, maskNum: number) {
  const ecMaskBits = (errorCorrectionBit[eclIndex] << 3) | maskNum
  let rest = ecMaskBits
  for (let i = 0; i < 10; i++) {
    rest = (rest << 1) ^ ((rest >>> 9) * 0b10100110111)
  }
  return ((ecMaskBits << 10) | rest) ^ 0b101010000010010
}

function getVersionInformationBits(version: number) {
  let rest = version
  for (let i = 0; i < 12; i++) {
    rest = (rest << 1) ^ ((rest >>> 11) * 0b1111100100101)
  }
  return (version << 12) | rest
}

interface QrcodeOptions {
  ecl?: ECL
}

export type ECL = 'L' | 'M' | 'Q' | 'H'

export const ECLList: ECL[] = ['L', 'M', 'Q', 'H']

export function qrcode(text: string, options: QrcodeOptions = {}) {
  const { ecl = 'M' } = options

  let eclIndex = ECLList.indexOf(ecl)
  if (eclIndex < 0) {
    eclIndex = 1
  }

  const mode = getMode(text)
  const modeIndicator = getModeIndicator(mode)
  let version = 0
  let size = 0
  let dataBits: number[] = []
  const groups: Array<{ data: Uint8Array; ecc: Uint8Array }> = []
  let map: number[][] = []
  let maskNum = 0
  let maskMap = [] as number[][]

  // 数据编码
  {
    // 使用选定模式进行编码
    dataBits = encodeData(mode, text)

    const codewords = dataBits.length / 8
    const charLength = mode === Mode.Byte ? codewords : text.length

    // 确定数据的最小版本
    version = getVersion(mode, eclIndex, codewords)
    size = getSize(version)

    // 添加模式指示器、字符计数指示器
    dataBits = [
      ...appendBits(modeIndicator, 4, []),
      ...appendBits(charLength, getCharCountIndicator(mode, version), []),
      ...dataBits,
    ]

    // 确定此QR码所需的数据位数
    const rawDataBits = getRawDataCodewords(eclIndex, version) * 8

    // 如有必要，添加0结束符
    appendBits(0, Math.min(rawDataBits - dataBits.length, 4), dataBits)

    // 添加更多的0使长度成为8的倍数
    appendBits(0, (8 - (dataBits.length % 8)) % 8, dataBits)

    // 如果字符串仍然太短，添加填充字节
    for (
      let padByte = 0b11101100;
      dataBits.length < rawDataBits;
      padByte ^= 0b11101100 ^ 0b00010001
    ) {
      appendBits(padByte, 8, dataBits)
    }
  }

  // 纠错编码
  {
    const codewords: number[] = []
    dataBits.forEach((bit, i) => {
      codewords[i >> 3] |= bit << (7 - (i & 7))
    })
    const blocks = ECBlocks[eclIndex][version - 1]
    const g2Blocks = ~~(getTotalDataModules(version) / 8) % blocks
    const g1Blocks = blocks - g2Blocks
    const totalDC = getRawDataCodewords(eclIndex, version)
    const g1DCPerBlock = ~~(totalDC / blocks)
    const g2DCPerBlock =
      g2Blocks === 0 ? 0 : (totalDC - g1DCPerBlock * g1Blocks) / g2Blocks

    const eccNum = ECCodewordsPerBlock[eclIndex][version - 1]

    let currentIndex = 0

    for (const [blocks, DCPerBlock] of [
      [g1Blocks, g1DCPerBlock],
      [g2Blocks, g2DCPerBlock],
    ]) {
      for (let b = 0; b < blocks; b++) {
        const dataCodewords = new Uint8Array(
          codewords.slice(currentIndex, currentIndex + DCPerBlock),
        )
        groups.push({
          data: dataCodewords,
          ecc: getECC(dataCodewords, eccNum),
        })
        currentIndex += DCPerBlock
      }
    }
  }

  // 构造最后信息
  {
    // 将块进行交叉
    const dataCodewords: number[] = []
    const ecCodewords: number[] = []

    let i = 0
    while (true) {
      const result = groups.map((block) => {
        const dataCodeWord = block.data[i]
        if (dataCodeWord !== undefined) {
          dataCodewords.push(dataCodeWord)
        }
        const ecCodeWord = block.ecc[i]
        if (ecCodeWord !== undefined) {
          ecCodewords.push(ecCodeWord)
        }
        return dataCodeWord === undefined && ecCodeWord === undefined
      })
      if (result.every((done) => done)) {
        break
      }
      i++
    }

    // 将交错纠错码字放在交错数据码字之后
    const interleavedCodewords = dataCodewords.concat(ecCodewords)

    dataBits = []
    interleavedCodewords.forEach((codewords) => {
      appendBits(codewords, 8, dataBits)
    })

    // 如果有必要，添加剩余位
    appendBits(0, getTotalDataModules(version) - dataBits.length, dataBits)
  }

  // 模块在矩阵中的放置
  {
    map = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))

    // 添加查找器图案
    addFinderPatterns(map, size)

    // 添加分隔符
    addSeparatorPatterns(map, size)

    // 添加对齐图案
    addAlignmentPatterns(map, version)

    // 添加时序图案
    addTimingPatterns(map, size)

    // 添加黑暗图案
    addDarkPattern(map, size)

    // 添加格式信息占位图案
    addFormatInformationPatterns(map, size, () => 0)

    // 添加版本信息占位图案
    if (version >= 7) {
      addVersionInformationPatterns(map, size, () => 0)
    }

    // 放置数据位
    placeDataBits(map, size, dataBits)
  }

  // 数据掩码
  {
    let lowerScore = Infinity

    for (let i = 0; i < 8; i++) {
      const maskMode = maskModes[i]
      // 生成掩码图案
      const seedMap = map.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (col < 2) {
            return col
          }
          col = col - 2
          return maskMode(rowIndex, colIndex) ? col ^ 1 : col
        }),
      )

      // 计算罚分
      let score = 0

      // 评估条件1
      // 行
      score += getLeastFiveSameColoredPenalty((i, j) => seedMap[i][j], size)
      // 列
      score += getLeastFiveSameColoredPenalty((i, j) => seedMap[j][i], size)

      // 评估条件2
      score += getTwoByTwoSameColoredPenalty(seedMap, size)

      // 评估条件3
      score += getFinderLikePenalty(seedMap, size)

      // 评估条件4
      score += getBalancePenalty(seedMap)

      // 选择八种掩码图案的最低罚分
      if (score < lowerScore) {
        lowerScore = score
        maskNum = i
        maskMap = seedMap
      }
    }
  }

  // 格式和版本信息
  {
    // 添加格式信息图案
    const formatBits = getFormatInformationBits(eclIndex, maskNum)
    addFormatInformationPatterns(map, size, (i) => (formatBits >> i) & 1)

    {
      // 添加版本信息图案
      if (version > 6) {
        const versionBits = getVersionInformationBits(version)
        addVersionInformationPatterns(map, size, (i) => (versionBits >> i) & 1)
      }
    }
  }

  // 输出最终矩阵
  {
    maskMap.forEach((row, y) => {
      row.forEach((col, x) => {
        const mapCol = map[y][x]
        if (mapCol !== 0 && mapCol !== 1) {
          map[y][x] = col
        }
      })
    })

    return map
  }
}
