import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Qrcode from '../qrcode.vue'
import { templateData } from './utils'

import { ECLList, qrcode } from '../../../utils'

describe('Qrcode', () => {
  test('generate qrcode', async () => {
    const allMatch = templateData.every((item) => {
      const map = qrcode(item[3], {
        ecl: ECLList[item[1]],
      })

      return item[4] === map.map((row) => row.join('')).join('')
    })
    expect(allMatch).toBeTruthy()
  })

  test('component render', async () => {
    const wrapper = mount(
      h(Qrcode, {
        text: 'https://github.com/sutras/sard-uniapp',
      }),
    )
    expect(wrapper.find('image').exists()).toBeTruthy()
  })
})
