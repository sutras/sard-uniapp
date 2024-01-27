import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Icon from '../icon.vue'

describe('Icon', () => {
  test('create', async () => {
    const wrapper = mount(
      h(Icon, {
        name: 'search',
      }),
    )

    const classes = wrapper.find('.sar-icon').classes()
    expect(classes).includes('sari')
    expect(classes).includes('sari-search')
  })

  test('size', async () => {
    const wrapper = mount(
      h(Icon, {
        name: 'search',
        size: '64px',
      }),
    )

    expect(wrapper.find('.sar-icon').attributes().style).includes(
      'font-size: 64px',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Icon, {
        name: 'search',
        color: 'orange',
      }),
    )

    expect(wrapper.find('.sar-icon').attributes().style).includes(
      'color: orange;',
    )
  })

  test('image', async () => {
    const wrapper = mount(
      h(Icon, {
        name: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
        color: 'orange',
      }),
    )

    expect(wrapper.find('.sar-icon image').attributes().src).toBe(
      'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
    )
  })

  test('custom', async () => {
    const wrapper = mount(
      h(Icon, {
        family: 'demo-icons',
        name: 'cart',
        size: '48px',
      }),
    )

    const classes = wrapper.find('.sar-icon').classes()
    expect(classes).includes('demo-icons')
    expect(classes).includes('demo-icons-cart')
  })
})
