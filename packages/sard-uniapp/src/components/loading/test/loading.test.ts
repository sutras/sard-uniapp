import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Loading from '../loading.vue'

describe('Loading', () => {
  test('basic', async () => {
    const wrapper = mount(h(Loading))

    expect(
      wrapper.find('.sar-loading .sar-loading__icon').exists(),
    ).toBeTruthy()
  })

  test('type', async () => {
    const wrapper = mount(
      h(Loading, {
        type: 'clock',
      }),
    )

    expect(
      wrapper
        .find('.sar-loading .sar-loading__icon.sar-loading__icon_clock')
        .exists(),
    ).toBeTruthy()
  })

  test('text', async () => {
    const wrapper = mount(
      h(Loading, {
        text: 'loading...',
      }),
    )

    expect(wrapper.find('.sar-loading__text').text()).toBe('loading...')
  })

  test('vertical', async () => {
    const wrapper = mount(
      h(Loading, {
        vertical: true,
      }),
    )

    expect(
      wrapper.find('.sar-loading.sar-loading_vertical').exists(),
    ).toBeTruthy()
  })

  test('size', async () => {
    const wrapper = mount(
      h(Loading, {
        size: '48px',
        textSize: '36px',
        text: 'loading...',
      }),
    )

    expect(wrapper.find('.sar-loading__icon').attributes().style).includes(
      'font-size: 48px;',
    )
    expect(wrapper.find('.sar-loading__text').attributes().style).includes(
      'font-size: 36px;',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Loading, {
        color: 'red',
        textColor: 'blue',
        text: 'loading...',
      }),
    )

    expect(wrapper.find('.sar-loading__icon').attributes().style).includes(
      'color: red;',
    )
    expect(wrapper.find('.sar-loading__text').attributes().style).includes(
      'color: blue;',
    )
  })
})
