import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import CountDown from '../count-down.vue'
import { sleep } from '../../../utils'

describe('CountDown', () => {
  test('time', async () => {
    const wrapper = mount(
      h(CountDown, {
        time: 1000 * 60 * 60 * 2,
      }),
    )

    expect(wrapper.text()).toBe('02:00:00')
    await sleep(1000)
    expect(wrapper.text()).oneOf(['01:59:59', '01:59:58'])
  })

  test('autoStart', async () => {
    const wrapper = mount(
      h(CountDown, {
        time: 1000 * 60 * 60 * 2,
        autoStart: false,
      }),
    )

    await sleep(1000)
    expect(wrapper.text()).toBe('02:00:00')
  })

  test('format', async () => {
    const wrapper = mount(
      h(CountDown, {
        time: 1000 * 60 * 60 * 2,
        format: 'HH 时 mm 分 ss 秒',
      }),
    )

    expect(wrapper.text()).toBe('02 时 00 分 00 秒')
  })

  test('millisecond', async () => {
    const wrapper = mount(
      h(CountDown, {
        time: 1000 * 60 * 60 * 2,
        format: 'HH 时 mm 分 ss 秒 SSS 毫秒',
        millisecond: true,
      }),
    )

    expect(wrapper.text()).toBe('02 时 00 分 00 秒 000 毫秒')
  })
})
