import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Badge from '../badge.vue'

describe('Badge', () => {
  test('create', async () => {
    const wrapper = mount(
      h(
        Badge,
        {
          value: 5,
        },
        () => h('div', { class: 'box' }),
      ),
    )

    expect(wrapper.find('.sar-badge__wrapper').exists()).toBe(true)
    expect(wrapper.find('.sar-badge__wrapper .box').exists()).toBe(true)
    expect(wrapper.find('.sar-badge__wrapper .sar-badge').exists()).toBe(true)
    expect(wrapper.find('.sar-badge__wrapper .sar-badge').text()).toBe('5')
    expect(wrapper.find('.sar-badge__wrapper .sar-badge').classes()).toContain(
      'sar-badge_fixed',
    )
  })

  test('maxValue', async () => {
    const wrapper = mount(
      h(
        Badge,
        {
          value: 100,
        },
        () => h('div', { class: 'box' }),
      ),
    )

    expect(wrapper.find('.sar-badge').text()).toContain('99+')
    await wrapper.setProps({
      max: 200,
    })
    expect(wrapper.find('.sar-badge').text()).toContain('100')
  })

  test('showZero', async () => {
    const wrapper = mount(
      h(
        Badge,
        {
          value: 0,
        },
        () => h('div', { class: 'box' }),
      ),
    )

    expect(wrapper.find('.sar-badge').classes()).toContain(
      'sar-badge_zero-hide',
    )
    await wrapper.setProps({
      showZero: true,
    })
    expect(wrapper.find('.sar-badge').classes()).not.toContain(
      'sar-badge_zero-hide',
    )
  })

  test('dot', async () => {
    const wrapper = mount(
      h(
        Badge,
        {
          dot: true,
        },
        () => h('div', { class: 'box' }),
      ),
    )

    expect(wrapper.find('.sar-badge').classes()).toContain('sar-badge_dot')
  })

  test('color', async () => {
    const wrapper = mount(
      h(
        Badge,
        {
          value: 5,
          color: 'red',
          textColor: 'white',
        },
        () => h('div', { class: 'box' }),
      ),
    )

    const style = wrapper.find('.sar-badge').attributes().style
    expect(style).toContain('background: red')
    expect(style).toContain('color: white')
  })

  test('alone', async () => {
    const wrapper = mount(
      h(Badge, {
        value: 5,
      }),
    )

    expect(wrapper.find('.sar-badge__wrapper').exists()).toBe(false)
  })

  test('fixed', async () => {
    const wrapper = mount(
      h(Badge, {
        value: 5,
        fixed: true,
      }),
    )

    expect(wrapper.find('.sar-badge').classes()).toContain('sar-badge_fixed')
  })
})
