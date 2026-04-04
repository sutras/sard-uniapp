import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Barcode from '../barcode.vue'
import {
  BarcodeFormatList,
  barcode,
  calculateBarcodeLayout,
} from '../../../utils'

async function flushTasks() {
  await nextTick()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 120))
  await nextTick()
}

describe('Barcode', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('only exposes supported barcode formats', () => {
    expect(BarcodeFormatList).toEqual(['CODE128', 'EAN13', 'UPC-A', 'ITF14'])
  })

  test('generates CODE128 with expected code set behavior', () => {
    const numericOnly = barcode('123456', { format: 'CODE128' })[0]
    const alphaNumeric = barcode('AB12', { format: 'CODE128' })[0]
    const ean128 = barcode('123456', { format: 'CODE128', ean128: true })[0]

    expect(numericOnly.text).toBe('123456')
    expect(numericOnly.data.startsWith('11010011100')).toBeTruthy()
    expect(alphaNumeric.data.startsWith('11010010000')).toBeTruthy()
    expect(ean128.data.length).toBe(numericOnly.data.length + 11)
  })

  test('auto-appends checksum and segments EAN13 correctly', () => {
    const encodings = barcode('590123412345', { format: 'EAN13' })

    expect(encodings).toHaveLength(6)
    expect(encodings.map((item) => item.text)).toEqual([
      '5',
      '',
      '901234',
      '',
      '123457',
      '',
    ])
    expect(encodings[1].data).toBe('101')
    expect(encodings[2].data).toHaveLength(42)
    expect(encodings[3].data).toBe('01010')
    expect(encodings[4].data).toHaveLength(42)
    expect(encodings[5].data).toBe('101')
  })

  test('auto-appends checksum and segments UPC-A correctly', () => {
    const encodings = barcode('12345678901', { format: 'UPC-A' })

    expect(encodings).toHaveLength(7)
    expect(encodings.map((item) => item.text)).toEqual([
      '1',
      '',
      '23456',
      '',
      '78901',
      '',
      '2',
    ])
    expect(encodings[0].data).toBe('00000000')
    expect(encodings[1].data).toHaveLength(10)
    expect(encodings[3].data).toBe('01010')
    expect(encodings[5].data).toHaveLength(10)
    expect(encodings[6].data).toBe('00000000')
  })

  test('auto-appends checksum for ITF14', () => {
    const encodings = barcode('1234567890123', { format: 'ITF14' })

    expect(encodings).toHaveLength(1)
    expect(encodings[0].text).toBe('12345678901231')
    expect(encodings[0].data.startsWith('1010')).toBeTruthy()
    expect(encodings[0].data.endsWith('11101')).toBeTruthy()
  })

  test('calculates layout width, height, and text padding', () => {
    const encodings = barcode('AB12', {
      format: 'CODE128',
      width: 1,
      marginLeft: 4,
      marginRight: 6,
      textAlign: 'center',
    })
    const layout = calculateBarcodeLayout(encodings, () => 100)

    expect(layout.width).toBe(110)
    expect(layout.height).toBe(142)
    expect(layout.segments[0].textWidth).toBe(100)
    expect(layout.segments[0].barcodeWidth).toBe(encodings[0].data.length)
    expect(layout.segments[0].barcodePadding).toBe(
      Math.floor((100 - encodings[0].data.length) / 2),
    )
  })

  test('throws on invalid input and invalid checksums', () => {
    expect(() => barcode('', { format: 'CODE128' })).toThrow(
      'Invalid barcode input for format CODE128',
    )
    expect(() => barcode('5901234123458', { format: 'EAN13' })).toThrow(
      'Invalid barcode input for format EAN13',
    )
    expect(() => barcode('123456789013', { format: 'UPC-A' })).toThrow(
      'Invalid barcode input for format UPC-A',
    )
    expect(() => barcode('12345678901234', { format: 'ITF14' })).toThrow(
      'Invalid barcode input for format ITF14',
    )
  })

  test('component render emits success and updates image source', async () => {
    const tempFilePath = 'http://temp/generated-barcode.png'
    const uniObject = Reflect.get(globalThis, 'uni') as any
    vi.spyOn(uniObject, 'createCanvasContext').mockReturnValue({
      font: '',
      clearRect() {},
      setFillStyle() {},
      fillRect() {},
      setTextBaseline() {},
      setTextAlign() {},
      fillText() {},
      setTransform() {},
      scale() {},
      measureText() {
        return {
          width: 48,
        }
      },
      draw(_: boolean, callback?: () => void) {
        callback?.()
      },
    })
    vi.spyOn(uniObject, 'canvasToTempFilePath').mockImplementation(
      ({ success }: any) => {
        success?.({ tempFilePath })
      },
    )

    const wrapper = mount(Barcode, {
      props: {
        value: '590123412345',
        format: 'EAN13',
      },
    })

    await flushTasks()

    expect(wrapper.emitted('success')).toEqual([[tempFilePath]])
    expect(wrapper.find('image').attributes('src')).toBe(tempFilePath)
  })
})
