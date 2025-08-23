import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Watermark from '../watermark.vue'

describe('Watermark', () => {
  test('basic', async () => {
    const wrapper = mount(<Watermark content="Sard Uniapp"></Watermark>)

    expect(
      wrapper
        .find(
          '.sar-watermark .sar-watermark__canvas-wrapper .sar-watermark__canvas',
        )
        .exists(),
    ).toBeTruthy()
  })
})
