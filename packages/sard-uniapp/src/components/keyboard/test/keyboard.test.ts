import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Keyboard from '../keyboard.vue'
import { chineseKeys } from '../common'

describe('Keyboard', () => {
  test('number', async () => {
    const wrapper = mount(
      h(Keyboard, {
        type: 'number',
      }),
    )

    expect(
      wrapper.findAll('.sar-keyboard__key').map((item) => item.text()),
    ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ''])
  })

  test('digit', async () => {
    const wrapper = mount(
      h(Keyboard, {
        type: 'digit',
      }),
    )

    expect(
      wrapper.findAll('.sar-keyboard__key').map((item) => item.text()),
    ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''])
  })

  test('idcard', async () => {
    const wrapper = mount(
      h(Keyboard, {
        type: 'idcard',
      }),
    )

    expect(
      wrapper.findAll('.sar-keyboard__key').map((item) => item.text()),
    ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', ''])
  })

  test('random', async () => {
    const wrapper = mount(
      h(Keyboard, {
        type: 'random',
      }),
    )

    const nums = wrapper
      .findAll('.sar-keyboard__key')
      .map((item) => item.text())
      .filter((item) => item !== '')
      .join(',')

    expect(nums).not.toBe('1,2,3,4,5,6,7,8,9')
  })

  test('plate', async () => {
    const wrapper = mount(
      h(Keyboard, {
        type: 'plate',
      }),
    )

    expect(wrapper.find('.sar-keyboard').classes()).includes(
      'sar-keyboard_plate',
    )

    const attrs = wrapper
      .findAll('.sar-keyboard__key')
      .map((item) => item.text())
      .filter((item) => item !== '')
      .join(',')

    expect(attrs).includes(chineseKeys.join(','))
  })
})
